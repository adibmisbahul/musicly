import React from "react";
import styles from "./Next.module.css";
import Image from "next/image";

export const Next = ({ src, onClick }) => {
  return <Image className={styles.Next} src={src} onClick={onClick}/>;
};
