import type { BreakpointCustomizable } from '../../../../types';
import type { GetStylesFunction, JssStyle } from '../../../../utils';
import { attachCss, buildResponsiveJss, getCss, mergeDeep } from '../../../../utils';

type FlexInlineType = BreakpointCustomizable<boolean>;
export type FlexInline = FlexInlineType;

export const FLEX_WRAPS = ['nowrap', 'wrap', 'wrap-reverse'] as const;
type FlexWrapType = typeof FLEX_WRAPS[number];
export type FlexWrap = BreakpointCustomizable<FlexWrapType>;

export const FLEX_DIRECTION = ['row', 'row-reverse', 'column', 'column-reverse'] as const;
export type FlexDirectionType = typeof FLEX_DIRECTION[number];
export type FlexDirection = BreakpointCustomizable<FlexDirectionType>;

export const FLEX_JUSTIFY_CONTENTS = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
type FlexJustifyContentType = typeof FLEX_JUSTIFY_CONTENTS[number];
export type FlexJustifyContent = BreakpointCustomizable<FlexJustifyContentType>;

export const FLEX_ALIGN_ITEMS = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'] as const;
type FlexAlignItemsType = typeof FLEX_ALIGN_ITEMS[number];
export type FlexAlignItems = BreakpointCustomizable<FlexAlignItemsType>;

export const FLEX_ALIGN_CONTENTS = [
  'stretch',
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
] as const;
type FlexAlignContentType = typeof FLEX_ALIGN_CONTENTS[number];
export type FlexAlignContent = BreakpointCustomizable<FlexAlignContentType>;

const getInlineStyles: GetStylesFunction = (inline: FlexInlineType): JssStyle => ({
  display: `${inline ? 'inline-flex' : 'flex'} !important`,
});
const getWrapStyles: GetStylesFunction = (wrap: FlexWrapType): JssStyle => ({ flexWrap: `${wrap} !important` });
const getDirectionStyles: GetStylesFunction = (direction: FlexDirectionType): JssStyle => ({
  flexDirection: `${direction} !important`,
});
const getJustifyContentStyles: GetStylesFunction = (justifyContent: FlexJustifyContentType): JssStyle => ({
  justifyContent: `${justifyContent} !important`,
});
const getAlignItemsStyles: GetStylesFunction = (alignItems: FlexAlignItemsType): JssStyle => ({
  alignItems: `${alignItems} !important`,
});
const getAlignContentStyles: GetStylesFunction = (alignContent: FlexAlignContentType): JssStyle => ({
  alignContent: `${alignContent} !important`,
});

export const getDynamicCss = (
  inline: FlexInline,
  wrap: FlexWrap,
  direction: FlexDirection,
  justifyContent: FlexJustifyContent,
  alignItems: FlexAlignItems,
  alignContent: FlexAlignContent
): string => {
  return getCss(
    mergeDeep(
      buildResponsiveJss(inline, getInlineStyles),
      buildResponsiveJss(wrap, getWrapStyles),
      buildResponsiveJss(direction, getDirectionStyles),
      buildResponsiveJss(justifyContent, getJustifyContentStyles),
      buildResponsiveJss(alignItems, getAlignItemsStyles),
      buildResponsiveJss(alignContent, getAlignContentStyles)
    )
  );
};

export const addCss = (
  host: HTMLElement,
  inline: FlexInline,
  wrap: FlexWrap,
  direction: FlexDirection,
  justifyContent: FlexJustifyContent,
  alignItems: FlexAlignItems,
  alignContent: FlexAlignContent
): void => {
  attachCss(host, getDynamicCss(inline, wrap, direction, justifyContent, alignItems, alignContent));
};
