import { useEffect, useRef } from 'react';
import { highlightElement } from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-basic';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-erlang';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-objectivec';
// 被 php 依赖
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
// 必须放在 plsql 之前，被 plsql 依赖
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-plsql';
import 'prismjs/components/prism-pascal';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-systemd';
import 'prismjs/components/prism-tcl';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-vbnet';
import 'prismjs/components/prism-verilog';
import 'prismjs/components/prism-velocity';
import 'prismjs/components/prism-yaml';
// "KaTeX", "Vue", "sTeX" 不存在

import { HtmlRender, HtmlRenderRef } from '../html-render-react/HtmlRender';

export type YuqueDocRenderProps = {
  className?: string;
  docHtml: string;
};

const styles = [
  { href: 'https://editor.yuque.com/ne-editor/lake-content-v1.css' },
  { href: 'https://prismjs.com/themes/prism-tomorrow.css' },
];

export function YuqueDocRender(props: YuqueDocRenderProps) {
  const { docHtml, className } = props;

  const htmlRenderRef = useRef<HtmlRenderRef>(null);

  useEffect(() => {
    setTimeout(() => {
      if (htmlRenderRef.current) {
        const contentDom: HTMLDivElement = htmlRenderRef.current.getContentDOM();
        contentDom.querySelectorAll('pre.ne-codeblock').forEach((item) => {
          highlightElement(item);
        });
      }
    });
  }, [docHtml]);

  return <HtmlRender htmlContent={docHtml} ref={htmlRenderRef} className={className} styles={styles} />;
}
