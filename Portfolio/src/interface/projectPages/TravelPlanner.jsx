import React from "react";
import styles from "./project.module.css";
const TravelPlanner = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <small>Press "esc" to exit</small>
        <h1 className={styles.title}>Travel Planner</h1>
        <p className={styles.description}>
          This was my first project where i built both the front-end and the
          back-end. The goal was to create a travel planner where you can add
          destinations. You can also add notes, expenses and activities to each
          destination. The destinations are stored in a MongoDB database and can
          be retrieved when you log in. The front-end was built with Lit and the
          back-end with Node.js.
        </p>
        <a
          className={styles.anchor}
          href="https://mobdev-1-opdracht-2-lennert-van-geert-app.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check it out &#8594;
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/travelplanner.png" alt="travelplanner" />
      </div>
    </div>
  );
};

export default TravelPlanner;
