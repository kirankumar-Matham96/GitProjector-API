import React from "react";
import styles from "./index.module.scss";

const Tag = ({ tag }) => {
  return <span className={styles.tag}>{tag}</span>;
};

export default Tag;
