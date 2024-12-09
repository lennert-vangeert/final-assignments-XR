import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      // targetCount: 25,
      playTime: 0,
      startTime: 0,
      endTime: 0,
      isMusicOn: false,

      /**
       * Phases
       */
      phase: "ready",

      start: () => {
        console.log("start");
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "playing", startTime: Date.now() };
          }

          return {};
        });
      },
      restart: () => {
        console.log("restart");
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ready" };
          } else if (state.phase === "ended") return { phase: "ready" };

          return {};
        });
      },
      end: () => {
        console.log("end");
        set((state) => {
          if (state.phase === "playing") {
            return {
              phase: "ended",
              endTime: Date.now(),
              playTime: state.endTime - state.startTime,
            };
          }
          return {};
        });
      },
      // menu phase
      menuPhase: "main",

      menuMain: () => {
        set({ menuPhase: "main" });
      },
      menuSettings: () => {
        set({ menuPhase: "settings" });
      },
      menuLeaderboards: () => {
        set({ menuPhase: "leaderboards" });
      },
      menuCredits: () => {
        set({ menuPhase: "credits" });
      },
      // username
      userName: "Player",
      setUserName: (name) => {
        console.log("setUserName", name);
        set({ userName: name });
      },

      //audio

      setMusicOn: () => {
        set({ isMusicOn: true });
        console.log("setMusicOn");
      },
      setMusicOff: () => {
        set({ isMusicOn: false });
        console.log("setMusicOff");
      },
    };
  })
);
