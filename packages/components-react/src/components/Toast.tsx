import { PToast, useToastManager } from '@porsche-design-system/components-react';
import { useEffect } from 'react';

export const Toast = ({ text }: { text: string }): JSX.Element => {
  const { addMessage } = useToastManager();
  useEffect(() => {
    addMessage({ text });
  }, []);

  return <PToast />;
};
