import React, { Component } from "react";
import './App.css';
import Bar from "./components/Bar";

// Algorithms
import BubbleSort from './algorithm/BS';

// Icons
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forward from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';

class App extends Component {
  state = {
    array: [], // stores the current array of values
    arraSteps: [], // stores the steps taken during the sorting process
    colorKey: [], // stores color information for each array element
    colorSteps: [], // stores the color changes during sorting
    currentStep: 0, // keeps track of the current step of the sorting process
    count: 10, // number of elements in the array
    delay: 10, // delay between each step in milliseconds
    algorithm: "Bubble Sort", // selected sorting algorithm
    timeouts: [], // stores timeouts for each step of the animation
  };

  ALGORITHM = {
    'Bubble Sort': BubbleSort,
  }

  componentDidMount() {
    this.generateRandomArray();
  }

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraSteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.ALGORITHM[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraSteps: steps,
      colorSteps: colorSteps,
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({ timeouts: [] });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomArray = () => {
    this.clearTimeouts();
    this.clearColorKey();
    const count = this.state.count;
    const temp = [];

    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }

    this.setState(
      {
        array: temp,
        arraSteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  changeArray = (index, value) => {
    let arr = this.state.array;
    arr[index] = value;
    this.setState(
      {
        array: arr,
        arraSteps: [arr],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  // Update previousStep method
  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    });
  };

  // Update nextStep method
  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraSteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep]
    });
  };

  start = () => {
    let steps = this.state.arraSteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;

    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colorSteps[currentStep],
          currentStep: currentStep + 1,
        });
      }, this.state.delay * i);

      timeouts.push(timeout);
      i++;
    }

    this.setState({ timeouts });
  };

  render() {
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          color={this.state.colorKey[index]}
          changeArray={this.changeArray}
        />
      );
    });

    let playButton;
    if (this.state.arraSteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller" onClick={this.generateRandomArray}>
          <RotateLeft />
        </button>
      );
    } else {
      playButton = (
        <button className="controller" onClick={this.start}>
          <Play />
        </button>
      );
    }

    return (
      <div className="App">
        <div className="frame">
          <div className="barsDiv container card">
            {bars}
          </div>
        </div>
        <div className="control-pannel">
          <div className="control-buttons">
            <button className="controller" onClick={this.previousStep}>
              <Backward />
            </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
              <Forward />
            </button>
          </div>
        </div>
        <div className="pannel"></div>
      </div>
    );
  }
}

export default App;
