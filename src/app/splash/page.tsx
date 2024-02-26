"use client"
import { useRouter } from "next/navigation";
import Image from "next/image";

import styles from "../splash/splash.module.css";
import saly from "../assets/Saly.png";


export default function Splash() {
   
const router = useRouter()


  return (
    <div>
      <div className={styles.splashbackgorund}>
        <h1>Welcome To Musicly</h1>
        <Image className={styles.saly} src={saly} alt="gambar tidak tersedia" />
        <button type="button" onClick={() => router.push("/")}>
          click here to continue
        </button>
      </div>
    </div>
  );
}
