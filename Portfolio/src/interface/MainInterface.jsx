import React, { useEffect } from "react";
import styles from "./MainInterface.module.css";
import useWorld from "../hooks/useWorld";
import WhiskerWings from "./projectPages/WhiskerWings";
import Room from "./projectPages/Room";
import Car from "./projectPages/Car";
import Credits from "./projectPages/Credits";
import TravelPlanner from "./projectPages/TravelPlanner";
import Webshop from "./projectPages/Webshop";


const MainInterface = () => {
  const tips = [
    " explore this world and interact with the red points of interest.",
    " You can toggle streetlights by clicking them.",
    " that trampoline looks bouncy.",
    " you can jump with the spacebar.",
    " you can move with the arrow keys or WASD.",
    " you can contact me by clicking the bottom right corner.",
  ];

  const phase = useWorld((state) => state.phase);
  const menuPhase = useWorld((state) => state.menuPhase);
  return (
    <>
      {phase === "menu" && (
        <div className={styles.screen}>
          <div className={styles.screenOverlay}></div>
          <div className={styles.screenContent}>
            {menuPhase === "whiskerwings" && <WhiskerWings />}
            {menuPhase === "room" && <Room />}
            {menuPhase === "car" && <Car />}
            {menuPhase === "credits" && <Credits />}
            {menuPhase === "travelplanner" && <TravelPlanner />}
            {menuPhase === "webshop" && <Webshop />}
          </div>
          <div className={styles.blur}></div>
        </div>
      )}
      {phase === "exploring" && (
        <>
          <div className={styles.exploreScreen}>
            <div className={styles.cornerContainer}>
              <div className={`${styles.corner} ${styles.topLeft}`}>
                <div className={styles.screenOverlay}>
                  <div className={styles.text}>Tip:
                    {tips[Math.floor(Math.random() * tips.length)]}
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.corner} ${styles.bottomRight}`}>
              <div className={styles.screenOverlay}>
                <div className={styles.text}>
                  <h1>Contact me</h1>
                  <ul className={styles.list}>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="mailto:lennert.vangeert@gmail.com"
                      >
                        lennert.vangeert@gmail.com
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/in/lennert-van-geert/"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainInterface;
