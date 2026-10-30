import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getNoteSlug, getPublishedNotes } from '../utils/notes';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = await getPublishedNotes();
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site ?? 'https://denglinzhe.com',
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.pubDate,
      link: `/notes/${getNoteSlug(note)}/`
    }))
  });
}
