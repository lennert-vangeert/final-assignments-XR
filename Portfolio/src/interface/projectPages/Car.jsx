import React from "react";
import styles from "./project.module.css";

const Car = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <small>Press "esc" to exit</small>
        <h1 className={styles.title}>Animated product</h1>
        <p className={styles.description}>
          Let's go on a trip down memory lane. This project was created during
          my first year of college. The goal was to create a simple html and css
          website with a focus on animations and transitions. The result is a
          simple website that showcases the audi brand with a few animations and
          transitions to make it more interesting.
        </p>
        <a
          className={styles.anchor}
          href="https://lennertvg.be/Projects/Animated-product/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check it out &#8594;
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/animatedproduct.png" alt="animatedproduct" />
      </div>
    </div>
  );
};

export default Car;
