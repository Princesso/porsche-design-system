import type { BreakpointCustomizable, Theme } from '../../types';
import { buildResponsiveStyles, getCss } from '../../utils';
import {
  addImportantToEachRule,
  getBackfaceVisibilityJssStyle,
  getScreenReaderOnlyJssStyle,
  getThemedColors,
} from '../../styles';
import {
  gridWidthMax,
  gridSafeZoneBase,
  textSmallStyle,
  getMediaQueryMin,
  borderRadiusSmall,
  headingXLargeStyle,
  spacingFluidMedium,
  spacingStaticXSmall,
  spacingStaticSmall,
  spacingFluidXSmall,
  spacingFluidLarge,
} from '@porsche-design-system/utilities-v2';
import type { HeaderAlign } from '../../types';

export const bulletActiveClass = 'bullet--active';

const mediaQueryS = getMediaQueryMin('s');
const mediaQueryXl = getMediaQueryMin('xl');
// the speed which "splide" framework uses to switch between slides
const splideSpeed = '0.4s';
const bulletSize = '8px';
const activeBulletWidth = '20px';

export const getComponentCss = (
  wrapContent: boolean,
  disablePagination: BreakpointCustomizable<boolean>,
  theme: Theme,
  alignHeader: HeaderAlign
): string => {
  const { primaryColor, disabledColor } = getThemedColors(theme);
  const isAlignLeft = alignHeader === 'left';

  return getCss({
    '@global': {
      ':host': addImportantToEachRule({
        display: 'grid',
        maxWidth: gridWidthMax,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: spacingFluidMedium,
        gridAutoFlow: 'row',
      }),
      'h2,::slotted([slot=heading])': addImportantToEachRule({
        ...headingXLargeStyle,
        margin: 0,
        color: primaryColor,
        ...(isAlignLeft
          ? {
              maxWidth: '900px',
            }
          : {
              textAlign: 'center',
            }),
      }),
      'p,::slotted([slot=description])': addImportantToEachRule({
        ...textSmallStyle,
        margin: 0,
        color: primaryColor,
        padding: `${spacingFluidXSmall} 0 0`,
        ...(isAlignLeft
          ? {
              maxWidth: '550px',
            }
          : {
              textAlign: 'center',
            }),
        gridColumn: 1, // to force it into 2nd line
      }),
    },
    splide: {
      overflow: 'hidden',
      // visibility: 'hidden',
      '&__track': {
        cursor: 'grab',
        // to override inline styles set by splide library
        ...(wrapContent &&
          addImportantToEachRule({
            // TODO: 0 calc(${gridSafeZoneBase} + ${gridGap}) - will be done after Grid Refactoring
            padding: `0 calc(${gridSafeZoneBase} + ${spacingFluidLarge}) 0 ${gridSafeZoneBase}`,
            [mediaQueryXl]: {
              padding: `0 calc(${gridSafeZoneBase} + ${spacingFluidLarge}) 0 ${gridSafeZoneBase}`,
            },
          })),
        '&--draggable': {
          userSelect: 'none',
          WebkitUserSelect: 'none',
          WebkitTouchCallout: 'none',
        },
      },
      '&__list': {
        display: 'flex',
        height: '100%',
        ...getBackfaceVisibilityJssStyle(),
      },
      '&__slide': {
        position: 'relative',
        flexShrink: 0,
        ...getBackfaceVisibilityJssStyle(),
        transform: 'translateZ(0)', // fixes mobile safari flickering, https://github.com/nolimits4web/swiper/issues/3527#issuecomment-609088939
      },
      '&__sr': getScreenReaderOnlyJssStyle(), // appears in the DOM when sliding
    },
    // .splide.is-initialized,
    // .splide.is-rendered {
    //     visibility: visible,
    //   }
    // .splide.is-initialized:not(.is-active) .splide__list {
    //     display: block,
    //   }
    header: {
      padding: wrapContent ? `0 ${gridSafeZoneBase}` : null,
      [mediaQueryS]: {
        position: 'relative',
        minHeight: '40px', // actual height of prev/next buttons
      },
    },
    nav: {
      display: 'none',
      [mediaQueryS]: {
        display: 'grid',
        gridAutoFlow: 'column',
        gap: spacingStaticXSmall,
        position: 'absolute', // we can't span across multiple rows with implicit grid
        right: wrapContent ? gridSafeZoneBase : 0,
        bottom: 0,
      },
    },
    btn: {
      padding: spacingStaticSmall,
    },
    ...(disablePagination !== true && {
      pagination: {
        ...buildResponsiveStyles(disablePagination, (value: boolean) => ({ display: value ? 'none' : 'block' })),
        textAlign: 'center',
        lineHeight: bulletSize,
      },
      bullet: {
        display: 'inline-block',
        borderRadius: borderRadiusSmall,
        background: disabledColor,
        margin: `0 ${spacingStaticXSmall}`,
        // set transition to have the same speed as switching slides in splide
        transition: `background-color ${splideSpeed}, width ${splideSpeed}`,
        width: bulletSize,
        height: bulletSize,
      },
      [bulletActiveClass]: {
        background: primaryColor,
        width: activeBulletWidth,
      },
    }),
  });
};
