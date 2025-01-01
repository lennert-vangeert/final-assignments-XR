import React, { useEffect } from "react";
import styles from "./MainInterface.module.css";
import useWorld from "../hooks/useWorld";
import WhiskerWings from "./projectPages/WhiskerWings";
import Room from "./projectPages/Room";
import Car from "./projectPages/Car";
import Credits from "./projectPages/Credits";

const MainInterface = () => {
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
                  <div className={styles.text}>
                    Tip: explore this world and interact with the red points of
                    interest.
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={`${styles.corner} ${styles.topRight}`}></div> */}
            {/* <div className={`${styles.corner} ${styles.bottomLeft}`}></div> */}
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
