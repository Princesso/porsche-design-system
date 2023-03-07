import { Component, Element, h, Host, JSX } from '@stencil/core';
import { attachComponentCss, throwIfParentIsNotOfKind, validateProps } from '../../../utils';
import { getComponentCss } from './table-row-styles';
import type { PropTypes } from '../../../types';

const propTypes: PropTypes<typeof TableRow> = {};

@Component({
  tag: 'p-table-row',
  shadow: true,
})
export class TableRow {
  @Element() public host!: HTMLElement;

  public connectedCallback(): void {
    throwIfParentIsNotOfKind(this.host, 'p-table-body');
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);
    attachComponentCss(this.host, getComponentCss);

    return (
      <Host role="row">
        <slot />
      </Host>
    );
  }
}
