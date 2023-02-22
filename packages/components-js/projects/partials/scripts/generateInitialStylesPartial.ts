import { joinArrayElementsToString } from './utils';
import { INTERNAL_TAG_NAMES, TAG_NAMES, getMinifiedCss } from '@porsche-design-system/shared';
import { Styles } from 'jss';
import {
  themeDark,
  fontWeight,
  themeLight,
  fontBehavior,
  fontFamily,
  fontHyphenation,
  fontLineHeight,
} from '@porsche-design-system/utilities-v2';

const tagNames = joinArrayElementsToString(TAG_NAMES.filter((x) => !INTERNAL_TAG_NAMES.includes(x)));

export const generateInitialStylesPartial = (): string => {
  const types = `type GetInitialStylesOptions = {
  prefix?: string;
  format?: Format;
};`;

  const normalizeStyles: Styles = {
    '@global': {
      '*': {
        fontFamily: fontFamily,
        lineHeight: fontLineHeight,
        ...fontBehavior,
      },

      p: {
        fontWeight: fontWeight.regular,
        ...fontHyphenation,
      },

      'h1, h2, h3, h4, h5, h6': {
        fontWeight: fontWeight.regular,
      },

      a: {
        color: 'inherit',
        textDecoration: 'underline',
        '@media(hover:hover)': {
          transition: 'color var(--p-transition-duration, .24s) ease',
          '&:hover': {
            color: themeLight.state.hover,
          },
        },
      },

      '@media(hover:hover)': {
        '[data-theme="dark"] a:hover': {
          color: themeDark.state.hover,
        },
      },

      'b, strong': {
        fontWeight: fontWeight.bold,
      },

      'em, i': {
        fontStyle: 'normal',
      },

      'a, button, input, select, textarea': {
        outline: '1px solid transparent',
        outlineOffset: '1px',
        '&:focus': {
          outlineColor: 'currentColor',
        },
        '&:focus:not(:focus-visible)': {
          outlineColor: 'transparent',
        },
      },
    },
  };

  const initialStylesFunction = `export function getInitialStyles(opts?: GetInitialStylesOptions & { format: 'jsx' }): JSX.Element;
export function getInitialStyles(opts?: GetInitialStylesOptions): string;
export function getInitialStyles(opts?: GetInitialStylesOptions): string | JSX.Element {
  const { prefix, format }: GetInitialStylesOptions = {
    prefix: '',
    format: 'html',
    ...opts,
  };

  const tagNames = [${tagNames}];
  const prefixedTagNames = getPrefixedTagNames(tagNames, prefix);

  throwIfRunInBrowser('getInitialStyles');

  const styleProps = { [\`data-pds-initial-styles\$\{prefix ? '-' + prefix : ''\}\`]: '' };
  const styleAttributes = convertPropsToAttributeString(styleProps);

  const prefixedTagNamesStyles = prefixedTagNames.join() + '{visibility:hidden}.hydrated,.ssr{visibility:inherit}';
  const normalizeStyles = \`${getMinifiedCss(normalizeStyles)}\`;

  const styles = prefixedTagNamesStyles.concat(normalizeStyles);

  return format === 'html'
    ? \`<style \$\{styleAttributes\}>\${styles}</style>\`
    : <style {...styleProps} dangerouslySetInnerHTML={{ __html: styles }} />;
}`;

  const helperFunction = `const getPrefixedTagNames = (tagNames: string[], prefix?: string): string[] => {
  return prefix ? tagNames.map((x) => \`\${prefix}-\${x}\`) : tagNames;
};`;

  return [types, initialStylesFunction, helperFunction].join('\n\n');
};
