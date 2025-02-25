import { getTextTagType } from './text-utils';
import * as hasSpecificSlottedTagUtil from './../../utils/dom/hasSpecificSlottedTag';

describe('getTextTagType()', () => {
  it('should return div if hasSpecificSlottedTag() is true', () => {
    const host = document.createElement('p-text');
    host.innerHTML = '<p>Some h3</p>';
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(true);

    expect(getTextTagType(host, 'p')).toBe('div');
  });

  it('should return tag value if hasSpecificSlottedTag() is false and tag is passed', () => {
    const host = document.createElement('p-text');
    jest.spyOn(hasSpecificSlottedTagUtil, 'hasSpecificSlottedTag').mockReturnValue(false);

    expect(getTextTagType(host, 'p')).toBe('p');
  });
});
