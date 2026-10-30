import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;
export type NoteType = Note['data']['type'];
export const NOTE_TYPES: NoteType[] = ['essay', 'photo', 'media'];
export const NOTE_TYPE_LABELS: Record<NoteType, string> = {
  essay: '随笔', photo: '照片', media: '书影'
};

export function getNoteSlug(note: Note): string {
  return note.data.slug ?? note.id.replace(/\.mdx?$/, '');
}

export async function getPublishedNotes(type?: NoteType): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => !data.draft);
  const filtered = type ? notes.filter((note) => note.data.type === type) : notes;
  const seen = new Map<string, string>();
  for (const note of filtered) {
    const slug = getNoteSlug(note);
    if (seen.has(slug)) throw new Error(`重复的记录 slug“${slug}”：${seen.get(slug)} 与 ${note.id}`);
    seen.set(slug, note.id);
  }
  return filtered.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
