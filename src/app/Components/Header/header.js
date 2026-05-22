import styles from "./header.module.css";

export function Header({ search, setSearch }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>VELVET.SPORT</div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm, thương hiệu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <nav className={styles.nav}>
        <ul>
          <li>Bộ sưu tập</li>
          <li>Thương hiệu</li>
          <li>Mới nhất</li>
          <li>Hỗ trợ</li>
          <li>Blog</li>
        </ul>
      </nav>
    </header>
  );
}