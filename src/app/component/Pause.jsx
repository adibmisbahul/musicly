import React from "react";
import styles from "./Pause.module.css";
import Image from "next/image";

export const Pause = ({ src, onClick }) => {
  // return <img className={styles.pause} src={src} onClick={onClick} />;
  return <Image className={styles.Pause} src={src} onClick={onClick}/>
};
