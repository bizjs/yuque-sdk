import React, { useEffect, useRef } from 'react';
import { ShadowRender } from '@bizjs/shadow-render-react';
import type { ShadowRenderRef } from '@bizjs/shadow-render-react';
import { highlightElement } from 'prismjs';
// 语言包
import './prism-languages';

export type YuqueDocRenderProps = {
  className?: string;
  docHtml: string;
  codeTheme?: string;
};

const styles = [
  { href: 'https://editor.yuque.com/ne-editor/lake-content-v1.css' },
  { href: 'https://prismjs.com/themes/prism-tomorrow.css' },
];

export function YuqueDocRender(props: YuqueDocRenderProps) {
  const { docHtml, className } = props;

  const shadowRenderRef = useRef<ShadowRenderRef>(null);

  useEffect(() => {
    setTimeout(() => {
      if (shadowRenderRef.current) {
        const contentDom: HTMLDivElement = shadowRenderRef.current.getContentDOM();
        contentDom.querySelectorAll('pre.ne-codeblock').forEach((item) => {
          highlightElement(item);
        });
      }
    });
  }, [docHtml]);

  return <ShadowRender htmlContent={docHtml} ref={shadowRenderRef} className={className} styles={styles} />;
}
