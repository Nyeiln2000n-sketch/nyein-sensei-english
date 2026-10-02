// FASE 15 code-splitting: story corpus bundle (lazy-loaded).
import type { Story } from '../../types';
import { stories } from '../stories';
import { storiesBatch1 } from '../f14/stories-batch-1';
import { storiesBatch2 } from '../f14/stories-batch-2';
import { storiesBatch3 } from '../f14/stories-batch-3';
import { storiesBatch4 } from '../f14/stories-batch-4';
import { hyperlocalStories1 } from '../f14/hyperlocal-stories-1';
export const bundleStories: Story[] = [stories, storiesBatch1, storiesBatch2, storiesBatch3, storiesBatch4, hyperlocalStories1].flat();
