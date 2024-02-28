import React from "react";
import Image from "next/image";
import styles from "../topartis/topartis.module.css";

const ListItems = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <>
          <div key={index}>
            <div className={styles.topartis123}>
              <Image src={item.Image} alt="" className={styles.topArtis} />
            </div>
            
          </div>
        </>
      ))}
    </div>
  );
};

export default ListItems;
