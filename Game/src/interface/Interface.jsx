import React, { useEffect, useRef, useState } from "react";
import useGame from "../stores/useGame";
import { addEffect } from "@react-three/fiber";
import Leaderboard from "./Leaderboard";

const Interface = () => {
  const time = useRef();
  const restart = useGame((state) => state.restart);
  const start = useGame((state) => state.start);
  const phase = useGame((state) => state.phase);
  const menuPhase = useGame((state) => state.menuPhase);
  const menuMain = useGame((state) => state.menuMain);
  const menuSettings = useGame((state) => state.menuSettings);
  const menuLeaderboards = useGame((state) => state.menuLeaderboards);
  const setUserName = useGame((state) => state.setUserName);
  const userName = useGame((state) => state.userName);

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

      {/* Time */}

      {phase === "playing" && (
        <div className="time" ref={time}>
          0.00
        </div>
      )}

      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}
    </main>
  );
};

export default Interface;
