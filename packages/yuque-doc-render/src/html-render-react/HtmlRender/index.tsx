import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export type HtmlStyle = { href: string } | string;

export type HtmlRenderProps = {
  className?: string;
  styles?: HtmlStyle[];
  htmlContent: string;
};

const STYLE_CLASS_NAME = 'biz-html-render-shadow-style';

export type HtmlRenderRef = { getContentDOM: () => HTMLDivElement };

export const HtmlRender = forwardRef<HtmlRenderRef, HtmlRenderProps>((props: HtmlRenderProps, ref) => {
  const { htmlContent, styles = [], className } = props;

  const shadowRootRef = useRef<ShadowRoot>();
  const divRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>();

  useImperativeHandle(ref, () => {
    return {
      getContentDOM() {
        return contentRef.current!;
      },
    };
  });

  useEffect(() => {
    // 没有 shadom root 时，先初始化 shadowRoot
    if (!shadowRootRef.current) {
      shadowRootRef.current = divRef.current!.attachShadow({ mode: 'open' });

      // 添加放内容的容器
      const contentEl = document.createElement('div');
      contentEl.setAttribute('class', 'biz-html-content-box');
      contentRef.current = contentEl;
      shadowRootRef.current.appendChild(contentEl);
    }

    const shadowRootDom = shadowRootRef.current!;
    // 处理样式
    // 先清理
    shadowRootDom.querySelectorAll(`.${STYLE_CLASS_NAME}`).forEach((el) => {
      shadowRootDom.removeChild(el);
    });
    // 再循环追加
    styles.forEach((style) => {
      if (typeof style === 'string') {
        const styleEl = document.createElement('style');
        styleEl.setAttribute('class', STYLE_CLASS_NAME);
        styleEl.innerHTML = style;
        shadowRootDom.insertBefore(styleEl, contentRef.current!);
      } else if (style.href) {
        const linkEl = document.createElement('link');
        linkEl.setAttribute('class', STYLE_CLASS_NAME);
        linkEl.setAttribute('rel', 'stylesheet');
        linkEl.setAttribute('href', style.href);
        shadowRootDom.insertBefore(linkEl, contentRef.current!);
      }
    });

    // 处理内容
    contentRef.current!.innerHTML = htmlContent;
  }, [htmlContent, styles]);

  const divClass = `biz-html-render ${className}`;

  return <div className={divClass} ref={divRef}></div>;
});
