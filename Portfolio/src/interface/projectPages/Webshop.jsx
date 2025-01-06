import React from "react";
import styles from "./project.module.css";
const Webshop = () => {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.textContainer}>
        <small>Press "esc" to exit</small>
        <h1 className={styles.title}>Bergreunde Webshop</h1>
        <p className={styles.description}>
          In this project i built a climbing shoe webshop based on the
          Bergfreunde webshop. The webshop is built with React and uses an API
          built with Node.js and MongoDB. The webshop has a product overview, a
          product detail page and a shopping cart. For the administators there
          is an admin panel where they can add, edit and delete products.
        </p>
        <a
          className={styles.anchor}
          href="https://bergfreunde-webshop-mob2-1.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check it out &#8594;
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img src="/images/webshop.png" alt="webshop" />
      </div>
    </div>
  );
};

export default Webshop;
