import "./navbar.css";
import Image from "next/image";
import Link from "next/link";

import SetingsIcon from "../../../public/setings icon.png";
import NotifIcon from "../../../public/notif.png";
import Avatar from "../../../public/avatar.jpeg";
import { Search } from "../component/Search";

export default function navbar() {
  return (
    <div>
      <div className="wrapnavbar">
        <div className="navleft">
          <h1>Music</h1>
          <h1>Podcast</h1>
          <h1>Live</h1>
        </div>
        <div className="navright">
          <div>
            <Image
              src={SetingsIcon}
              width={20}
              height={20}
              alt="Picture of the author"
            />
          </div>
          <div>
            <Image
              src={NotifIcon}
              width={15}
              height={15}
              alt="Picture of the author"
            />
          </div>
          <div className="avatar">
            <Image
              className="iavatar"
              src={Avatar}
              width={35}
              height={35}
              alt="Picture of the author"
            />
            <Link rel="stylesheet" href="http://localhost:5000/" >login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
