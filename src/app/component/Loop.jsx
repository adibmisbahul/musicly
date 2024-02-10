import React from "react";
import styles from "./Loop.module.css";
import Image from "next/image";

export const Loop = ({ src, onClick }) => {
  return <Image className={styles.Loop} src={src} onClick={onClick}/>;
};
