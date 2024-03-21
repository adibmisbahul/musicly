import styles from "../artis/artis.module.css"
import Image from "next/image"

export default function Artissspage () {
    return(
        <div className={styles.wrapartisss}>
            <div className={styles.headerartis}>
                <Image src={"https://i.pinimg.com/564x/0f/58/36/0f58367e1fda58a365698e81836ce1dc.jpg"} alt="" width={200} height={200}/>
            </div>
        </div>
    )
}