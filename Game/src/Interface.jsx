import React, { useEffect, useRef } from "react";
import useGame from "./stores/useGame";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
  const time = useRef();
  const restart = useGame((state) => state.restart);
  const start = useGame((state) => state.start);
  const phase = useGame((state) => state.phase);

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
      {phase === "ready" && (
        <div className="button_container">
          <div className="main_button" onClick={start}>
            Start
          </div>
          <div className="main_button" >
            Settings
          </div>
          <div className="main_button" >
            Leaderboards
          </div>
        </div>
      )}
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
