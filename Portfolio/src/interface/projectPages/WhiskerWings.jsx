import React from "react";
import styles from "./project.module.css";

const WhiskerWings = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <small>Press "esc" to exit</small>
        <h1 className={styles.title}>Whisker wings</h1>
        <p className={styles.description}>
          In this project i made a video game. The game is about a bunny that has to collect red rings. The bunny is in an airplane and has to avoid obstacles. The game is made with React Three Fiber. The goal of this project was to learn more about 3D physics and 3D game development. There is also a leaderboard built with express and mongoDB.
        </p>
        <a
          className={styles.anchor}
          href="https://whiskerwings.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check it out &#8594;
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/whiskerwings.png" alt="Whiskerwings-menu" />
      </div>
    </div>
  );
};

export default WhiskerWings;
