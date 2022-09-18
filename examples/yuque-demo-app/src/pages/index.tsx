import { YuqueDocRender } from 'yuque-doc-render';
import styles from './index.css';

// https://www.yuque.com/hstarorg/docs/mxkwlw
const docHtml = `
<!doctype html><div class=\"lake-content\" typography=\"classic\"><h2 id=\"uUuHn\"><span class=\"ne-text\">用法</span></h2><h3 id=\"ftYeA\"><span class=\"ne-text\">设置 / 更新</span></h3><pre data-language=\"bash\" id=\"MSwx2\" class=\"ne-codeblock language-bash\">export &lt;key&gt;=&lt;key&gt;</pre><h3 id=\"gzFO6\"><span class=\"ne-text\">删除</span></h3><pre data-language=\"bash\" id=\"b1z2p\" class=\"ne-codeblock language-bash\">unset &lt;key&gt;</pre><h3 id=\"ZocmG\"><span class=\"ne-text\">查看</span></h3><pre data-language=\"bash\" id=\"vCxxn\" class=\"ne-codeblock language-bash\"># 查看全部 \nenv\n\n# 输出指定环境变量值\necho $&lt;key&gt;</pre><h2 id=\"urjCD\"><span class=\"ne-text\">案例</span></h2><h3 id=\"muhnR\"><span class=\"ne-text\">设置网络代理到 Charles 抓取 Node 请求</span></h3><pre data-language=\"bash\" id=\"E3pY3\" class=\"ne-codeblock language-bash\">export https_proxy=http://127.0.0.1:8888</pre></div>
`;

export default function HomePage() {
  return (
    <div>
      <YuqueDocRender docHtml={docHtml} className={styles.yuqueDoc} />
    </div>
  );
}
