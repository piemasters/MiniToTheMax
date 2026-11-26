import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { baseRetributorArmour } from '../../data/paints/citadel/base';
import type { Collection } from '../../util/paints/collection';
import { createBackup } from '../../util/paints/collectionBackup';
import { paintId } from '../../util/paints/paintId';
import { useCollection } from '../../util/paints/useCollection';
import { useCollectionEdits } from '../../util/paints/useCollectionEdits';
import { MyPaintsEditor } from './MyPaintsEditor';

const id = paintId(baseRetributorArmour);

const Harness = () => {
  const { collection, update } = useCollection();
  const edits = useCollectionEdits(update);
  return (
    <>
      <MyPaintsEditor
        id="editor"
        editing
        results={[baseRetributorArmour]}
        collection={collection}
        edits={edits}
      />
      <pre data-testid="collection">{JSON.stringify(collection)}</pre>
    </>
  );
};

const collection = (): Collection =>
  JSON.parse(screen.getByTestId('collection').textContent as string);

const choose = (contents: string) =>
  fireEvent.change(screen.getByLabelText('Backup file'), {
    target: { files: [new File([contents], 'backup.json')] },
  });

beforeEach(() => window.localStorage.clear());

describe('MyPaintsEditor backups', () => {
  it('has nothing to download while the collection is empty', () => {
    render(<Harness />);
    expect(
      screen.getByRole('button', { name: 'Download backup' })
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('downloads the collection as a dated file', () => {
    window.localStorage.setItem('paint-collection', `{"${id}":"owned"}`);
    const createObjectURL = jest.fn((_blob: Blob) => 'blob:backup');
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = jest.fn();
    let downloaded = '';
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(function (this: HTMLAnchorElement) {
        downloaded = this.download;
      });

    render(<Harness />);
    fireEvent.click(screen.getByRole('button', { name: 'Download backup' }));

    expect(downloaded).toMatch(/^minitothemax-paints-[\d-]{10}\.json$/);
    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent(
      'Downloaded a backup of 1 paint.'
    );
    click.mockRestore();
  });

  it('adds a loaded backup to the collection, with an undo', async () => {
    window.localStorage.setItem('paint-collection', '{"kept":"wishlist"}');
    render(<Harness />);

    choose(createBackup({ [id]: 'owned' }, new Date()));
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        'Loaded 1 paint from the backup.'
      )
    );
    expect(collection()).toEqual({ kept: 'wishlist', [id]: 'owned' });

    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(collection()).toEqual({ kept: 'wishlist' });
  });

  it('changes nothing for a file that is not a backup', async () => {
    render(<Harness />);
    choose('{"nope":true}');
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        'isn’t a paint backup'
      )
    );
    expect(collection()).toEqual({});
    expect(screen.queryByRole('button', { name: 'Undo' })).toBeNull();
  });
});
