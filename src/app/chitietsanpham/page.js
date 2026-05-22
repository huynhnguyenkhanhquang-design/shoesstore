"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";
import { products } from "../data";

function ProductDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const p = products.find((item) => item.id === Number(id));

  const [size, setSize] = useState(null);
  const [current, setCurrent] = useState(0);

  if (!p) {
    return <div className={styles.notFound}>Sản phẩm không tồn tại!</div>;
  }

  // ====================== ẢNH CHI TIẾT - GIẢN ĐƠN ======================
  const getDetailImages = (productId) => {
    const mainImage = `/${productId}.png`;
    const detailImages = [];

    // Thử load tối đa 2 ảnh chi tiết (1-2.png và 1-3.png)
    for (let i = 2; i <= 3; i++) {
      detailImages.push(`/${productId}-${i}.png`);
    }

    // Luôn có ảnh chính + ảnh chi tiết (nếu tồn tại thì dùng, không thì chỉ dùng ảnh chính)
    return [mainImage, ...detailImages];
  };

  const images = getDetailImages(p.id);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className={styles.vipContainer}>
      {/* HEADER */}
      <header className={styles.vipHeader}>
        <Link href="/" className={styles.vipLogo}>
          VELVET<span>.SPORT</span>
        </Link>
        <Link href="/" className={styles.vipBackBtn}>
          ← TRANG CHỦ
        </Link>
      </header>

      {/* MAIN */}
      <main className={styles.vipMainGrid}>
        {/* IMAGE AREA */}
        <div className={styles.vipImageArea}>
          <div className={styles.vipImageCard}>
            <Image
              src={images[current]}
              alt={p.name}
              width={800}
              height={500}
              priority
              className={styles.vipImg}
            />

            <button className={styles.sliderBtnLeft} onClick={prevSlide}>←</button>
            <button className={styles.sliderBtnRight} onClick={nextSlide}>→</button>

            <div className={styles.sliderDots}>
              {images.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={index === current ? styles.dotActive : styles.dot}
                />
              ))}
            </div>
          </div>

          {/* THUMBNAILS */}
          <div className={styles.thumbnailRow}>
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={index === current ? styles.thumbnailActive : styles.thumbnail}
              >
                <Image
                  src={img}
                  alt={`thumb ${index}`}
                  width={80}
                  height={80}
                  onError={(e) => {
                    e.target.style.display = 'none'; // Ẩn thumbnail lỗi
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className={styles.vipInfoArea}>
          <p className={styles.vipCategory}>{p.category}</p>
          <h1 className={styles.vipName}>{p.name}</h1>
          <p className={styles.vipPrice}>
            {p.price.toLocaleString("vi-VN")} VNĐ
          </p>

          <div className={styles.vipDivider}></div>

          <div className={styles.vipSizeBox}>
            <p className={styles.vipLabel}>CHỌN KÍCH CỠ (EU)</p>
            <div className={styles.vipSizeGrid}>
              {[39, 40, 41, 42, 43, 44].map((s) => (
                <button
                  key={s}
                  className={size === s ? styles.vipSizeActive : styles.vipSizeBtn}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.vipActionArea}>
            <button className={styles.vipBuyBtn}>THÊM VÀO GIỎ HÀNG</button>
            <a href="#" className={styles.vipOfficialLink}>
              Xem thông số từ nhà sản xuất ↗
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className={styles.loading}>Đang tải...</div>}>
      <ProductDetail />
    </Suspense>
  );
}