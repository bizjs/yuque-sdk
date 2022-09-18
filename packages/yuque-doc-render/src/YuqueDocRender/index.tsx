import { HtmlRender } from '../html-render-react/HtmlRender';

export type YuqueDocRenderProps = {
  docHtml: string;
};

export function YuqueDocRender(props: YuqueDocRenderProps) {
  const { docHtml } = props;
  return <HtmlRender />;
}
