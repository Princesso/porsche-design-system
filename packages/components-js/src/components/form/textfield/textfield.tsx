import { JSX, Host, Component, Prop, h } from '@stencil/core';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { IconName } from '../../icon/icon/icon-name';

@Component({
  tag: 'p-textfield',
  styleUrl: 'textfield.scss',
  shadow: false
})
export class Textfield {

  /** The label text. */
  @Prop() public label?: string = undefined;

  /** The icon shown. */
  @Prop() public icon?: IconName = undefined;

  /** A custom URL path to a custom icon. */
  @Prop() public iconSource?: string = undefined;

  /** The status */
  @Prop() public status?: 'success' | 'error' = undefined;

  /** The message. */
  @Prop() public message?: string = undefined;

  public render(): JSX.Element {
    const textfieldClasses = cx(prefix('textfield'), this.status === 'error' && prefix('textfield--error'), this.status === 'success' && prefix('textfield--success'));
    const formElementWrapperClasses = cx(prefix('textfield__form-element-wrapper'));
    const iconClasses = cx(prefix('textfield__icon'));
    const labelClasses = cx(prefix('textfield__label'));
    const messageClasses = cx(prefix('textfield__message'), this.status === 'error' && prefix('textfield__message--error'), this.status === 'success' && prefix('textfield__message--success'));

    return (
      <Host class={textfieldClasses}>
        <label>
          <p-text class={labelClasses} size='small' color='inherit' tag='span'>
            {this.label}
          </p-text>
          <span class={formElementWrapperClasses}>
            {this.icon && <p-icon
              class={iconClasses}
              color='inherit'
              size='inherit'
              name={this.icon}
              source={this.iconSource}
            />}
            <slot />
          </span>
        </label>
        {this.message &&
          <p-text
            class={messageClasses}
            aria-live='assertive'
            aria-relevant='additions removals'
            color='inherit'
            size='small'
            tag='span'
          >
              {this.message}
          </p-text>
        }
      </Host>
    );
  }

}
