import React, { Component } from "react";
import './App.css';
import Bar from "./components/Bar";

class App extends Component {
  state = {
    array: [],
    arraSteps: [],
    colorKey: [],
    colorSteps: [],
    count: 10,
    delay: 100,
    algorithum: "",
    timeouts: [],
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray = () => {
    const count = this.state.count;
    const temp = [];
    // const colorKey = new Array(count).fill('gray'); // Initialize colors for bars

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }

    this.setState({
      array: temp,
      arraSteps: [temp],
      // colorKey: colorKey, // Set colorKey state
    });
  };

  render() {
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          color={0}
        />
      );
    });
    return (
      <div className="App">
        <div className="frame">
          <div className="barsDiv container card">
            {bars}
          </div>
          <div className="control-pannel"></div>
          <div className="pannel"></div>
        </div>
      </div>
    );
  }
}

export default App;
