import { getCollection, type CollectionEntry } from 'astro:content';
export type ResearchItem = CollectionEntry<'research'>;

export async function getResearchItems(): Promise<ResearchItem[]> {
  const items = await getCollection('research');
  return items.sort((a, b) => a.data.order - b.data.order);
}
