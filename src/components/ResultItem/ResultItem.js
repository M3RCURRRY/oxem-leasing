import styles from "./ResultItem.module.css";

export default function ResultItem(props) {

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

  return(
    <div className={styles.alignContainer}>
      <p className={styles.title}>{props.title}</p>
      <div className={styles.resultValue}>
        {formatData(props.value) + " " + props.mark}
      </div>
    </div>
  )
}