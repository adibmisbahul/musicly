"Use client"
import Image from "next/image"

import styles from "../splash/splash.module.css"
import saly from "../assets/Saly.png"

export default function Splash(){
    return(
        <div>
            <div className={styles.splashbackgorund}>
                <h1>Welcome To Musicly</h1>
                <Image className={styles.saly} src={saly} alt="gambar tidak tersedia"/>
            </div>
        </div>
    )
}