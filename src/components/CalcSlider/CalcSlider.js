import { useLayoutEffect, useRef } from "react";

import styles from "./CalcSlider.module.css";

export default function MarkedSlider(props) {
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current.style.backgroundSize = (props.percent - props.minValue) * 100 / (props.maxValue - props.minValue) + "% 100%"
  }, []);

  function changeHandler(e) {
    inputRef.current.style.backgroundSize = (props.percent - props.minValue) * 100 / (props.maxValue - props.minValue) + "% 100%";    
    props.onChange({type: props.actionType, payload: e.target.value});
  }

  function formatData(num) {
    let digits = String(num).split('').reverse();
    return digits.reduce((acc, value, index) => {
      acc += value;
      if ((index + 1) % 3 === 0) {
        acc += " "
      };
      return acc;
    }, "").split("").reverse().join("");
  }

  return (
    <div className={styles.inputLayout}>
      <span className={styles.title}>{props.title}</span>
      <div className={styles.sliderContainer}>
        <div className={styles.valueLayout}>
          <span id="value">{formatData(props.value) + " ₽" }</span>
          <span id="mark" className={styles.outlinedMark } >{props.percent + " %"}</span>
        </div>
        <input
          type="range"
          min={props.minValue}
          max={props.maxValue}
          id="range"
          value={props.percent}
          ref={inputRef}
          onChange={(e) => changeHandler(e)}
        ></input>
      </div>
    </div>
  );
}