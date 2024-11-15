import React from "react";
import styles from "./index.module.scss";

const SearchResult = (props) => {
  const { title, description, createdAt, updatedAt, languages, tags } = props;
  return (
    <div className={styles.resultContainer}>
      <div className={styles.resultLeft}>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          {languages && <strong>Languages:</strong>}
          {languages && languages}
        </p>
        <ul>
          {tags.length > 0 && <strong>Tags:</strong>}
          {tags.length > 0 && tags.map((tag) => (
            /**
             * // TODOs
             * 1. Separate the component
             * 2. Show a few only and hide the remaining
             * 3. Show a + and - buttons to expand and hide eccessive tags
             *  */
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      <div className={styles.resultRight}>
        <p>
          <strong>Created At:</strong>
          {/* FIXME: use proper date format */}
          {createdAt}
        </p>
        <p>
          <strong>Updated At:</strong>
          {/* FIXME: use proper date format */}
          {updatedAt}
        </p>
      </div>
    </div>
  );
};

export default SearchResult;