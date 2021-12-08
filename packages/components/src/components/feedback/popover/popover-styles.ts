import {
  addImportantToEachRule,
  buildHostStyles,
  buildSlottedStyles,
  getBaseSlottedStyles,
  getCss,
  mediaQuery,
  pxToRemWithUnit,
} from '../../../utils';
import type { PopoverDirection } from './popover-utils';
import type { JssStyle } from '../../../utils';
import { color, text } from '@porsche-design-system/utilities';
import { POPOVER_Z_INDEX } from '../../../constants';

const mediaQueryXS = mediaQuery('xs');
const mediaQueryForcedColors = '@media (forced-colors: active)';

const directionPositionMap: { [key in PopoverDirection]: JssStyle } = {
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  right: {
    top: '50%',
    left: '100%',
    transform: 'translateY(-50%)',
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  left: {
    top: '50%',
    right: '100%',
    transform: 'translateY(-50%)',
  },
};

const borderWidth = '.75rem';
const transparentColor = 'transparent';
const { default: backgroundColor } = color.background;
const canvas = 'canvas';
const canvasText = 'canvastext';
const glue = ' ';

const directionArrowMap: { [key in PopoverDirection]: JssStyle } = {
  top: {
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: [borderWidth, borderWidth, 0].join(glue),
    borderColor: [backgroundColor, transparentColor, transparentColor].join(glue),
    [mediaQueryForcedColors]: {
      borderColor: [canvasText, canvas, canvas].join(glue),
    },
  },
  right: {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
    borderWidth: [borderWidth, borderWidth, borderWidth, 0].join(glue),
    borderColor: [transparentColor, backgroundColor, transparentColor, transparentColor].join(glue),
    [mediaQueryForcedColors]: {
      borderColor: [canvas, canvasText, canvas, canvas].join(glue),
    },
  },
  bottom: {
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderWidth: [0, borderWidth, borderWidth].join(glue),
    borderColor: [transparentColor, transparentColor, backgroundColor].join(glue),
    [mediaQueryForcedColors]: {
      borderColor: [canvas, canvas, canvasText].join(glue),
    },
  },
  left: {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
    borderWidth: [borderWidth, 0, borderWidth, borderWidth].join(glue),
    borderColor: [transparentColor, transparentColor, transparentColor, backgroundColor].join(glue),
    [mediaQueryForcedColors]: {
      borderColor: [canvas, canvas, canvas, canvasText].join(glue),
    },
  },
};

export const getComponentCss = (direction: PopoverDirection): string => {
  const spacerBox = '-1rem';

  return getCss({
    ...buildHostStyles({
      verticalAlign: 'top',
      ...addImportantToEachRule({
        position: 'relative',
        display: 'inline-block',
      }),
    }),
    spacer: {
      position: 'absolute',
      zIndex: POPOVER_Z_INDEX,
      top: spacerBox,
      left: spacerBox,
      right: spacerBox,
      bottom: spacerBox,
      filter: 'drop-shadow(0 0 1rem rgba(0,0,0,.3))',
      pointerEvents: 'none',
      animation:
        ROLLUP_REPLACE_IS_STAGING === 'production' || process.env.NODE_ENV === 'test'
          ? '240ms $fadeIn ease forwards'
          : 'var(--p-override-popover-animation-duration, 240ms) $fadeIn ease forwards',
      '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        ...directionArrowMap[direction],
      },
    },
    popover: {
      position: 'absolute',
      maxWidth: '90vw',
      width: 'max-content',
      boxSizing: 'border-box',
      background: color.background.default,
      padding: '.5rem 1rem',
      pointerEvents: 'auto',
      ...directionPositionMap[direction],
      ...text.small,
      '-webkit-text-size-adjust': 'none',
      overflowWrap: 'break-word',
      wordWrap: 'break-word',
      hyphens: 'auto',
      listStyleType: 'none',
      color: color.default,
      whiteSpace: 'inherit',
      [mediaQueryXS]: {
        maxWidth: pxToRemWithUnit(432),
      },
      [mediaQueryForcedColors]: {
        outline: `1px solid ${canvasText}`,
      },
    },
    '@keyframes fadeIn': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  });
};

export const getSlottedCss = (host: HTMLElement): string => {
  return getCss(buildSlottedStyles(host, getBaseSlottedStyles()));
};
