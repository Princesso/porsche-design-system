import {
  getAttributeFromHandle,
  getClassFromHandle, getElementStyle, getInnerHTMLFromShadowRoot,
  selectNode,
  setContentWithDesignSystem, waitForEventCallbacks, waitForInnerHTMLChange, waitForSelector
} from './helpers';

const iPhone = {
  viewport: {
    width: 375,
    height: 812,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    isLandscape: false
  },
  userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
};

describe('select-wrapper', () => {
  it('should render', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const el = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');
    expect(el).toBeDefined();
  });

  it('should add aria-label to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label');
  });

  it('should add aria-label with description text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label" description="Some description">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some description');
  });

  it('should add aria-label with message text to support screen readers properly', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label" description="Some description" message="Some error message" state="error">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
    const select = await selectNode('p-select-wrapper select');
    expect(await getAttributeFromHandle(select, 'aria-label')).toBe('Some label. Some error message');
  });

  it('should not render label if label prop is not defined but should render if changed programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper>
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await selectNode('p-select-wrapper');
    const getLabelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');

    expect(getLabelText).toBeNull();

    await page.evaluate(el => el.setAttribute('label', 'Some label'), selectComponent);
    expect(getLabelText).toBeDefined();
  });

  it('should add/remove message text and update aria-label attribute with message text if state changes programmatically', async () => {
    await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

    const selectComponent = await selectNode('p-select-wrapper');
    const getMessage = () => selectNode('p-select-wrapper >>> .p-select-wrapper__message'); // has to be a function because it only exists after first setAttribute
    const select = await selectNode('select');

    expect(await getMessage()).toBeNull();

    await page.evaluate(el => el.setAttribute('state', 'error'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some error message'), selectComponent);
    await waitForInnerHTMLChange(selectComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toEqual('alert');
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label. Some error message');

    await page.evaluate(el => el.setAttribute('state', 'success'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', 'Some success message'), selectComponent);
    await waitForInnerHTMLChange(selectComponent);

    expect(await getMessage()).toBeDefined();
    expect(await getAttributeFromHandle(await getMessage(), 'role')).toBeNull();
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label. Some success message');

    await page.evaluate(el => el.setAttribute('state', 'none'), selectComponent);
    await page.evaluate(el => el.setAttribute('message', ''), selectComponent);
    await waitForInnerHTMLChange(selectComponent);

    expect(await getMessage()).toBeNull();
    expect(await getAttributeFromHandle(select, 'aria-label')).toEqual('Some label');
  });

  it('should focus select when label text is clicked', async () => {
    await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const labelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');
    expect(labelText).toBeDefined();

    async function hasSelectFocus() {
      return await page.evaluate(() => {
        const selectElement = document.querySelector('select');
        return document.activeElement === selectElement;
      });
    }

    expect(await hasSelectFocus()).toBe(false);

    await labelText.click();

    expect(await hasSelectFocus()).toBe(true);
  });

  it('should disable fake select when select is set disabled programmatically', async () => {
    await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
      <select name="some-name">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
        <option value="c">Option C</option>
      </select>
    </p-select-wrapper>`);

    const fakeSelect = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');
    const select = await selectNode('select');

    expect(await getClassFromHandle(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = true);
    await waitForSelector(fakeSelect, 'p-select-wrapper__fake-select--disabled');

    expect(await getClassFromHandle(fakeSelect)).toContain('p-select-wrapper__fake-select--disabled');

    await select.evaluate((el: HTMLSelectElement) => el.disabled = false);
    await waitForSelector(fakeSelect, 'p-select-wrapper__fake-select--disabled', {isGone: true});

    expect(await getClassFromHandle(fakeSelect)).not.toContain('p-select-wrapper__fake-select--disabled');
  });

  describe('hover state', () => {

    const getFakeSelect = () => selectNode('p-select-wrapper >>> .p-select-wrapper__fake-select');

    it('should change box-shadow color when fake select is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await fakeSelect.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', true)).not.toBe(initialBoxShadow);
    });

    it('should change box-shadow color of fake select when label text is hovered', async () => {
      await page.reload();
      await setContentWithDesignSystem(`<p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>`);

      const fakeSelect = await getFakeSelect();
      const labelText = await selectNode('p-select-wrapper >>> .p-select-wrapper__label-text');
      const initialBoxShadow = await getElementStyle(fakeSelect, 'boxShadow');

      await labelText.hover();

      expect(await getElementStyle(fakeSelect, 'boxShadow', true)).not.toBe(initialBoxShadow);
    });
  });

  fdescribe('fake drop down', () => {
    it('should render', async () => {
      await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      expect(fakeOptionList).not.toBeNull();
    });

    it('should not render if touch support is detected', async () => {
      await page.emulate(iPhone);
      await setContentWithDesignSystem(`
        <p-select-wrapper label="Some label">
          <select name="some-name">
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
          </select>
        </p-select-wrapper>
      `);
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      expect(fakeOptionList).toBeNull();
      await jestPuppeteer.resetPage();
    });

    it('should be visible if select is clicked and hidden if clicked outside', async () => {
      await setContentWithDesignSystem(`
      <p-text>Some text</p-text>
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const select = await selectNode('select');
      const text = await selectNode('p-text');
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      const getOpacity = () => getElementStyle(fakeOptionList, 'opacity');
      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');

      await text.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');

      await select.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');

      await select.click();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
    });

    it('should add fake option item if added to native select programmatically', async () => {
      await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);
      const select = await selectNode('select');
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      const numberOfOptions = await select.evaluate((el:HTMLElement) => {
        return el.childElementCount;
      });
      const numberOfFakeOptions = await fakeOptionList.evaluate((el:HTMLElement) => {
        return el.childElementCount;
      });
      expect(fakeOptionList).not.toBeNull();
      expect(numberOfFakeOptions).toEqual(numberOfOptions);

      await select.evaluate((el: HTMLSelectElement) => {
        const option = document.createElement('option');
        option.text = 'Test';
        el.add(option,0);
      });
      const text = await getInnerHTMLFromShadowRoot('p-select-wrapper >>> .p-select-wrapper__fake-option:first-child');
      expect(text).toContain('Test');
      expect(numberOfFakeOptions + 1).toEqual(numberOfOptions + 1);
    });

    it('should handle keyboard events', async () => {
      await setContentWithDesignSystem(`
      <p-select-wrapper label="Some label">
        <select name="some-name">
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </select>
      </p-select-wrapper>
    `);

      const select = await selectNode('select');
      const fakeOptionList = await selectNode('p-select-wrapper >>> .p-select-wrapper__fake-option-list');
      const getOpacity = () => getElementStyle(fakeOptionList, 'opacity');
      const getElementPosition = (selector: string) => fakeOptionList.evaluate((el:Element, selector: string) => {
        let option: ChildNode = el.querySelector(selector);
        let pos = 0;
        while((option = option.previousSibling) !== null) pos++;
        return pos;
      }, selector);


      // initial status of highlight and select
      expect(await getElementPosition('.p-select-wrapper__fake-option--highlighted')).toBe(0);
      expect(await getElementPosition('.p-select-wrapper__fake-option--selected')).toBe(0);

      // 1 x arrow down
      await select.focus();
      await select.press('ArrowDown');
      await waitForEventCallbacks();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden', {isGone: true});
      expect(await getOpacity()).toBe('1');
      expect(await getElementPosition('.p-select-wrapper__fake-option--highlighted')).toBe(1);

      await select.press('Enter');
      await waitForEventCallbacks();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition('.p-select-wrapper__fake-option--selected')).toBe(1);

      // 2 x arrow up
      await select.press('ArrowUp');
      await select.press('ArrowUp');
      await waitForEventCallbacks();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden', {isGone: true})
      expect(await getOpacity()).toBe('1');
      expect(await getElementPosition('.p-select-wrapper__fake-option--highlighted')).toBe(2);

      // 1 x arrow down
      await select.press('ArrowDown');
      await waitForEventCallbacks();
      expect(await getElementPosition('.p-select-wrapper__fake-option--highlighted')).toBe(0);

      // Space
      await select.press(' ');
      await waitForEventCallbacks();
      await waitForSelector(fakeOptionList, 'p-select-wrapper__fake-option-list--hidden');
      expect(await getOpacity()).toBe('0');
      expect(await getElementPosition('.p-select-wrapper__fake-option--selected')).toBe(0);

    });
  });
});
