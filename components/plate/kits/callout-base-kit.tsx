import { BaseCalloutPlugin } from '@platejs/callout';

import { CalloutElementStatic } from '@/components/plate/nodes/callout-node-static';

export const BaseCalloutKit = [
    BaseCalloutPlugin.withComponent(CalloutElementStatic),
];
