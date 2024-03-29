"use client";
import React, { useState, useEffect } from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";
import Image from "next/image";

import logo from "../assets/logo musicly.png";
import compasIcon from "../icons/bi--compass-fill.svg";
import musicIcon from "../icons/icon-park-outline--sound-wave.svg";
import musicIcon2 from "../icons/icon-park-outline--sound-wave.svg";
import micIcon from "../icons/ic--sharp-mic.svg";
import radioIcon from "../icons/solar--radio-bold.svg";
import loopCurrentBtn from "../icons/loop_current.png";
import loopNoneBtn from "../icons/entypo--loop.svg";
import previousBtn from "../icons/previous.svg";
import playButton from "../icons/play.svg";
import pauseBtn from "../icons/material-symbols-light--pause-outline.svg";
import nextBtn from "../icons/next.svg";
import shuffleAllBtn from "../icons/shuffle_all.png";
import shuffleNoneBtn from "../icons/icon-park-outline--shuffle.svg";
import the1975 from "../assets/the 1975.png";
import dadysHome from "../assets/dadysHome.jpeg";
import heaevenSent from "../assets/heaventSent.jpeg";
import kmagic from "../assets/24k magic.webp";
import theWeekend from "../assets/abel.png";
import chaseAtlantic from "../assets/Chase Atlantic.png";
import sza from "../assets/SOS album by Sza 1.png";
import joji from "../assets/joji.png";
import brunoMars2 from "../assets/bruno mars.png";
import lany from "../assets/lany.png";
import Sza from "../assets/sza.jpg"
/////////////Play Music/////////////

import { PageTemplate } from "./PageTemplate";
import { TagsTemplate } from "./TagsTemplate";
import { TagItem } from "./TagItem";
import { Search } from "./Search";
import { PlayerTemplate } from "./PlayerTemplate";
import { TitleAndTimeBox } from "./TitleAndTimeBox";
import { Title } from "./Title";
import { Time } from "./Time";
import { Progress } from "./Progress";
import { ButtonsAndVolumeBox } from "./ButtonsAndVolumeBox";
import { ButtonsBox } from "./ButtonsBox";
import { Loop } from "./Loop";
import { Previous } from "./Previous";
import { Play } from "./Play";
import { Pause } from "./Pause";
import { Next } from "./Next";
import { Shuffle } from "./Shuffle";
import { Volume } from "./Volume";
import { PlaylistTemplate } from "./PlaylistTemplate";
import { PlaylistItem } from "./PlaylistItem";
import { ImageArtis12 } from "./imageArtis";
import ListItems from "./topartis/topArtis";
import Navigasi from "./navigasi";

const fmtMSS = (s ) => new Date(1000 * s ).toISOString().substr(15, 4);

const tracks = [
  // {
  //   imageArtis: the1975,
  //   url: "https://od.lk/s/NzJfNDQ4NTA5Nzhf/aboutYou.mp3",
  //   title: "About You",
  //   durasi: "5:23",
  //   tags: ["house"],
  // },
  {
    imageArtis: heaevenSent,
    url: "https://audio.jukehost.co.uk/Ek3A05BspOvUMD5B0Tc4jEe0JccOyy55",
    title: "Heaven Sent",
    durasi: "2:50",
    tags: ["dnb"],
  },
  {
    imageArtis: Sza,
    url: "https://audio.jukehost.co.uk/8hPPKe7WfT1SHKSh29xmiJddAhLFBdga",
    title: "Heaven Sent",
    durasi: "2:50",
    tags: ["dnb"],
  },
  // {
  //   imageArtis: dadysHome,
  //   url: "https://od.lk/s/NzJfNDQ4NTA5Nzlf/papahPulang.mp3",
  //   title: "Dadys Home",
  //   durasi: "4:12",
  //   tags: ["dubstep"],
  // },
  // {
  //   imageArtis: kmagic,
  //   url: "https://od.lk/s/NzJfNDQ4NTA5ODFf/versace%20on%20the%20floor.mp3",
  //   title: "versace on the floor",
  //   durasi: "5:36",
  //   tags: ["dubstep"],
  // },
];

const links = [
  { name: "Explore", path: "/", icons: compasIcon },
  { name: "Genres", path: "/genre", icons: musicIcon },
  { name: "Albums", path: "/", icons: musicIcon2 },
  { name: "Artis", path: "/", icons: micIcon },
  { name: "Tester", path: "/tester", icons: radioIcon },
];

