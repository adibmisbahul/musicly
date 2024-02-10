import React from "react";
import styles from "./PlayerTemplate.module.css";
import Image from "next/image";

export const PlayerTemplate = ({ children }) => {
  return <div className={styles.wrapper}>
    {children}
  </div>;
};
