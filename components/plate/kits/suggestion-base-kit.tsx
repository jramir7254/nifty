import { BaseSuggestionPlugin } from '@platejs/suggestion';

import { SuggestionLeafStatic } from '@/components/plate/nodes/suggestion-node-static';

export const BaseSuggestionKit = [
    BaseSuggestionPlugin.withComponent(SuggestionLeafStatic),
];
