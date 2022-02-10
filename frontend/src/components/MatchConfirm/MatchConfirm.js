import React from "react";
import styles from "./MatchConfirm.module.css";

const MatchConfirm = ({ message }) => {
  const isSuccess = message === "it's a match!" ? true : false;

  return (
    <div id="match">
      <div className={`${styles.neons}`}>
        <div className={`${styles.overlay} rounded-2xl`}>
          <h1 className={isSuccess ? `${styles.success}` : `${styles.error}`}>
            <em>{message}</em>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MatchConfirm;
