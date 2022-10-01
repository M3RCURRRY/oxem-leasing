import './App.css';
import { sliderData } from './data/sliderData';
import { useMedia } from './hooks/useMedia';
import { useState } from "react";
import Slider from './components/Slider/Slider';
import MarkedSlider from './components/MarkedSlider/MarkedSlider';

function App() {
  const [cost, setCost] = useState(sliderData.cost.value);
  const [deposit, setDeposit] = useState(sliderData.cost.value * (parseInt(sliderData.deposit.mark) * 0.01));
  const [time, setTime] = useState(sliderData.time.value);

  // Изменили проценты
  // Заменили state (в процентах)
  // Прокинули в качестве значения value результат calcDeposit
  // Отрендерили

  // Внутри компонента ищем пропс dependsOnMark
  // Если true - делаем зависимость слайдера от mark
  // 

  const {xs, sm, md, lg} = useMedia();

  const sliderHandler = (name, value) => {
    switch(name) {
      case "cost":
        console.log("Cost updated");
        setCost(value);
        break;
      case "deposit":
        console.log("Deposit updated");
        setDeposit(Math.round(cost * (value * 0.01)));
        break;
      case "time":
        console.log("Time updated");
        setTime(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="app-layout">
      <div className="container">
        <div className="header">
          <header className="header-font">Рассчитайте стоимость автомобиля в лизинг</header>
        </div>
        <div className="lg-slider-first">
          <Slider data={sliderData.cost} value={cost} name="cost" onChange={sliderHandler}/>
        </div>
        <div className="lg-slider-second">
          <MarkedSlider data={sliderData.deposit} value={deposit} name="deposit" onChange={sliderHandler}/>
        </div>
        <div className="lg-slider-third">
          <Slider data={sliderData.time} value={time} name="time" onChange={sliderHandler}/>
        </div>
      </div>
    </div>
  );
}

export default App;
