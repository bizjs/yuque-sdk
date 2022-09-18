import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">语雀文档渲染</Link>
        </li>
        <li>
          <Link to="/embed">语雀文档嵌入</Link>
        </li>
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
