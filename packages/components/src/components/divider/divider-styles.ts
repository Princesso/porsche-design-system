import type { DividerColor, DividerOrientation } from './divider-utils';
import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import { addImportantToEachRule, getThemedColors, hostHiddenStyles } from '../../styles';

export const getComponentCss = (
  color: DividerColor,
  orientation: BreakpointCustomizable<DividerOrientation>,
  theme: Theme
): string => {
  const { contrastLowColor, contrastMediumColor, contrastHighColor } = getThemedColors(theme);
  const colorMap: { [key in DividerColor]: string } = {
    'neutral-contrast-low': contrastLowColor,
    'neutral-contrast-medium': contrastMediumColor,
    'neutral-contrast-high': contrastHighColor,
    'contrast-low': contrastLowColor,
    'contrast-medium': contrastMediumColor,
    'contrast-high': contrastHighColor,
  };

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule(hostHiddenStyles),
      },
      hr: {
        margin: 0,
        padding: 0,
        border: 'none',
        textAlign: 'left',
        background: colorMap[color],
        ...buildResponsiveStyles(orientation, (o: DividerOrientation) =>
          o === 'horizontal' ? { height: '1px', width: '100%' } : { height: '100%', width: '1px' }
        ),
      },
    },
  });
};
