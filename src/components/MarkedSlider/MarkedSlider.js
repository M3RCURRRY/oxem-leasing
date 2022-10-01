import { useLayoutEffect, useRef, useState } from "react";

export default function MarkedSlider(props) {
  let { title, notUsed, mark, minValue, maxValue } = props.data;

  const [state, setState] = useState(parseInt(mark));
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    inputRef.current.style.backgroundSize = (props.value - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }, []);

  function changeHandler(e) {
    setState(e.target.value);
    props.onChange(props.name, e.target.value);
    inputRef.current.style.backgroundSize = (props.value - minValue) * 100 / (maxValue - minValue) + "% 100%"
  }

  return (
    <div className={styles.inputLayout}>
      <span className={styles.title}>{title}</span>
      <div className={styles.sliderContainer}>
        <div className={styles.valueLayout}>
          <span id="value">{state}</span>
          <span id="mark" className={styles.outlinedMark } >{mark}</span>
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