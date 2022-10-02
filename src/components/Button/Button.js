import { useState } from "react";
import styles from "./Button.module.css";

export default function Button(props) {
  return (
    <button
      onClick={!props.isDisabled ? props.onClick : null}
      className={
        `${styles.button} ` +
        (props.isDisabled ? `${styles.disabled}` : `${styles.active}`)
      }
    >
      {props.content}
    </button>
  );
}
