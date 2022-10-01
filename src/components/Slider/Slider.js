import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";

export default function Slider(props) {
  const { title, notUsed, mark, minValue, maxValue } = props.data;

  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current.style.backgroundSize = (props.value - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }, []);

  function changeHandler(e) {
    props.onChange(props.name, e.target.value);
    inputRef.current.style.backgroundSize = (props.value - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }

  return (
    <div className={styles.inputLayout}>
      <span className={styles.title}>{title}</span>
      <div className={styles.sliderContainer}>
        <div className={styles.valueLayout}>
          <span id="value">{props.value}</span>
          <span id="mark">{mark}</span>
        </div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          id="range"
          value={props.value}
          ref={inputRef}
          onChange={(e) => changeHandler(e)}
        ></input>
      </div>
    </div>
  );
}
