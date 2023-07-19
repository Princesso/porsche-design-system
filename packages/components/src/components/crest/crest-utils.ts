import { CRESTS_MANIFEST } from '@porsche-design-system/crest'; // TODO: import from assets once it is treeshakable
import type { LinkTarget } from '../../utils/link-button/link-target';
import { getCDNBaseURL } from '../../utils';

export type CrestTarget = LinkTarget;

export const CREST_ARIA_ATTRIBUTES = ['aria-label'] as const;
export type CrestAriaAttribute = (typeof CREST_ARIA_ATTRIBUTES)[number];

export const buildCrestSrcSet = (format: 'png' | 'webp'): string => {
  return Object.entries(CRESTS_MANIFEST.porscheCrest)
    .map(([resolution, fileName]) => `${getCDNBaseURL()}/crest/${fileName[format]} ${resolution}`)
    .join();
};

export const buildCrestImgSrc = (): string => {
  return `${getCDNBaseURL()}/crest/${CRESTS_MANIFEST.porscheCrest['2x'].png}`;
};

export const crestSize: { width: number; height: number } = {
  width: 30,
  height: 40,
};
