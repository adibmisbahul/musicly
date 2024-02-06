import Image from "next/image";
import "./home.css";

import Navigasi from "../../component/navigasi";
import mainImage from "../../public/theweekend.png";
import likeIcon from "../../public/like icon.svg";
import brunoMars from "../../public/24k magic.webp";
import chaseAtlantic from "../../public/Chase Atlantic.png";
import joji from "../../public/joji.png";
import sza from "../../public/SOS album by Sza 1.png";
import theWeekend from "../../public/abel.png";
import brunoMars2 from "../../public/bruno mars.png"; 
import lany from "../../public/lany.png"; 
import the1975 from "../../public/the 1975.png"

export default function Home() {
  return (
    <div>
      <Navigasi />
      <div className="wraphome">
        <div className="mainhome">
          <div className="mainhomeleft">
            <p>Trending New Hist</p>
            <h1>Versace On The Floor</h1>
            <div className="artistname">
              <h1>Bruno Mars</h1>
              <p>63 Millions Follow</p>
            </div>
            <div className="listenow">
              <button>Listen Now</button>
              <div className="border_like">
                <Image
                  src={likeIcon}
                  width={25}
                  height={25}
                  alt="Picture of the author"
                />
              </div>
            </div>
          </div>
          <div className="mainhomeright">
            <Image
              src={brunoMars}
              width={200}
              height={200}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className="mainhomemusic">
          <div className="mainhomemusicleft">
            <div className="wrap_top_artis">
              <div className="top_artis">
                <p>Top Artis</p>
                <p>See All</p>
              </div>
              <div className="top_artis_image ">
                <div className="rounded-full">
                  <Image
                    src={theWeekend}
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                  <h1>The Weekend</h1>
                </div>
                <div className="chaseAtlantic">
                  <Image
                    src={chaseAtlantic}
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                  <h1>Chase Atlantic</h1>
                </div>
                <div className="sza">
                  <Image
                    src={sza}
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                  <h1>Sza</h1>
                </div>
                <div className="backstreet  ">
                  <Image
                    src={joji}
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                  <h1>Joji</h1>
                </div>
                <div className="backstreet  ">
                  <Image
                    src={brunoMars2}
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                  <h1>Bruno Mard</h1>
                </div>
                <div className="backstreet  ">
                  <Image
                    src={lany}
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                  <h1>Lany</h1>
                </div>
                <div className="backstreet  ">
                  <Image
                    src={the1975}
                    width={60}
                    height={60}
                    alt="Picture of the author"
                  />
                  <h1>The 1975</h1>
                </div>
              </div>
            </div>
            <div className="wrap_genre"></div>
            <div className="wrap_chart"></div>
          </div>
          <div className="mainhomemusicright">
            <div className="playmusic"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
