import React, { useEffect, useRef, useState } from "react";
import useGame from "./stores/useGame";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
  const time = useRef();
  const restart = useGame((state) => state.restart);
  const start = useGame((state) => state.start);
  const phase = useGame((state) => state.phase);

  const [menu, setMenu] = useState("main");

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

  return (
    <main className="interface">
      {phase === "ready" && menu === "main" && (
        <div className="button_container">
          <h1 className="title">Whisker Wings</h1>
          <div className="main_button" onClick={start}>
            Start
          </div>
          <div
            className="main_button"
            onClick={() => {
              setMenu("settings");
            }}
          >
            Settings
          </div>
          <div
            className="main_button"
            onClick={() => {
              setMenu("leaderboards");
            }}
          >
            Leaderboards
          </div>
        </div>
      )}
      {phase === "ready" && menu === "settings" && (
        <div className="button_container">
          <h1 className="title">Settings</h1>
          <div className="main_button" onClick={() => setMenu("main")}>
            back
          </div>
          <div className="setting_container">
            <h3 className="subtitle">Randomized targets</h3>
            <input className="checkbox" type="checkbox" />
          </div>
        </div>
      )}
      {phase === "ready" && menu === "leaderboards" && (
        <div className="button_container">
          <h1 className="title">Leaderboards</h1>
          <div className="main_button" onClick={() => setMenu("main")}>
            back
          </div>
          <div className="leaderboard_container">
            <div className="leaderboard_item">
              <span className="leaderboard_rank">1</span>
              <span className="leaderboard_name">John Doe</span>
              <span className="leaderboard_score">120</span>
            </div>
            <div className="leaderboard_item">
              <span className="leaderboard_rank">2</span>
              <span className="leaderboard_name">Jane Doe</span>
              <span className="leaderboard_score">100</span>
            </div>
            <div className="leaderboard_item">
              <span className="leaderboard_rank">3</span>
              <span className="leaderboard_name">Foo Bar</span>
              <span className="leaderboard_score">80</span>
            </div>
          </div>
        </div>
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
