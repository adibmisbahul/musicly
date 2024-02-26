import styles from "./sidebar.module.css";
import Link from "next/link";
import Image from "next/image";

import logo from "../assets/logo musicly.png";
import compasIcon from "../icons/bi--compass-fill.svg";
import musicIcon from "../icons/icon-park-outline--sound-wave.svg";
import musicIcon2 from "../icons/icon-park-outline--sound-wave.svg";
import micIcon from "../icons/ic--sharp-mic.svg";
import radioIcon from "../icons/solar--radio-bold.svg";

export default function sidebar() {
  const links = [
    { name: "Explore", path: "/", icons: compasIcon },
    { name: "Genres", path: "/splash", icons: musicIcon },
    { name: "Albums", path: "/", icons: musicIcon2 },
    { name: "Artis", path: "/", icons: micIcon },
    { name: "Radio", path: "/", icons: radioIcon },
  ];
  return (
    <div>
      <div className={styles.wrapsidebar}>
        <div className={styles.sidebarlogo}>
          <Image
            src={logo}
            width={25}
            height={25}
            alt="Picture of the author"
          />
          <h1>Musicly</h1>
        </div>
        <div className={styles.listmenu}>
          {links.map((a, b) => {
            return (
              <div className={styles.tolink}>
                <Image src={a.icons} alt="" />
                <Link key={b} href={a.path} >
                  {a.name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
