/* Auto Generated File */
import { Toast } from '../components';

export const ToastLineBreakPage = (): JSX.Element => {
  const style = `
    .playground {
      height: 300px;
      padding: 0;
      transform: translateX(0);
      border: 1px solid deeppink;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: style }} />

      <div className="playground light" title="should render toast info with line break on light background">
        <Toast text="Some<br> message" />
      </div>
    </>
  );
};
