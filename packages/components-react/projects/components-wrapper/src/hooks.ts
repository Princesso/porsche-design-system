import type { MutableRefObject } from 'react';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { PorscheDesignSystemContext } from './provider';
import { getMergedClassName } from './utils';

export function usePrefix(tagName: string): string {
  const { prefix } = useContext(PorscheDesignSystemContext);

  if (prefix === undefined) {
    throw new Error('It appears the <PorscheDesignSystemProvider /> is missing. Make sure to wrap your App in it.');
  }

  return prefix ? `${prefix}-${tagName}` : tagName;
}

export const useEventCallback = (
  ref: MutableRefObject<HTMLElement>,
  eventName: string,
  eventHandler: (e: Event) => void
): void => {
  useEffect(() => {
    const { current } = ref;
    if (current && eventHandler) {
      current.addEventListener(eventName, eventHandler);
      return () => current?.removeEventListener(eventName, eventHandler);
    }
  }, [eventHandler]);
};

export const useMergedClass = (ref: MutableRefObject<HTMLElement>, className: string) => {
  const prevComponentClassName = useRef<string>();
  return useMemo(() => {
    const { current } = ref;
    let newClassName = className;

    if (current) {
      newClassName = getMergedClassName(current.className, prevComponentClassName.current, className);
      // the jsx does not override className when the attribute changes
      current.className = newClassName;
    }
    prevComponentClassName.current = className;
    return newClassName;
  }, [className]);
};
