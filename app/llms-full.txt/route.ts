import { getLLMText, source } from '@/lib/source';

export const revalidate = 86400; // Revalidate daily (24 hours)

export async function GET() {
  const scan = source.getPages().map(getLLMText);
  const scanned = await Promise.all(scan);

  return new Response(scanned.join('\n\n'));
}
