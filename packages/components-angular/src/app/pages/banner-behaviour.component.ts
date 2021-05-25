import { Component } from '@angular/core';

@Component({
  selector: 'page-banner-behaviour',
  styles: [
    `
      .playground p-banner {
        --p-banner-position-type: static;
      }
    `,
  ],
  template: `
    <div class="playground" title="should keep banners unaltered after closing and opening new banners">
      <p-banner id="banner-close">
        <span slot="title">This banner is closed immediately</span>
        <span slot="description"
          >Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span
        >
      </p-banner>

      <p-banner>
        <span slot="title">Some open banner</span>
        <span slot="description"
          >Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.</span
        >
      </p-banner>
    </div>
  `,
})
export class BannerBehaviourComponent {}
