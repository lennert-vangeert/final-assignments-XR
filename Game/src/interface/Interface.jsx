import React, { useEffect, useRef, useState } from "react";
import useGame from "../stores/useGame";
import { addEffect } from "@react-three/fiber";
import Leaderboard from "./Leaderboard";
import SoundOn from "../icons/SoundOn";
import SoundOff from "../icons/SoundOff";
import Credits from "./Credits";
import EndScore from "./endScore";

const Interface = () => {
  const time = useRef();
  const restart = useGame((state) => state.restart);
  const start = useGame((state) => state.start);
  const ready = useGame((state) => state.ready);
  const phase = useGame((state) => state.phase);
  const menuPhase = useGame((state) => state.menuPhase);
  const menuMain = useGame((state) => state.menuMain);
  const menuSettings = useGame((state) => state.menuSettings);
  const menuLeaderboards = useGame((state) => state.menuLeaderboards);
  const menuCredits = useGame((state) => state.menuCredits);
  const setUserName = useGame((state) => state.setUserName);
  const userName = useGame((state) => state.userName);
  const isMusicOn = useGame((state) => state.isMusicOn);
  const score = useGame((state) => state.score);
  const menuAudioRef = useRef(null);

  const onchange = (e) => {
    setUserName(e.target.value);
    localStorage.setItem("userName", e.target.value);
  };

  const onStart = () => {
    if (userName === "") {
      alert("Please enter a name");
      return;
    }
    start();
  };

  useEffect(() => {
    // Create the Audio object only once
    if (!menuAudioRef.current) {
      const menuAudio = new Audio("/audio/song-menu.mp3");
      menuAudio.loop = true;
      menuAudio.volume = 0.5;
      menuAudioRef.current = menuAudio;
    }

    const menuAudio = menuAudioRef.current;

    if (isMusicOn) {
      menuAudio.play();
    } else {
      menuAudio.pause();
    }

    // Cleanup on component unmount (optional)
    return () => {
      menuAudio.pause();
      menuAudio.currentTime = 0; // Reset playback position
    };
  }, [isMusicOn]);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  useEffect(() => {
    setUserName(localStorage.getItem("userName") || "Player");
  }, []);

  return (
    <main className="interface">
      {isMusicOn ? <SoundOn /> : <SoundOff />}

      {phase === "ready" && menuPhase === "main" && (
        <div className="button_container">
          <h1 className="title">Whisker Wings</h1>
          <label className="label" htmlFor="name">
            Username
            <input
              onChange={onchange}
              type="text"
              id="name"
              placeholder="Enter your name"
              className="name_input"
              value={userName}
            />
          </label>
          <div className="main_button" onClick={onStart}>
            Start
          </div>
          <div className="main_button" onClick={menuSettings}>
            Settings
          </div>
          <div className="main_button" onClick={menuLeaderboards}>
            Leaderboard
          </div>
        </div>
      )}
      {phase === "ready" && menuPhase === "settings" && (
        <div className="button_container">
          <h1 className="title">Settings</h1>
          <div className="main_button" onClick={menuMain}>
            back
          </div>
          <div className="setting_container">
            <h3 className="subtitle">Randomized targets</h3>
            <input className="checkbox" type="checkbox" />
          </div>
          <div className="main_button" onClick={menuCredits}>
            credits
          </div>
        </div>
      )}
      {phase === "ready" && menuPhase === "leaderboards" && (
        <>
          <div className="button_container">
            <div className="main_button" onClick={menuMain}>
              back
            </div>
          </div>
          <Leaderboard />
        </>
      )}

      {phase === "ready" && menuPhase === "credits" && (
        <>
          <div className="button_container">
            <h1 className="title">Credits</h1>
            <div className="main_button" onClick={menuMain}>
              back
            </div>
          </div>
          <Credits />
        </>
      )}
      {/* Time */}

      {phase === "playing" && (
        <div>
          <div className="time" ref={time}>
            0.00
          </div>
          <div className="score">Score: {score}</div>
        </div>
      )}

      {/* Restart */}
      {phase === "failed" && (
        <div className="button_container">
          <div className="main_button" onClick={restart}>
            Restart
          </div>
          <div className="main_button" onClick={ready}>
            Main menu
          </div>
        </div>
      )}
      {phase === "ended" && <EndScore time={time.current.textContent} />}
    </main>
  );
};

export default Interface;
