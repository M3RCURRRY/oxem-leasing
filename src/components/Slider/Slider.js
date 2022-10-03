import { useEffect, useId, useRef } from "react";
import useActive from "../../hooks/useActive";
import styles from "./Slider.module.css";

export default function Slider(props) {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const uniqueId = useId();

  const focusedElement = useActive();

  useEffect(() => {
    inputRef.current.style.backgroundSize = Math.round((props.value - props.minValue) * 100 / (props.maxValue - props.minValue)) + "% 100%";
  })

  function changeHandler(e) {
    inputRef.current.style.backgroundSize = Math.round((props.value - props.minValue) * 100 / (props.maxValue - props.minValue)) + "% 100%"    
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

  function editHandler(e) {
    const newValue = +(e.target.value.split(" ").join(""));
    if (Number.isNaN(newValue)) {
      
    }
    else if (newValue > props.maxValue || newValue < props.minValue) {
      const limited = (newValue > props.maxValue) ? props.maxValue : props.minValue;
      props.onChange({type: props.actionType, payload: limited})
    }
    else {
      props.onChange({type: props.actionType, payload: newValue});
    }
  }

  return (
    <div className={styles.inputLayout}>
      <span className={styles.title}>{props.title}</span>
      <div className={`${styles.sliderContainer} ` + (focusedElement.id === uniqueId && !props.isDisabled ? styles.focusedSlider : props.isDisabled ? styles.inactiveSlider : null) } ref={containerRef}>
        <div className={styles.valueLayout}>
          <input type="text" size="8" onChange={props.isDisabled ? null : (e) => editHandler(e)} id={uniqueId} value={formatData(props.value)}></input>
          <span>{props.mark}</span>
        </div>
        <input
          type="range"
          min={props.minValue}
          max={props.maxValue}
          id="range"
          value={props.value}
          ref={inputRef}
          onChange={props.isDisabled ? null : (e) => changeHandler(e)}
        ></input>
      </div>
    </div>
  );
}