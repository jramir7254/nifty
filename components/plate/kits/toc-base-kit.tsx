import { BaseTocPlugin } from '@platejs/toc';

import { TocElementStatic } from '@/components/plate/nodes/toc-node-static';

export const BaseTocKit = [BaseTocPlugin.withComponent(TocElementStatic)];
