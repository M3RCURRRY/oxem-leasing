import { useLayoutEffect, useRef, useState } from "react";
import styles from "./Slider.module.css";

export default function Slider(props) {
  const { title, value, mark, minValue, maxValue, isOutlinedMark } = props.data;

  const [state, setState] = useState(parseInt(value));
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current.style.backgroundSize = (value - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }, []);

  function changeHandler(e) {
    setState(e.target.value);
    inputRef.current.style.backgroundSize = (e.target.value - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }

  return (
    <div className={styles.inputLayout}>
      <span className={styles.title}>{title}</span>
      <div className={styles.sliderContainer}>
        <div className={styles.valueLayout}>
          <span id="value">{state}</span>
          <span id="mark" className={isOutlinedMark ? styles.outlinedMark : null} >{mark}</span>
        </div>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          id="range"
          value={state}
          ref={inputRef}
          onChange={(e) => changeHandler(e)}
        ></input>
      </div>
    </div>
  );
}
