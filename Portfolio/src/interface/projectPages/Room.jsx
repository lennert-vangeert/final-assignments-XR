import React from "react";
import styles from "./project.module.css";

const Room = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <small>Press "esc" to exit</small>
        <h1 className={styles.title}>Isometric room</h1>
        <p className={styles.description}>
          For this project i made an isometric room from scratch using blender.
          The theme of this project was fantasy and i tried to incorporate that
          in the design of the room. some shaders were used as well. The goal of
          this project was to improve my 3D modeling skills. The room is also
          interactive, you can click on points of interest to get more
          information about the story. there are even some GSAP animations ;)
        </p>
        <a
          className={styles.anchor}
          href="https://castle-isometric-room.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check it out &#8594;
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/isometricroom.png" alt="isometricroom" />
      </div>
    </div>
  );
};

export default Room;
