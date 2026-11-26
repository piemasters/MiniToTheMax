import { readdirSync, readFileSync } from 'fs';
import { join, relative } from 'path';
import type { PaintCategory } from '../../types';
import { getPaint } from './getPaint';

const contentDir = join(__dirname, '../../../content');
const allowedProps = new Set(['name', 'category']);

// Matches name='x', name="x", name={'x'} and name={"x"}
const propPattern = /(\w+)=\{?(?:'([^']*)'|"([^"]*)")\}?/g;

const getPaintUsages = () =>
  (readdirSync(contentDir, { recursive: true }) as string[])
    .filter((file) => file.endsWith('.mdx'))
    .flatMap((file) => {
      const path = join(contentDir, file);
      return readFileSync(path, 'utf8')
        .split('\n')
        .flatMap((line, i) =>
          [...line.matchAll(/<Paint\s([^>]*?)\/>/g)].map((match) => ({
            location: `${relative(contentDir, path)}:${i + 1}`,
            props: Object.fromEntries(
              [...match[1].matchAll(propPattern)].map(([, key, a, b]) => [
                key,
                a ?? b,
              ])
            ),
          }))
        );
    });

describe('<Paint> usages in MDX content', () => {
  const usages = getPaintUsages();

  it('finds usages to check', () => {
    expect(usages.length).toBeGreaterThan(0);
  });

  it('only uses supported props', () => {
    const problems = usages.flatMap(({ location, props }) =>
      Object.keys(props)
        .filter((key) => !allowedProps.has(key))
        .map((key) => `${location}: unsupported prop "${key}"`)
    );
    expect(problems).toEqual([]);
  });

  it('only references paints that exist', () => {
    const problems = usages.flatMap(({ location, props }) => {
      const { error, type } = getPaint(
        props.name,
        props.category as PaintCategory | undefined
      );
      return error ? [`${location}: ${error} "${type}"`] : [];
    });
    expect(problems).toEqual([]);
  });
});
