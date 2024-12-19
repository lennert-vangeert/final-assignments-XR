import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      phase: "menu",
      menuPhase: "main",
      isMusicOn: localStorage.getItem("isMusicOn") || false,

      start: () => {
        console.log("start");
        set((state) => {
          if (state.phase === "ready") {
            return { phase: "exploring" };
          }

          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "exploring") {
            return {
              phase: "menu",
            };
          }
          return {};
        });
      },
    };
  })
);
