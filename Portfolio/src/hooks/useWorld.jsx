import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      phase: "exploring",
      menuPhase: "main",
      isMusicOn: localStorage.getItem("isMusicOn") || false,

      streetLightLocations: [
        [-6, 6, -1, 4.74, true],
        [1.5, 6, -1, 4.74, false],
        [16, 6, -1, 4.74, false],
        [-36, 6, -6, 1.56, true],
        [-2, 6, 5.7, 4.74, false],
        [11, 6, 6.1, 4.74, true],
        [-6, 6, -34.5, 3.15, true],
        [20, 6, -10.8, 4.74, false],
        [3, 6, -10.8, 4.74, false],
        [11, 6, -10.8, 4.74, false],
        [-20, 6, 6.4, 1.56, true],
        [-26.5, 6, 6.4, 1.56, false],
      ],
      poiLocations: [
        [-1.8, 6, 16.95, "whiskerwings"],
        [1, 6, 19.1, "room"],
        [10.3, 6, 12.5, "car"],
        [-2, 6, 0, "credits"],
      ],

      setExploring: () => {
        console.log("start");
        set((state) => {
          if (state.phase === "menu") {
            return { phase: "exploring" };
          }

          return {};
        });
      },
      setMenu: () => {
        set((state) => {
          if (state.phase === "exploring") {
            return {
              phase: "menu",
            };
          }
          return {};
        });
      },
      setMenuPhase: (newMenuPhase) => {
        set(() => {
          return {
            phase: "menu",
            menuPhase: newMenuPhase,
          };
        });
      },
    };
  })
);
