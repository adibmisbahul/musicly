"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "./search.module.css";
import Navigasi from "../component/navigasi";
import image from "../assets/bmth.jpg";
import ariana from "../assets/ari.jpg";
import deftones from "../assets/def.jpg";
import rani from "../assets/rani.jpg";
import waduh from "../assets/waduh.jpg";
import flower from "../assets/flower.jpg";

export default function Serach() {
  const music = [
    { image: deftones, name: "Deftones", name2: "Artist"},
    { image: ariana, name: "Ariana Grande", name2: "Artist"},
  ];

  const music2 = [
    { image: rani, name: "It Will Rain", name2: "Bruno Earth"},
    { image: waduh, name: "Waduh", name2: "By adibmisbahul"},
    { image: flower, name: "Flower Boy", name2:"Tyler, The Creator"},
  ];
  return (
    <div>
      <div>
        <Navigasi />
        <div className={styles.wrapsearch}>
          <h1>Recent Search</h1>
          <div className={styles.wrapsong}>
            {music.map((a, b) => {
              return (
                <div className={styles.toimage}>
                  <Image src={a.image} alt="" />
                  <h1>{a.name}</h1>
                  <h2>{a.name2}</h2>
                </div>
              );
            })}

            {music2.map((c, d) => {
              return (
                <div className={styles.toimage2}>
                  <Image src={c.image} alt="" />
                  <h1>{c.name}</h1>
                  <h2>{c.name2}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
