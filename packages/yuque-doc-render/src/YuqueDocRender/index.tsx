import { HtmlRender } from '../html-render-react/HtmlRender';

export type YuqueDocRenderProps = {
  className?: string;
  docHtml: string;
};

const styles = [{ href: 'https://editor.yuque.com/ne-editor/lake-content-v1.css' }];

export function YuqueDocRender(props: YuqueDocRenderProps) {
  const { docHtml, className } = props;
  return <HtmlRender htmlContent={docHtml} className={className} styles={styles} />;
}
