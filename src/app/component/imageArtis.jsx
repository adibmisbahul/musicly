import React from "react";
import styles from "./imageArtis.module.css";
import Image from "next/image";

export const ImageArtis12 = ({ imageArtis}) => {
  return (
  <div className={styles.wrapArtis}>
  <Image className={styles.imageArtis} src={imageArtis} width={100} height={100}/>
  </div>
  )
};
