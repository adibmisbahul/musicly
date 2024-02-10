import "./sidebar.css";
import Image from "next/image";

import logo from "../../../public/logo.png"

export default function sidebar() {
  return (
    <div>
      <div className="wrapsidebar">
        <div className="sidebarlogo">
          <Image
            src={logo}
            width={25}
            height={25}
            alt="Picture of the author"
          />
          <h1>Musicly</h1>
        </div>
      </div>
    </div>
  );
}
