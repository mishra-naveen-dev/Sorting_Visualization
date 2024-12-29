import React, { Component } from "react";
import "./App.css";
import Bar from "./components/Bar";
import Form from "./components/Form";

// Algorithms
import BubbleSort from "./algorithm/BS";
import InsertionSort from "./algorithm/IS";
import SelectionSort from "./algorithm/Selection";
// Icons
import Play from "@material-ui/icons/PlayCircleOutlineRounded";
import Forward from "@material-ui/icons/SkipNextRounded";
import Backward from "@material-ui/icons/SkipPreviousRounded";
import RotateLeft from "@material-ui/icons/RotateLeft";

class App extends Component {
  state = {
    array: [], // Stores the current array of values
    arraSteps: [], // Stores the steps taken during the sorting process
    colorKey: [], // Stores color information for each array element
    colorSteps: [], // Stores the color changes during sorting
    currentStep: 0, // Keeps track of the current step of the sorting process
    count: 10, // Default number of elements
    delay: 500, // Delay between each step in milliseconds
    algorithm: "Selection Sort", // Selected sorting algorithm
    timeouts: [], // Stores timeouts for each step of the animation
    userCount: 10, // To store user input for the number of elements
    isSortingComplete: false, // Flag to check if sorting is complete
  };

  ALGORITHM = {
    "Bubble Sort": BubbleSort,
    "Insertion Sort": InsertionSort,
    "Selection Sort": SelectionSort,
  };

  componentDidMount() {
    this.generateRandomArray();
  }

  handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      this.setState({
        userCount: value,
      });
    }
  };

  handleSortClick = () => {
    this.setState(
      { count: this.state.userCount, isSortingComplete: false },
      () => {
        this.generateRandomArray();
      }
    );
  };

  handleAlgorithmChange = (event) => {
    this.setState(
      { algorithm: event.target.value, isSortingComplete: false },
      () => {
        this.generateSteps();
      }
    );
  };

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
    const temp = Array.from({ length: count }, () =>
      this.generateRandomNumber(50, 200)
    );

    this.setState(
      {
        array: temp,
        arraSteps: [temp],
        currentStep: 0,
        isSortingComplete: false,
      },
      this.generateSteps
    );
  };

  changeArray = (index, value) => {
    let arr = this.state.array.slice();
    arr[index] = value;
    this.setState(
      {
        array: arr,
        arraSteps: [arr],
        currentStep: 0,
        isSortingComplete: false,
      },
      this.generateSteps
    );
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraSteps.length - 1) return;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  start = () => {
    let steps = this.state.arraSteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;
    let totalSteps = steps.length - this.state.currentStep;

    const interval = setInterval(() => {
      if (i >= totalSteps) {
        clearInterval(interval);
        this.setState({ isSortingComplete: true }); 
        return;
      }

      let currentStep = this.state.currentStep;
      this.setState({
        array: steps[currentStep],
        colorKey: colorSteps[currentStep],
        currentStep: currentStep + 1,
      });

      i++;
    }, this.state.delay);

    this.setState({ timeouts: [interval] });
  };

  changeSpeed = (e) => {
    this.clearTimeouts();
    this.setState({ delay: parseInt(e.target.value) });
  };

  render() {
    let bars = Array.isArray(this.state.array)
      ? this.state.array.map((value, index) => (
          <Bar
            key={index}
            index={index}
            length={value}
            color={this.state.colorKey[index] || 0}
            changeArray={this.changeArray}
          />
        ))
      : null;

    let playButton = this.state.isSortingComplete ? (
      <button className="controller" onClick={this.generateRandomArray}>
        <RotateLeft />
      </button>
    ) : (
      <button className="controller" onClick={this.start}>
        <Play />
      </button>
    );

    return (
      <div className="App">
        <div className="background-wave"></div>
        <h1 className="heading">Sorting Visualization</h1>

        <div className="input-panel">
          <label>Algorithm: </label>
          <select
            value={this.state.algorithm}
            onChange={this.handleAlgorithmChange}
          >
            {Object.keys(this.ALGORITHM).map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>

          <label>Number of Elements: </label>
          <input
            type="number"
            value={this.state.userCount}
            onChange={this.handleInputChange}
            min="1"
          />
          <button onClick={this.handleSortClick}>Generate & Sort</button>
        </div>

        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>

        <div className="control-panel">
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

        <div className="panel">
          <Form
            formLabel="Speed"
            values={[500, 400, 300, 200, 100]}
            currentValue={this.state.delay}
            lables={["1x", "2x", "3x", "4x", "5x"]}
            onChange={this.changeSpeed}
          />
        </div>
      </div>
    );
  }
}

export default App;
