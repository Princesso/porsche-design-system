import { Component, Event, Element, EventEmitter, h, JSX, Prop, State, Watch } from '@stencil/core';
import {
  getPrefixedTagNames,
  improveFocusHandlingForCustomElement,
  isDark,
  mapBreakpointPropToClasses,
} from '../../../utils';
import { createPaginationModel, getCurrentActivePage, getTotalPages, itemTypes } from './pagination-utils';
import { listenResize } from '../../../utils/window-resize-listener';
import { readCounterResetValue } from '../../../utils/counter-reset-reader';
import type { BreakpointCustomizable, NumberOfPageLinks, PageChangeEvent, Theme } from '../../../types';

@Component({
  tag: 'p-pagination',
  styleUrl: 'pagination.scss',
  shadow: true,
})
export class Pagination {
  @Element() public host!: HTMLElement;

  /** The total count of items. */
  @Prop() public totalItemsCount = 1;

  /** The total count of items which should be shown per page.  */
  @Prop() public itemsPerPage = 1;

  /** Index of the currently active page. */
  @Prop({
    mutable: true,
  })
  public activePage?: number = 1;

  /** The maximum number of page links rendered */
  @Prop() public maxNumberOfPageLinks?: NumberOfPageLinks | BreakpointCustomizable<NumberOfPageLinks> = {
    base: 5,
    xs: 7,
  };

  /** Aria label what the pagination is used for. */
  @Prop() public allyLabel?: string = 'Pagination';

  /** Aria label for previous page icon. */
  @Prop() public allyLabelPrev?: string = 'Previous page';

  /** Aria label for page navigation. */
  @Prop() public allyLabelPage?: string = 'Page';

  /** Aria label for next page icon. */
  @Prop() public allyLabelNext?: string = 'Next page';

  /** Adapts the color when used on dark background. */
  @Prop() public theme?: Theme = 'light';

  /** Emitted when the page changes. */
  @Event() public pageChange!: EventEmitter<PageChangeEvent>;

  @State() public breakpointMaxNumberOfPageLinks: number;

  private navigationElement: HTMLElement;

  @Watch('activePage')
  public onActivePageChange(page: number, previousPage: number): void {
    this.pageChange.emit({ page, previousPage });
  }

  public componentDidLoad(): void {
    improveFocusHandlingForCustomElement(this.host);
    this.unlistenResize = listenResize(() => {
      this.updateMaxNumberOfPageLinks();
    });

    this.updateMaxNumberOfPageLinks();
  }

  public disconnectedCallback(): void {
    this.unlistenResize();
  }

  public render(): JSX.Element {
    const pageRange = this.breakpointMaxNumberOfPageLinks === 7 ? 1 : 0;

    const rootClasses = {
      ['root']: true,
      ['root--theme-dark']: isDark(this.theme),
      ...mapBreakpointPropToClasses('root--size', this.maxNumberOfPageLinks),
    };

    const pageTotal = getTotalPages(this.totalItemsCount, this.itemsPerPage);
    const activePage = getCurrentActivePage(this.activePage, pageTotal);

    // generate pagination items
    const paginationModel = createPaginationModel({
      activePage,
      pageTotal,
      pageRange,
    });
    const pageItems: JSX.Element[] = [];
    let prevItem: JSX.Element;
    let nextItem: JSX.Element;

    const PrefixedTagNames = getPrefixedTagNames(this.host);

    paginationModel.forEach((pageModel) => {
      const { type, isActive, value } = pageModel;
      if (type === itemTypes.PREVIOUS_PAGE_LINK) {
        const paginationPrevClasses = {
          ['prev']: true,
          ['prev--disabled']: !isActive,
        };

        prevItem = (
          <li {...pageModel} class="item">
            <span
              class={paginationPrevClasses}
              role="button"
              tabIndex={isActive ? 0 : null}
              onClick={() => this.onClick(value)}
              onKeyDown={(e) => this.onKeyDown(e, value)}
              aria-disabled={!isActive ? 'true' : null}
              aria-label={this.allyLabelPrev}
            >
              <PrefixedTagNames.pIcon name="arrow-head-left" color="inherit" />
            </span>
          </li>
        );
      } else if (type === itemTypes.ELLIPSIS) {
        const paginationGoToClasses = {
          ['goto']: true,
          ['goto--ellipsis']: true,
        };
        pageItems.push(
          <li {...pageModel} class="item">
            <span class={paginationGoToClasses} />
          </li>
        );
      } else if (type === itemTypes.PAGE) {
        const paginationGoToClasses = {
          ['goto']: true,
          ['goto--current']: isActive,
        };
        pageItems.push(
          <li {...pageModel} class="item">
            <span
              class={paginationGoToClasses}
              role="button"
              tabIndex={isActive ? null : 0}
              aria-disabled={isActive ? 'true' : null}
              onClick={() => this.onClick(value)}
              onKeyDown={(e) => this.onKeyDown(e, value)}
              aria-label={`${this.allyLabelPage} ${value}`}
              aria-current={isActive ? 'page' : null}
            >
              {value}
            </span>
          </li>
        );
      } else if (type === itemTypes.NEXT_PAGE_LINK) {
        const paginationNextClasses = {
          ['next']: true,
          ['next--disabled']: !isActive,
        };

        nextItem = (
          <li {...pageModel} class="item">
            <span
              class={paginationNextClasses}
              role="button"
              tabIndex={isActive ? 0 : null}
              onClick={() => this.onClick(value)}
              onKeyDown={(e) => this.onKeyDown(e, value)}
              aria-disabled={!isActive ? 'true' : null}
              aria-label={this.allyLabelNext}
            >
              <PrefixedTagNames.pIcon name="arrow-head-right" color="inherit" />
            </span>
          </li>
        );
      }
    });

    return (
      <nav
        class={rootClasses}
        role="navigation"
        aria-label={this.allyLabel}
        ref={(el) => (this.navigationElement = el)}
      >
        <ul class="items">
          {prevItem}
          {pageItems}
          {nextItem}
        </ul>
      </nav>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private unlistenResize: () => void = () => {};

  private onKeyDown(event: KeyboardEvent, page: number): void {
    /**
     * from https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
     */
    const { key } = event;
    if (key === ' ' || key === 'Enter' || key === 'Spacebar') {
      /**
       * Prevent the default action to stop scrolling when space is pressed
       */
      event.preventDefault();
      this.onClick(page);
    }
  }

  private onClick(page: number): void {
    if (page !== this.activePage) {
      this.activePage = page;
    }
  }

  private updateMaxNumberOfPageLinks(): void {
    const { size } = readCounterResetValue(this.navigationElement);
    this.breakpointMaxNumberOfPageLinks = size;
  }
}
