import { useMedia } from "../../hooks/useMedia";
import Slider from "../../inputs/Slider/Slider";
import Flex from "../Flex/Flex";
import styles from "./InputContainer.module.css";

export default function InputContainer() {

  const {xs, sm, md, lg} = useMedia();

  console.log(lg);

  return(
    <Flex direction={lg ? "row" : "column"}>
      <label className={styles.alignLabel}>
        Стоимость автомобиля
        <Slider/>
      </label>

      <label className={styles.alignLabel}>
        Первоначальный взнос
        <Slider/>
      </label>

      <label className={styles.alignLabel}>
        Срок лизинга
        <Slider/>
      </label>
    </Flex>
  )
}