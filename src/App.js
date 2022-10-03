import "./App.css";
import { sliderData } from "./data/sliderData";
import {  useReducer } from "react";
import Slider from "./components/Slider/Slider";
import MarkedSlider from "./components/CalcSlider/CalcSlider";
import ResultItem from "./components/ResultItem/ResultItem";
import Button from "./components/Button/Button";
import axios from "axios";

const countMonthly = (cost, deposit, time) => {
  return Math.round(
    (cost - deposit) *
    ((0.035 * Math.pow(1 + 0.035, time)) / (Math.pow(1 + 0.035, time) - 1))
  );
};

const countFinalCost = (cost, deposit, time) => {
  return Math.round(deposit + countMonthly(cost, deposit, time) * time);
};

const initialState = {
  cost: sliderData.cost.value,
  deposit: sliderData.cost.value * (parseInt(sliderData.deposit.mark) * 0.01),
  percent: parseInt(sliderData.deposit.mark),
  time: sliderData.time.value,
  monthly: countMonthly(
    sliderData.cost.value,
    sliderData.cost.value * (parseInt(sliderData.deposit.mark) * 0.01),
    sliderData.time.value
  ),
  finalCost: countFinalCost(
    sliderData.cost.value,
    sliderData.cost.value * (parseInt(sliderData.deposit.mark) * 0.01),
    sliderData.time.value,
  ),
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
        deposit: Math.round(action.payload * (state.percent * 0.01)),
        finalCost: countFinalCost(action.payload, Math.round(action.payload * (state.percent * 0.01)), state.time),
        monthly: countMonthly(action.payload, Math.round(action.payload * (state.percent * 0.01)), state.time)
      };
    case SET_PERCENT:
      return {
        ...state,
        percent: action.payload,
        deposit: Math.round(state.cost * (action.payload * 0.01)),
        finalCost: countFinalCost(state.cost, Math.round(state.cost * (action.payload * 0.01)), state.time),
        monthly: countMonthly(state.cost, Math.round(state.cost * (action.payload * 0.01)), state.time)
      };
    case SET_TIME:
      return {
        ...state,
        time: action.payload,
        finalCost: countFinalCost(state.cost, Math.round(state.cost * (state.percent * 0.01)), action.payload),
        monthly: countMonthly(state.cost, Math.round(state.cost * (state.percent * 0.01)), action.payload)
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function postHandler () {
    const data = JSON.stringify(state);
    
    await axios.post("https://eoj3r7f3r4ef6v4.m.pipedream.net", data, {
      headers: {
        "Content-Type": "application/json"
      }
    }).catch(e => {
      console.error(e.response)
    }).then()

    // delay immitation for testing loader spiner 

    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     console.log(JSON.stringify(state, null, 2))
    //     res(1);
    //   }, 1000);
    // })
  }

  return (
    <div className="app-layout">
      <div className="container">
        <div className="header">
          <header className="header-font">
            Рассчитайте стоимость автомобиля в лизинг
          </header>
        </div>
        <div className="slider-first">
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
        <div className="slider-second">
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
        <div className="slider-third">
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
        <div className="result-first">
          <ResultItem
            title={sliderData.finalCost.title}
            mark={sliderData.finalCost.mark}
            value={state.finalCost}
          />
        </div>
        <div className="result-second">
          <ResultItem
            title={sliderData.monthly.title}
            mark={sliderData.monthly.mark}
            value={state.monthly}
          />
        </div>
        <div className="grid-button alignCenter">
          <Button content={"Оставить заявку"} onClick={postHandler} isDisabled={false}/>
        </div>
      </div>
    </div>
  );
}

export default App;
