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
          <div className={styles.screenImage}></div>
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
            <div className={`${styles.corner} ${styles.topLeft}`}>
              <p className={styles.text}>
                Tip: explore this world and interact with the red point of
                interest.
              </p>
            </div>
            <div className={`${styles.corner} ${styles.topRight}`}></div>
            <div className={`${styles.corner} ${styles.bottomLeft}`}></div>
            <div className={`${styles.corner} ${styles.bottomRight}`}></div>
          </div>
        </>
      )}
    </>
  );
};

export default MainInterface;
