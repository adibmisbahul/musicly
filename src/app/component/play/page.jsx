"use client";
import React, { useState, useEffect } from "react";
import  "./play.css";
import Image from "next/image";

import { PageTemplate } from "../PageTemplate";
import { TagsTemplate } from "../TagsTemplate";
import { TagItem } from "../TagItem";
import { Search } from "../Search";
import { PlayerTemplate } from "../PlayerTemplate";
import { TitleAndTimeBox } from "../TitleAndTimeBox";
import { Title } from "../Title";
import { Time } from "../Time";
import { Progress } from "../Progress";
import { ButtonsAndVolumeBox } from "../ButtonsAndVolumeBox";
import { ButtonsBox } from "../ButtonsBox";
import { Loop } from "../Loop";
import { Previous } from "../Previous";
import { Play } from "../Play";
import { Pause } from "../Pause";
import { Next } from "../Next";
import { Shuffle } from "../Shuffle";
import { Volume } from "../Volume";
import { PlaylistTemplate } from "../PlaylistTemplate";
import { PlaylistItem } from "../PlaylistItem";
import { ImageArtis12 } from "../imageArtis";

import loopCurrentBtn from "../../icons/loop_current.png";
import loopNoneBtn from "../../icons/loop_none.png";
import previousBtn from "../../icons/previous.svg";
import playButton from "../../icons/play.svg";
import pauseBtn from "../../icons/pause.png";
import nextBtn from "../../icons/next.svg";
import shuffleAllBtn from "../../icons/shuffle_all.png";
import shuffleNoneBtn from "../../icons/shuffle_none.png";

import the1975 from "../../assets/The1975.jpeg";
import dadysHome from "../../assets/dadysHome.jpeg";
import heaevenSent from "../../assets/heaventSent.jpeg";
import kmagic from "../../assets/24k magic.webp";
import theWeekend from "../../assets/abel.png";
import chaseAtlantic from "../../assets/Chase Atlantic.png";
import sza from "../../assets/SOS album by Sza 1.png";
import joji from "../../assets/joji.png";
import brunoMars2 from "../../assets/bruno mars.png";
import lany from "../../assets/lany.png";

import Navigasi from "../navigasi";
import likeIcon from "../../../../public/like icon.svg";
import { Abel } from "next/font/google";

const fmtMSS = (s) => new Date(1000 * s).toISOString().substr(15, 4);

const tracks = [
  {
    imageArtis: the1975,
    url: "aboutYou.mp3",
    title: "About You",
    durasi: "5:23",
    tags: ["house"],
  },
  {
    imageArtis: heaevenSent,
    url: "heaventSent.mp3",
    title: "Heaven Sent",
    durasi: "2:50",
    tags: ["dnb"],
  },
  {
    imageArtis: dadysHome,
    url: "papahPulang.mp3",
    title: "Dadys Home",
    durasi: "4:12",
    tags: ["dubstep"],
  },
  {
    imageArtis: kmagic,
    url: "versace on the floor.mp3",
    title: "versace on the floor",
    durasi: "5:36",
    tags: ["dubstep"],
  },
];

const topArtis = [
  {name:"The Weekend", Image:(theWeekend)},
  {name:"Chase Atlantic", Image:(chaseAtlantic)},
  {name:"Sza", Image:(sza)},
  {name:"joji", Image:(joji)},
  {name:"Bruno Mars", Image:(brunoMars2)},
  {name:"Lany", Image:(lany)},
  {name:"The 1975", Image:(the1975)},
]


const Player = ({
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
      <PageTemplate>
        {includeSearch && (
          <Search
            value={query}
            onChange={(e) => updateQuery(e.target.value.toLowerCase())}
            placeholder={`Search ${trackList.length} tracks...`}
          />
        )}
      </PageTemplate>
      <div>
        <Navigasi />
        <div className="wraphome" id="style-1">
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
                src={kmagic}
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
              <div className="wrap_genre">
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
              </div>
              <div className="wrap_chart">
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
            </div>
            <div className="mainhomemusicright">
              <div className="playmusic">
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
        </div>
      </div>
    </>
  );
};

export default Player;
