import { BaseMentionPlugin } from '@platejs/mention';

import { MentionElementStatic } from '@/components/plate/nodes/mention-node-static';

export const BaseMentionKit = [
    BaseMentionPlugin.withComponent(MentionElementStatic),
];
