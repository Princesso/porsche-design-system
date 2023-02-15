/* Auto Generated File */
import type { NextPage } from 'next';
import { PBanner } from '@porsche-design-system/components-react/ssr';

const BannerPage: NextPage = (): JSX.Element => {
  const style = `
    p-content-wrapper > p {
      margin: 0;
      padding: 4px 2vw;
      text-align: center;
      color: white;
      background-color: lightskyblue;
    }

    div:not(.visualize-grid) {
      margin: 16px 0;
    }

    .playground {
      padding: 0;
    }

    .content-wrapper {
      padding: 300px 0;
    }

    .playground p-banner {
      --p-banner-position-type: static;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="visualize-grid">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      <div title="should show banner info position fixed">
        <PBanner>
          <span slot="title">Some notification position fixed (1)</span>
          <span slot="description">
            Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
          </span>
        </PBanner>
      </div>

      <div className="content-wrapper">
        <div className="playground light" title="should show banner info on light background">
          <PBanner>
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner info with state neutral on light background">
          <PBanner state="neutral">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner info on dark background">
          <PBanner theme="dark">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner info with state neutral on dark background">
          <PBanner state="neutral" theme="dark">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner warning on light background">
          <PBanner state="warning">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner warning on dark background">
          <PBanner state="warning" theme="dark">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner error on light background">
          <PBanner state="error">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground dark" title="should show banner error on dark background">
          <PBanner state="error" theme="dark">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner in persistent mode">
          <PBanner persistent={true}>
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner in basic width">
          <PBanner width="basic">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>

        <div className="playground light" title="should show banner in fluid width which is mapped to extended">
          <PBanner width="fluid">
            <span slot="title">Some notification title</span>
            <span slot="description">
              Some notification description. And some <a href="https://www.porsche.com/">LINK</a> element.
            </span>
          </PBanner>
        </div>
      </div>
    </>
  );
};

export default BannerPage;
