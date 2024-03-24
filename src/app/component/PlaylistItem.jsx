import React from "react";
import styles from "./PlaylistItem.module.css";
import Image from "next/image";

export const PlaylistItem = ({
  status,
  data_key,
  src,
  title,
  onClick,
  imageArtis,
  durasi,
}) => {
  return (
    <>
      <div className={styles.wrapplaylist}>
        <div className={styles.satu}>
          <Image
            className={styles.imageArtis}
            src={imageArtis}
            width={50}
            height={50}
          />
        </div>
        <div className={styles.dua}>
          <p
            className={`${styles.item} ${
              status === "active" ? styles.active : ""
            }`}
            data-key={data_key}
            src={src}
            title={title}
            onClick={onClick}
          >
            {title}
          </p>
        </div>
        <div className={styles.tiga}>
          <p classNamedurasi={styles.textdurasi} durasi={durasi}>
            {durasi}
          </p>
        </div>
      </div>
    </>
  );
};
