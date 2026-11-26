import { baseRetributorArmour } from '../../data/paints/citadel/base';
import { paintId } from './paintId';
import { buildPaintPosts } from './paintPosts';

const post = (
  slug: string,
  paints: string[] | null,
  published: boolean | null = true
) => ({
  fields: { slug },
  paintReferences: paints,
  frontmatter: { title: `Post ${slug}`, published },
});

describe('buildPaintPosts', () => {
  const id = paintId(baseRetributorArmour);

  it('lists the posts that use a paint, in the order given', () => {
    const result = buildPaintPosts(
      [post('/a/', ['Retributor Armour']), post('/b/', ['Retributor Armour'])],
      false
    );
    expect(result[id]).toEqual([
      { title: 'Post /a/', slug: '/a/' },
      { title: 'Post /b/', slug: '/b/' },
    ]);
  });

  it('lists a post once however many times it uses the paint', () => {
    const result = buildPaintPosts(
      [post('/a/', ['Retributor Armour', 'Retributor Armour'])],
      false
    );
    expect(result[id]).toHaveLength(1);
  });

  it('ignores unknown paints and posts without any', () => {
    expect(
      buildPaintPosts([post('/a/', ['Not A Paint']), post('/b/', null)], false)
    ).toEqual({});
  });

  it('separates paints that share a name by category', () => {
    const result = buildPaintPosts(
      [post('/a/', ['Praxeti White::Citadel Dry'])],
      false
    );
    const ids = Object.keys(result);
    expect(ids).toHaveLength(1);
    expect(ids[0]).toContain('citadel_dry');
  });

  it('can leave out unpublished posts', () => {
    const nodes = [
      post('/a/', ['Retributor Armour'], false),
      post('/b/', ['Retributor Armour'], true),
    ];
    expect(buildPaintPosts(nodes, true)[id]).toEqual([
      { title: 'Post /b/', slug: '/b/' },
    ]);
    expect(buildPaintPosts(nodes, false)[id]).toHaveLength(2);
  });
});
