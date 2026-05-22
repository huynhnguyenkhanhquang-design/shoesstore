"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { products } from "./data";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProducts = products.filter((p) => {
    const matchCategory = filter === "All" || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.logo}>
          VELVET<span>.SPORT</span>
        </div>

        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Tìm kiếm sneaker..."
            className={styles.searchBar}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className={styles.hero}>
        <p className={styles.heroTag}>PREMIUM SNEAKERS COLLECTION</p>
        <h1 className={styles.heroTitle}>
          FUTURE OF <span>SNEAKERS</span>
        </h1>
      </section>

      {/* MAIN CONTENT */}
      <div className={styles.mainLayout}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <h3>DANH MỤC</h3>
          <ul className={styles.filterList}>
            <li
              onClick={() => setFilter("All")}
              className={filter === "All" ? styles.activeFilter : ""}
            >
              Tất cả sản phẩm
            </li>
            <li
              onClick={() => setFilter("Nike")}
              className={filter === "Nike" ? styles.activeFilter : ""}
            >
              Nike
            </li>
            <li
              onClick={() => setFilter("Adidas")}
              className={filter === "Adidas" ? styles.activeFilter : ""}
            >
              Adidas
            </li>
            <li
              onClick={() => setFilter("Casual")}
              className={filter === "Casual" ? styles.activeFilter : ""}
            >
              Casual
            </li>
            <li
              onClick={() => setFilter("Limited")}
              className={filter === "Limited" ? styles.activeFilter : ""}
            >
              Limited
            </li>
          </ul>
        </aside>

        {/* PRODUCTS GRID */}
        <main className={styles.grid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <Link
                href={`/chitietsanpham?id=${p.id}`}
                key={p.id}
                className={styles.card}
              >
                <div className={styles.imageBox}>
                  <div className={styles.imageGlow}></div>
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={320}
                    height={320}
                    className={styles.productImg}
                    priority={p.id <= 4} // Tối ưu cho ảnh đầu tiên
                  />
                </div>

                <div className={styles.info}>
                  <span className={styles.brand}>{p.category}</span>
                  <h4>{p.name}</h4>
                  <p className={styles.price}>
                    {p.price.toLocaleString("vi-VN")} VNĐ
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>Không tìm thấy sản phẩm nào.</p>
          )}
        </main>
      </div>
    </div>
  );
} 