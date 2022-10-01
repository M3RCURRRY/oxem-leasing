import { useEffect, useRef } from "react";
import styles from "./Slider.module.css";

export default function Slider(props) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.style.backgroundSize = ((props.value - props.minValue) * 100 / (props.maxValue - props.minValue)) + "% 100%"
  }, []);

  function changeHandler(e) {
    inputRef.current.style.backgroundSize = Math.round((props.value - props.minValue) * 100 / (props.maxValue - props.minValue)) + "% 100%"    
    props.onChange({type: props.actionType, payload: e.target.value});
  }

  return (
    <div className={styles.inputLayout}>
      <span className={styles.title}>{props.title}</span>
      <div className={styles.sliderContainer}>
        <div className={styles.valueLayout}>
          <span id="value">{props.value}</span>
          <span id="mark">{props.mark}</span>
        </div>
        <input
          type="range"
          min={props.minValue}
          max={props.maxValue}
          id="range"
          value={props.value}
          ref={inputRef}
          onChange={(e) => changeHandler(e)}
        ></input>
      </div>
    </div>
  );
}