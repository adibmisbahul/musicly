import React from "react";
import styles from "./Shuffle.module.css";
import Image from "next/image";

export const Shuffle = ({ src, onClick }) => {
  // return <img className={styles.shuffle} src={src} onClick={onClick} />;
  return <Image className={styles.Shuffle} src={src} onClick={onClick}/>
};
