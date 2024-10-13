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
    count: 10, // default number of elements
    delay: 500, // delay between each step in milliseconds
    algorithm: "Bubble Sort", // selected sorting algorithm
    timeouts: [], // stores timeouts for each step of the animation
    userCount: 10, // to store user input for the number of elements
  };

  ALGORITHM = {
    'Bubble Sort': BubbleSort,
  }

  // This method runs when the component is mounted
  componentDidMount() {
    this.generateRandomArray();
  }

  // Handle change of user input for the number of elements
  handleInputChange = (event) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      this.setState({
        userCount: value,
      });
    }
  };

  // Handle button click to start sorting based on user input
  handleSortClick = () => {
    this.setState({ count: this.state.userCount }, () => {
      this.generateRandomArray();
    });
  };

  // Generates steps for the sorting process
  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.arraSteps.slice();
    let colorSteps = this.state.colorSteps.slice();

    console.log("Current array before sorting:", array); // Debug log
    this.ALGORITHM[this.state.algorithm](array, 0, steps, colorSteps);

    this.setState({
      arraSteps: steps,
      colorSteps: colorSteps,
    }, () => {
      console.log("Generated sorting steps:", steps); // Debug log
    });
  };

  // Clears all timeouts
  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({ timeouts: [] });
  };

  // Resets the color keys to default (gray or uncolored)
  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);
    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  // Generates a random number between min and max
  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Generates a random array and sets initial steps
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
        this.generateSteps(); // Generate sorting steps after setting the array
      }
    );
  };

  // Updates the array based on user input and regenerates steps
  changeArray = (index, value) => {
    let arr = this.state.array.slice();
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

  // Go to the previous step of the sorting process
  previousStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep === 0) return;
    currentStep -= 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraSteps[currentStep], // Change to arraSteps
      colorKey: this.state.colorSteps[currentStep]
    });
  };

  // Go to the next step of the sorting process
  nextStep = () => {
    let currentStep = this.state.currentStep;
    if (currentStep >= this.state.arraSteps.length - 1) return; // Change to arraSteps
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      array: this.state.arraSteps[currentStep], // Change to arraSteps
      colorKey: this.state.colorSteps[currentStep]
    });
  };

  // Starts the sorting animation
  start = () => {
    let steps = this.state.arraSteps;
    let colorSteps = this.state.colorSteps;

    this.clearTimeouts();

    let timeouts = [];
    let i = 0;

    // Loop through steps and set timeouts for each step
    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep], // Update array for the current step
          colorKey: colorSteps[currentStep], // Update color for the current step
          currentStep: currentStep + 1, // Move to the next step
        });
      }, this.state.delay * i);

      timeouts.push(timeout);
      i++;
    }

    // Store timeouts to be able to clear them later
    this.setState({ timeouts });
  };

  render() {
    // Create Bar components for each value in the array
    let bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          color={this.state.colorKey[index]} // Assign color from colorKey
          changeArray={this.changeArray}
        />
      );
    });

    // Determine whether to show the Play or Reset button
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
        <div className="background-wave"></div> {/* Add the background wave */}
        <h1 className="heading">Sorting Visualization</h1>
        <div className="input-panel">
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
          <div className="barsDiv container card">
            {bars}
          </div>
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
        <div className="panel"></div>
      </div>
    );
  }
}

export default App;
