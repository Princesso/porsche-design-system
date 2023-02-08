import {
  getVisualRegressionStatesTester,
  openPopoversAndHighlightSpacer,
  vrtTest,
} from '@porsche-design-system/shared/testing';

const components = [
  'accordion',
  'banner',
  'button',
  'button-pure',
  'checkbox-wrapper',
  'content-wrapper',
  'inline-notification',
  'link',
  'link-pure',
  'link-social',
  'modal-basic',
  'pagination',
  'popover',
  'radio-button-wrapper',
  'scroller',
  'select-wrapper',
  'spinner',
  'tabs',
  'tabs-bar',
  'tag',
  'tag-dismissible',
  'text-field-wrapper',
  'textarea-wrapper',
  'toast-basic',
  'fieldset-wrapper',
  'segmented-control',
];

it.each(components)('should have no visual regression for scaled component %s', async (component) => {
  expect(
    await vrtTest(getVisualRegressionStatesTester(), `${component}-scaling`, `/#${component}`, {
      scenario: async (page) => {
        if (component === 'popover') {
          await openPopoversAndHighlightSpacer(page);
        }
      },
      scalePageFontSize: true,
    })
  ).toBeFalsy();
});
