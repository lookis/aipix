import { source } from '@/lib/source';
import { llms } from 'fumadocs-core/source';

export const revalidate = 86400; // Revalidate daily (24 hours)

export function GET() {
  return new Response(llms(source).index());
}
