import { BaseCodeDrawingPlugin } from '@platejs/code-drawing';

import { CodeDrawingElement } from '@/components/plate/nodes/code-drawing-node';

export const BaseCodeDrawingKit = [
    BaseCodeDrawingPlugin.configure({
        node: { component: CodeDrawingElement },
    }),
];
