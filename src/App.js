import "./App.css";
import { sliderData } from "./data/sliderData";
import { useReducer } from "react";
import Slider from "./components/Slider/Slider";
import MarkedSlider from "./components/CalcSlider/CalcSlider";

const initialState = {
  cost: sliderData.cost.value,
  deposit: sliderData.cost.value * (parseInt(sliderData.deposit.mark) * 0.01),
  percent: parseInt(sliderData.deposit.mark),
  time: sliderData.time.value,
};

const SET_COST = "SET_COST";
const SET_PERCENT = "SET_PERCENT";
const SET_TIME = "SET_TIME";

function reducer(state, action) {
  switch (action.type) {
    case SET_COST:
      return {
        ...state,
        cost: action.payload,
        deposit: Math.round(state.cost * (state.percent * 0.01)),
      };
    case SET_PERCENT:
      return {
        ...state,
        percent: action.payload,
        deposit: Math.round(state.cost * (action.payload * 0.01)),
      };
    case SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app-layout">
      <div className="container">
        <div className="header">
          <header className="header-font">
            Рассчитайте стоимость автомобиля в лизинг
          </header>
        </div>
        <div className="lg-slider-first">
          <Slider
            title={sliderData.cost.title}
            minValue={sliderData.cost.minValue}
            maxValue={sliderData.cost.maxValue}
            mark={sliderData.cost.mark}

            value={state.cost}
            actionType={SET_COST}

            onChange={dispatch}
          />
        </div>
        <div className="lg-slider-second">
          <MarkedSlider
            title={sliderData.deposit.title}
            minValue={sliderData.deposit.minValue}
            maxValue={sliderData.deposit.maxValue}
            
            value={state.deposit}
            actionType={SET_PERCENT}
            percent={state.percent}

            onChange={dispatch}
          />
        </div>
        <div className="lg-slider-third">
          <Slider
            title={sliderData.time.title}
            minValue={sliderData.time.minValue}
            maxValue={sliderData.time.maxValue}
            mark={sliderData.time.mark}

            value={state.time}
            actionType={SET_TIME}

            onChange={dispatch}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
