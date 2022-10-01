import { useLayoutEffect, useRef, useState } from "react";

import styles from "./MarkedSlider.module.css";

export default function MarkedSlider(props) {
  const { title, notUsed, mark, minValue, maxValue } = props.data;
  const inputRef = useRef(null);

  const [state, setState] = useState(parseInt(mark));

  useLayoutEffect(() => {
    inputRef.current.style.backgroundSize = (state - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }, []);

  function changeHandler(e) {
    setState(e.target.value);
    props.onChange(props.name, e.target.value);
    inputRef.current.style.backgroundSize = (state - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }

  return (
    <div className={styles.inputLayout}>
      <span className={styles.title}>{title}</span>
      <div className={styles.sliderContainer}>
        <div className={styles.valueLayout}>
          <span id="value">{props.value}</span>
          <span id="mark" className={styles.outlinedMark } >{state + "%"}</span>
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