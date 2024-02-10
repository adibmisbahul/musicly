import React from "react";
import styles from "./Previous.module.css";
import Image from "next/image";

export const Previous = ({ src, onClick }) => {
  return <Image className={styles.Previous} src={src} onClick={onClick}/>;
};
