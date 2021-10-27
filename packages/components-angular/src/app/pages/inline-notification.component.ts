import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'page-inline-notification',
  template: `
    <div class="playground light" title="should show inline-notification neutral on light background">
      <p-inline-notification
        [heading]="'Some inline-notification heading'"
        [description]="'Some inline-notification description.'"
      ></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification neutral on dark background">
      <p-inline-notification
        [heading]="'Some inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification warning on light background">
      <p-inline-notification
        [heading]="'Some warning inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [state]="'warning'"
      ></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification warning on dark background">
      <p-inline-notification
        [heading]="'Some warning inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [state]="'warning'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification success on light background">
      <p-inline-notification
        [heading]="'Some success inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [state]="'success'"
      ></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification success on dark background">
      <p-inline-notification
        [heading]="'Some success inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [state]="'success'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification error on light background">
      <p-inline-notification
        [heading]="'Some error inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [state]="'error'"
      ></p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification error on dark background">
      <p-inline-notification
        [heading]="'Some error inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [state]="'error'"
        [theme]="'dark'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification with slotted content on light background">
      <p-inline-notification>
        <span slot="heading">Some slotted inline-notification heading</span>
        Some slotted inline-notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
      </p-inline-notification>
    </div>

    <div class="playground dark" title="should show inline-notification with slotted content on dark background">
      <p-inline-notification [theme]="'dark'">
        <span slot="heading">Some slotted inline-notification heading</span>
        Some slotted inline-notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
      </p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification with action button">
      <p-inline-notification
        [heading]="'Some action button inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [actionLabel]="'Some action'"
        [actionIcon]="'arrow-double-right'"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification with loading action button">
      <p-inline-notification
        [heading]="'Some action button inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [actionLabel]="'Some loading action'"
        [actionLoading]="true"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification in persistent mode">
      <p-inline-notification
        [heading]="'Some persistent inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [persistent]="true"
      ></p-inline-notification>
    </div>

    <div class="playground light" title="should show inline-notification in persistent mode with action button">
      <p-inline-notification
        [heading]="'Some persistent inline-notification heading'"
        [description]="'Some inline-notification description.'"
        [persistent]="true"
        [actionLabel]="'Some action'"
      ></p-inline-notification>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineNotificationComponent {}
