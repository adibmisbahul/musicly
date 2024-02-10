import React from "react";
import styles from "./Play.module.css";
import Image from "next/image";

import playButton from "../icons/play.svg"

export const Play = ({ src, onClick }) => {
  // return <img className={styles.play} src={src} onClick={onClick} />;
  return <Image className={styles.Play} src={src} onClick={onClick}/>
};
