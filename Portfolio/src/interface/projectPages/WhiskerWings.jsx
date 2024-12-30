import React from "react";
import styles from "./project.module.css";

const WhiskerWings = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <small>Press "esc" to exit</small>
        <h1 className={styles.title}>Whisker wings</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa facere
          eum at eius ullam cumque nam voluptatibus dolores, modi iste
          laboriosam error beatae eveniet recusandae minus corporis earum itaque
          libero, hic animi neque vitae maiores magnam. Libero, consequatur qui
          ratione corporis, temporibus, excepturi eligendi dicta tempore sit cum
          iure ullam?
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
