import './App.css';
import { sliderData } from './data/sliderData';
import { useMedia } from './hooks/useMedia';
import { useState } from "react";
import Slider from './inputs/Slider/Slider';

function App() {

  const [cost, setCost] = useState(sliderData.cost.value);
  const [deposit, setDeposit] = useState(sliderData.deposit.value);
  const [time, setTime] = useState(sliderData.time.value);

  const {xs, sm, md, lg} = useMedia();

  const sliderHandler = (name, value) => {
    switch(name) {
      case "cost":
        setCost(value);
        break;
      case "deposit":
        setDeposit(value);
        break;
      case "time":
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
          <Slider data={sliderData.cost} name="cost" onChange={sliderHandler}/>
        </div>
        <div className="lg-slider-second">
          <Slider data={sliderData.deposit} name="deposit" onChange={sliderHandler}/>
        </div>
        <div className="lg-slider-third">
          <Slider data={sliderData.time} name="time" onChange={sliderHandler}/>
        </div>
      </div>
    </div>
  );
}

export default App;
