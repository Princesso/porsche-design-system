import {
  addEventListener,
  getActiveElementId,
  getActiveElementTagName,
  getActiveElementTagNameInShadowRoot,
  getAttribute,
  getBrowser,
  getElementStyle,
  initAddEventListener,
  selectNode,
  setContentWithDesignSystem,
  waitForStencilLifecycle,
} from '../helpers';
import { Page } from 'puppeteer';

describe('modal', () => {
  let page: Page;

  beforeEach(async () => {
    page = await getBrowser().newPage();
  });
  afterEach(async () => await page.close());

  const getModalHost = () => selectNode(page, 'p-modal');
  const getModal = () => selectNode(page, 'p-modal >>> .p-modal');
  const getModalCloseButton = () => selectNode(page, 'p-modal >>> .p-modal__close p-button-pure');
  const getModalAside = () => selectNode(page, 'p-modal >>> aside');

  const initBasicModal = ({ isOpen }: { isOpen: boolean } = { isOpen: true }) =>
    setContentWithDesignSystem(
      page,
      `
      <p-modal heading="Some Heading" ${isOpen ? 'open' : ''}>
        Some Content
      </p-modal>`
    );

  const initAdvancedModal = () =>
    setContentWithDesignSystem(
      page,
      `
      <p-modal heading="Some Heading">
        Some Content
        <p-button id="btn-content-1">Content Button 1</p-button>
        <p-button id="btn-content-2">Content Button 2</p-button>

        <div>
          <p-button id="btn-footer-1">Footer Button 1</p-button>
          <p-button id="btn-footer-2">Footer Button 2</p-button>
        </div>
      </p-modal>`
    );

  const openModal = async () => {
    await (await getModalHost()).evaluate((el) => el.setAttribute('open', ''));
    await waitForStencilLifecycle(page);
  };

  const getModalVisibility = async () => await getElementStyle(await getModal(), 'visibility');

  it('should render and be visible when open', async () => {
    await initBasicModal();
    expect(await getModal()).not.toBeNull();
    expect(await getModalVisibility()).toBe('visible');
  });

  it('should not be visible when not open', async () => {
    await initBasicModal({ isOpen: false });
    expect(await getModalVisibility()).toBe('hidden');
  });

  describe('can be closed', () => {
    let calls = 0;

    beforeEach(async () => {
      calls = 0;
      await initBasicModal();
      await initAddEventListener(page);
      await addEventListener(await getModalHost(), 'close', () => calls++);
    });

    it('should be closable via x button', async () => {
      const closeBtn = await getModalCloseButton();
      expect(closeBtn).not.toBeNull();

      await closeBtn.click();
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
    });

    it('should be closable via esc key', async () => {
      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
    });

    it('should not be closable via esc key when disableCloseButton is set', async () => {
      const host = await getModalHost();
      await host.evaluate((el) => el.setAttribute('disable-close-button', ''));
      await page.keyboard.press('Escape');
      await waitForStencilLifecycle(page);

      expect(calls).toBe(0);
    });

    it('should be closable via backdrop', async () => {
      // click in each corner based on 1920x800 screen
      await page.mouse.click(5, 5);
      await page.mouse.click(1915, 5);
      await page.mouse.click(5, 795);
      await page.mouse.click(1915, 795);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(4);

      // click in middle should not close modal
      await page.mouse.click(960, 400);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(4);
    });

    it('should not be closable via backdrop when disableBackdropClick is set', async () => {
      await (await getModalHost()).evaluate((el) => el.setAttribute('disable-backdrop-click', ''));
      await waitForStencilLifecycle(page);
      await page.mouse.click(5, 5);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(0);
    });

    it('should not bubble close event', async () => {
      let bodyCalls = 0;
      await addEventListener(await selectNode(page, 'body'), 'close', () => bodyCalls++);
      await page.mouse.click(5, 5);
      await waitForStencilLifecycle(page);

      expect(calls).toBe(1);
      expect(bodyCalls).toBe(0);
    });
  });

  describe('can be controlled via keyboard', () => {
    it('should focus first focusable element', async () => {
      await initAdvancedModal();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(await getModalHost())).toBe('P-BUTTON-PURE'); // close button
    });

    it('should focus close button when there is no focusable content element', async () => {
      await initBasicModal({ isOpen: false });
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(await getModalHost())).toBe('P-BUTTON-PURE'); // close button
    });

    it('should cycle tab events within modal', async () => {
      await initAdvancedModal();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(await getModalHost())).toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagNameInShadowRoot(await getModalHost())).toBe('P-BUTTON-PURE'); // close button
    });

    it('should reverse cycle tab events within modal', async () => {
      await initAdvancedModal();
      await openModal();
      expect(await getActiveElementTagNameInShadowRoot(await getModalHost())).toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-footer-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-2');
      await page.keyboard.press('Tab');
      expect(await getActiveElementId(page)).toBe('btn-content-1');
      await page.keyboard.press('Tab');
      expect(await getActiveElementTagNameInShadowRoot(await getModalHost())).toBe('P-BUTTON-PURE'); // close button
      await page.keyboard.up('ShiftLeft');
    });

    it('should focus nothing when there is no focusable element', async () => {
      await setContentWithDesignSystem(
        page,
        `
        <p-modal heading="Some Heading" disable-close-button>
          Some Content
        </p-modal>`
      );
      await openModal();
      const activeElementTagName = await getActiveElementTagName(page);
      expect(activeElementTagName).toBe('BODY');
    });
  });

  it('should focus last focused element after modal is closed', async () => {
    await setContentWithDesignSystem(
      page,
      `
      <button id="btn-open"></button>
      <p-modal id="modal" heading="Some Heading">
        Some Content
      </p-modal>
      <script>
        const modal = document.getElementById('modal');
        document.getElementById('btn-open').addEventListener('click', () => {
          modal.setAttribute('open', '');
        });
        modal.addEventListener('close', () => {
          modal.removeAttribute('open');
        });
      </script>`
    );

    expect(await getModalVisibility()).toBe('hidden');
    expect(await getActiveElementTagName(page)).toBe('BODY');

    await (await selectNode(page, '#btn-open')).click();
    await waitForStencilLifecycle(page);
    expect(await getModalVisibility()).toBe('visible');

    await page.keyboard.press('Escape');
    await waitForStencilLifecycle(page);
    await page.waitForTimeout(600); // transition delay for visibility
    expect(await getModalVisibility()).toBe('hidden');
    expect(await getActiveElementId(page)).toBe('btn-open');
  });

  it('should prevent page from scrolling when open', async () => {
    await initBasicModal({ isOpen: false });
    const body = await selectNode(page, 'body');
    const getBodyOverflow = () => getElementStyle(body, 'overflow');

    expect(await getBodyOverflow()).toBe('visible');
    await openModal();
    expect(await getBodyOverflow()).toBe('hidden');

    await (await getModalHost()).evaluate((el) => el.removeAttribute('open'));

    await waitForStencilLifecycle(page);
    expect(await getBodyOverflow()).toBe('visible');
  });

  it('should prevent page from scrolling when initially open', async () => {
    await initBasicModal({ isOpen: true });
    const body = await selectNode(page, 'body');
    const getBodyOverflow = () => getElementStyle(body, 'overflow');

    expect(await getBodyOverflow()).toBe('hidden');
  });

  it('should remove overflow hidden from body if unmounted', async () => {
    await initBasicModal({ isOpen: true });
    const body = await selectNode(page, 'body');
    const getBodyOverflow = () => getElementStyle(body, 'overflow');

    expect(await getBodyOverflow()).toBe('hidden');

    await page.evaluate(() => {
      const el = document.querySelector('p-modal');

      () => el.remove();
    });
    await waitForStencilLifecycle(page);

    expect(await getBodyOverflow()).toBe('visible');
  });

  it('should have correct aria-hidden value', async () => {
    await initBasicModal({ isOpen: false });
    const aside = await getModalAside();

    expect(await getAttribute(aside, 'aria-hidden')).toBe('true');

    await openModal();
    await waitForStencilLifecycle(page);

    expect(await getAttribute(aside, 'aria-hidden')).toBe('false');
  });
});
