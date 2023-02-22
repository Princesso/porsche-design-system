import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import type { TagColor, TagColorDeprecated  } from './tag-utils';
import { getThemeForIcon, TAG_COLORS } from './tag-utils';
import {
  AllowedTypes,
  attachComponentCss,
  getDataThemeDarkAttribute,
  getDirectChildHTMLElement,
  getPrefixedTagNames,
  THEMES,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './tag-styles';
import type { IconName, PropTypes, Theme } from '../../types';

const propTypes: PropTypes<typeof Tag> = {
  theme: AllowedTypes.oneOf<Theme>(THEMES),
  color: AllowedTypes.oneOf<TagColor>(TAG_COLORS),
  icon: AllowedTypes.string, // TODO: we could use AllowedTypes.oneOf<IconName>(Object.keys(ICONS_MANIFEST) as IconName[]) but then main chunk will increase
  iconSource: AllowedTypes.string,
};

@Component({
  tag: 'p-tag',
  shadow: true,
})
export class Tag {
  @Element() public host!: HTMLElement;

  /** Adapts the tag color depending on the theme. */
  @Prop() public theme?: Theme = 'light';

  /** Background color variations depending on theme property. */
  @Prop() public color?: TagColor = 'background-surface';

  /** The icon shown. */
  @Prop() public icon?: IconName; // TODO: shouldn't the default be 'none' to be in sync with e.g. button, link, button-pure and link-pure?

  /** A URL path to a custom icon. */
  @Prop() public iconSource?: string;

  public render(): JSX.Element {
    validateProps(this, propTypes);
    warnIfDeprecatedPropValueIsUsed<typeof Tag, TagColorDeprecated, TagColor>(this, 'color', {
      'notification-neutral': 'notification-info',
      'neutral-contrast-high': 'primary',
      'background-default': 'background-base',
    });
    attachComponentCss(
      this.host,
      getComponentCss,
      this.color,
      !!getDirectChildHTMLElement(this.host, 'a,button'),
      this.theme
    );

    const PrefixedTagNames = getPrefixedTagNames(this.host);
    return (
      <Host {...getDataThemeDarkAttribute(this.theme)}>
        <span>
          {(this.icon || this.iconSource) && (
            <PrefixedTagNames.pIcon
              class="icon"
              name={this.icon}
              source={this.iconSource}
              color="primary"
              size="x-small"
              theme={getThemeForIcon(this.color, this.theme)}
              aria-hidden="true"
            />
          )}
          {/* to trick leading inline-block / inline-flex space character */}
          <div class="label">
            <slot />
          </div>
        </span>
      </Host>
    );
  }
}