const Sidebar = ({
  trackList = tracks,
  includeTags = true,
  includeSearch = false,
  showPlaylist = true,
  sortTracks = false,
  autoPlayNextTrack = true,
  artisImage = true,
  customColorScheme = {},
}) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [title, setTitle] = useState("");
  const [imageArtis, setImageArtis] = useState("");
  const [length, setLength] = useState(0);
  const [time, setTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [buffer, setBuffer] = useState(0);
  const [drag, setDrag] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [shuffled, setShuffled] = useState(false);
  const [looped, setLooped] = useState(false);

  let playlist = [];
  const [filter, setFilter] = useState([]);
  let [curTrack, setCurTrack] = useState(0);
  const [query, updateQuery] = useState("");

  const tags = [];
  trackList.forEach((track) => {
    track.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  for (const [variable, value] of Object.entries(customColorScheme)) {
    document.documentElement.style.setProperty(`--${variable}`, value);
  }

  useEffect(() => {
    const audio = new Audio(trackList[curTrack].url);
    audio.load();

    const setAudioData = () => {
      setLength(audio.duration);
      setTime(audio.currentTime);
    };

    const setAudioTime = () => {
      const curTime = audio.currentTime;
      setTime(curTime);
      setSlider(curTime ? ((curTime * 100) / audio.duration).toFixed(1) : 0);
    };

    const setAudioProgress = () => {
      const bufferedPercentage = (audio.buffered.end(0) / audio.duration) * 100;
      setBuffer(bufferedPercentage.toFixed(2));
    };

    const setAudioVolume = () => setVolume(audio.volume);
    const setAudioEnd = () => setHasEnded(!hasEnded);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("progress", setAudioProgress);
    audio.addEventListener("volumechange", setAudioVolume);
    audio.addEventListener("ended", setAudioEnd);

    setAudio(audio);
    setTitle(trackList[curTrack].title);
    setImageArtis(trackList[curTrack].imageArtis);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("progress", setAudioProgress);
      audio.removeEventListener("volumechange", setAudioVolume);
      audio.removeEventListener("ended", setAudioEnd);
    };
  }, []);

  useEffect(() => {
    if (audio !== null) {
      audio.src = trackList[curTrack].url;
      audio.load();

      audio.oncanplay = () => {
        setTitle(trackList[curTrack].title);
        setImageArtis(trackList[curTrack].imageArtis);
        play();
      };

      const setAudioEnd = () => {
        setHasEnded(!hasEnded);
      };
      audio.addEventListener("ended", setAudioEnd);

      return () => {
        audio.removeEventListener("ended", setAudioEnd);
      };
    }
  }, [curTrack]);

  useEffect(() => {
    if (audio != null) {
      if (shuffled) {
        playlist = shufflePlaylist(playlist);
      }
      if (looped) {
        play();
      } else if (autoPlayNextTrack && !looped) {
        next();
      } else {
        setIsPlaying(false);
      }
    }
  }, [hasEnded]);

  useEffect(() => {
    if (audio != null) {
      audio.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audio != null) {
      pause();
      const val = Math.round((drag * audio.duration) / 100);
      const bufferedRanges = audio.buffered;

      let isInBufferedRange = false;
      for (let i = 0; i < bufferedRanges.length; i++) {
        if (val >= bufferedRanges.start(i) && val <= bufferedRanges.end(i)) {
          isInBufferedRange = true;
          break;
        }
      }

      if (isInBufferedRange) {
        audio.currentTime = val;
      } else {
        const waitingHandler = () => {
          if (audio.readyState === 4) {
            audio.removeEventListener("waiting", waitingHandler);
            // console.log("waiting for data");
          }
        };
        audio.addEventListener("waiting", waitingHandler);
      }
    }
  }, [drag]);

  useEffect(() => {
    if (audio != null) {
      let setAudioEnd;

      if (looped) {
        setAudioEnd = () => {
          audio.currentTime = 0;
          audio.play();
        };
      } else {
        setAudioEnd = () => {
          setHasEnded(!hasEnded);
        };
      }

      audio.addEventListener("ended", setAudioEnd);

      return () => {
        audio.removeEventListener("ended", setAudioEnd);
      };
    }
  }, [looped]);

  useEffect(() => {
    if (!playlist.includes(curTrack)) {
      setCurTrack((curTrack = playlist[0]));
    }
  }, [filter]);

  //  Handle functions

  const loop = () => {
    setLooped(!looped);
  };

  const previous = () => {
    const index = playlist.indexOf(curTrack);
    index !== 0
      ? setCurTrack((curTrack = playlist[index - 1]))
      : setCurTrack((curTrack = playlist[playlist.length - 1]));
  };

  const play = () => {
    setIsPlaying(true);
    audio.play();
  };

  const pause = () => {
    setIsPlaying(false);
    audio.pause();
  };

  const next = () => {
    const index = playlist.indexOf(curTrack);
    index !== playlist.length - 1
      ? setCurTrack((curTrack = playlist[index + 1]))
      : setCurTrack((curTrack = playlist[0]));
  };

  const shuffle = () => {
    setShuffled(!shuffled);
  };

  const shufflePlaylist = (arr) => {
    if (arr.length === 1) return arr;
    const rand = Math.floor(Math.random() * arr.length);
    return [arr[rand], ...shufflePlaylist(arr.filter((_, i) => i !== rand))];
  };

  const sortCompare = (a, b) =>
    !sortTracks ? null : a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;

  const tagClickHandler = (e) => {
    const tag = e.currentTarget.innerHTML;
    if (!filter.includes(tag)) {
      setFilter([...filter, tag]);
    } else {
      const filteredArray = filter.filter((item) => item !== tag);
      setFilter([...filteredArray]);
    }
  };

  const playlistItemClickHandler = (e) => {
    const num = Number(e.currentTarget.getAttribute("data-key"));
    const index = playlist.indexOf(num);
    setCurTrack((curTrack = playlist[index]));
    play();
  };

  return (
    <>
      <div>
        <div className={styles.kontolBesar}>
          <PageTemplate>
            {includeSearch && (
              <Search
                value={query}
                onChange={(e) => updateQuery(e.target.value.toLowerCase())}
                placeholder={`Search ${trackList.length} tracks...`}
              />
            )}
          </PageTemplate>
          {includeTags && (
            <TagsTemplate>
              {tags.map((tag, index) => {
                return (
                  <TagItem
                    key={index}
                    status={
                      filter.length !== 0 && filter.includes(tag)
                        ? "active"
                        : ""
                    }
                    tag={tag}
                    onClick={tagClickHandler}
                  />
                );
              })}
            </TagsTemplate>
          )}

          <PlaylistTemplate visibility={showPlaylist}>
            {trackList.sort(sortCompare).map((el, index) => {
              if (
                filter.length === 0 ||
                filter.some((filter) => el.tags.includes(filter))
              ) {
                if (
                  el.title.toLowerCase().includes(query.toLowerCase())
                  // el.imageArtis.toLowerCase().includes(query.toLowerCase())
                ) {
                  playlist.push(index);
                  return (
                    <>
                      {/* <ImageArtis12 imageArtis={imageArtis} /> */}
                      <PlaylistItem
                        status={curTrack === index ? "active" : ""}
                        key={index}
                        data_key={index}
                        imageArtis={el.imageArtis}
                        title={el.title}
                        src={el.url}
                        durasi={el.durasi}
                        onClick={playlistItemClickHandler}
                      />
                    </>
                  );
                }
              }
            })}
          </PlaylistTemplate>
        </div>
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
                  <Link key={b} href={a.path}>
                    {a.name}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className={styles.wraplay}>
            <PlayerTemplate>
              <ImageArtis12 imageArtis={imageArtis} />

              <TitleAndTimeBox>
                <Title title={title} />
                <Time
                  time={`${!time ? "0:00" : fmtMSS(time)}/${
                    !length ? "0:00" : fmtMSS(length)
                  }`}
                />
              </TitleAndTimeBox>
              <Progress
                value={slider}
                progress={buffer}
                onChange={(e) => {
                  setSlider(e.target.value);
                  setDrag(e.target.value);
                }}
                onMouseUp={play}
                onTouchEnd={play}
              />
              <div className="playmusic2">
                <ButtonsAndVolumeBox>
                  <ButtonsBox>
                    <Loop
                      src={looped ? loopCurrentBtn : loopNoneBtn}
                      onClick={loop}
                    />
                    <Previous src={previousBtn} onClick={previous} />
                    {isPlaying ? (
                      <Pause src={pauseBtn} onClick={pause} />
                    ) : (
                      <Play src={playButton} onClick={play} />
                    )}
                    <Next src={nextBtn} onClick={next} />
                    <Shuffle
                      src={shuffled ? shuffleAllBtn : shuffleNoneBtn}
                      onClick={shuffle}
                    />
                  </ButtonsBox>
                  <Volume
                    value={volume}
                    onChange={(e) => {
                      setVolume(e.target.value / 100);
                    }}
                  />
                </ButtonsAndVolumeBox>
              </div>
            </PlayerTemplate>
          </div>
        </div>
      </div>

      {/* <div>
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
                  <Link key={b} href={a.path}>
                    {a.name}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className={styles.wraplay}>
             <PlayerTemplate>
            <ImageArtis12 imageArtis={imageArtis} />

            <TitleAndTimeBox>
              <Title title={title} />
              <Time
                time={`${!time ? "0:00" : fmtMSS(time)}/${
                  !length ? "0:00" : fmtMSS(length)
                }`}
              />
            </TitleAndTimeBox>
            <Progress
              value={slider}
              progress={buffer}
              onChange={(e) => {
                setSlider(e.target.value);
                setDrag(e.target.value);
              }}
              onMouseUp={play}
              onTouchEnd={play}
            />
            <div className="playmusic2">
              <ButtonsAndVolumeBox>
                <ButtonsBox>
                  <Loop
                    src={looped ? loopCurrentBtn : loopNoneBtn}
                    onClick={loop}
                  />
                  <Previous src={previousBtn} onClick={previous} />
                  {isPlaying ? (
                    <Pause src={pauseBtn} onClick={pause} />
                  ) : (
                    <Play src={playButton} onClick={play} />
                  )}
                  <Next src={nextBtn} onClick={next} />
                  <Shuffle
                    src={shuffled ? shuffleAllBtn : shuffleNoneBtn}
                    onClick={shuffle}
                  />
                </ButtonsBox>
                <Volume
                  value={volume}
                  onChange={(e) => {
                    setVolume(e.target.value / 100);
                  }}
                />
              </ButtonsAndVolumeBox>
            </div>
          </PlayerTemplate> 
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;

// export default function sidebar() {
//   const links = [
//     { name: "Explore", path: "/", icons: compasIcon },
//     { name: "Genres", path: "/splash", icons: musicIcon },
//     { name: "Albums", path: "/", icons: musicIcon2 },
//     { name: "Artis", path: "/", icons: micIcon },
//     { name: "Radio", path: "/", icons: radioIcon },
//   ];
//   return (
//     <div>
//       <div className={styles.wrapsidebar}>
//         <div className={styles.sidebarlogo}>
//           <Image
//             src={logo}
//             width={25}
//             height={25}
//             alt="Picture of the author"
//           />
//           <h1>Musicly</h1>
//         </div>
//         <div className={styles.listmenu}>
//           {links.map((a, b) => {
//             return (
//               <div className={styles.tolink}>
//                 <Image src={a.icons} alt="" />
//                 <Link key={b} href={a.path}>
//                   {a.name}
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//         <div className={styles.wraplay}>
//           {/* <PlayerTemplate>
//             <ImageArtis12 imageArtis={imageArtis} />

//             <TitleAndTimeBox>
//               <Title title={title} />
//               <Time
//                 time={`${!time ? "0:00" : fmtMSS(time)}/${
//                   !length ? "0:00" : fmtMSS(length)
//                 }`}
//               />
//             </TitleAndTimeBox>
//             <Progress
//               value={slider}
//               progress={buffer}
//               onChange={(e) => {
//                 setSlider(e.target.value);
//                 setDrag(e.target.value);
//               }}
//               onMouseUp={play}
//               onTouchEnd={play}
//             />
//             <div className="playmusic2">
//               <ButtonsAndVolumeBox>
//                 <ButtonsBox>
//                   <Loop
//                     src={looped ? loopCurrentBtn : loopNoneBtn}
//                     onClick={loop}
//                   />
//                   <Previous src={previousBtn} onClick={previous} />
//                   {isPlaying ? (
//                     <Pause src={pauseBtn} onClick={pause} />
//                   ) : (
//                     <Play src={playButton} onClick={play} />
//                   )}
//                   <Next src={nextBtn} onClick={next} />
//                   <Shuffle
//                     src={shuffled ? shuffleAllBtn : shuffleNoneBtn}
//                     onClick={shuffle}
//                   />
//                 </ButtonsBox>
//                 <Volume
//                   value={volume}
//                   onChange={(e) => {
//                     setVolume(e.target.value / 100);
//                   }}
//                 />
//               </ButtonsAndVolumeBox>
//             </div>
//           </PlayerTemplate> */}
//         </div>
//       </div>
//     </div>
//   );
// }
