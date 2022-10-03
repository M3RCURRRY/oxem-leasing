import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import styles from "./Button.module.css";

export default function Button(props) {
  const [isPending, setPending] = useState(false);

  async function clickHandler() {
    setPending(true);
    await props.onClick();
    setPending(false);
  }

  return (
    <button
      onClick={!props.isDisabled ? clickHandler : null}
      className={
        `${styles.button} ` +
        (props.isDisabled ? `${styles.disabled}` : `${styles.active}`)
      }
    >
      {isPending ? <Spinner/> : props.content}
      
    </button>
  );
}
