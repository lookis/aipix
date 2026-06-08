import { source } from '@/lib/source';
import { stopwords as mandarinStopwords } from "@orama/stopwords/mandarin";
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { createFromSource } from 'fumadocs-core/search/server';

export const revalidate = false;

export const { staticGET: GET } = createFromSource(source, {
  // https://docs.orama.com/docs/orama-js/supported-languages
  tokenizer: createTokenizer({
    stopWords: mandarinStopwords,
    language: 'mandarin',
  }),
});
