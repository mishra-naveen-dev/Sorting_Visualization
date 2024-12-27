import React, { useState, useEffect } from "react";
import "./Bar.css";

function Bar({ index, length, color, changeArray }) {
  const [len, setLen] = useState(length);

  useEffect(() => {
    setLen(length);
  }, [length]);

  const colors = [
    ["rgba(61,90,241,0.5)", "rgba(61,90,241,0.5)"],
    ["rgba(255,48,79,0.5)", "rgba(255,48,79,0.5)"],
    ["rgba(131,232,90,0.5)", "rgba(131,232,90,0.5)"],
    ["rgba(67, 142, 227, 0.5)", "rgba(14, 90, 189, 0.5)"],
  ];

  const inputStyle = {
    position: "relative",
    top: Math.floor(length / 2) - 12,
    width: `${length}px`,
    left: -Math.floor(length / 2) + 13,
    border: "none",
    background: "none",
  };

  const bottom = {
    transform: `translateY(${200 - length}px) rotateX(-90deg)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][0]}`,
    transition: "0.3s",
  };

  const front_back_right_left = {
    height: `${length}px`,
    transform: `translateY(${200 - length}px)`,
    backgroundColor: `${colors[color][1]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: "0.3s",
  };

  const quantity = {
    position: "relative",
    top: 225,
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (val === "") {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = parseInt(val);
      if (val > 200) {
        setLen(200);
        changeArray(index, 200);
      } else {
        setLen(val);
        changeArray(index, val);
      }
    }
  };

  const increaseLength = (e) => {
    // if (len < 200) {
    //     const newLen = len + 10 > 200 ? 200 : len + 10;
    //     setLen(newLen);
    //     changeArray(index, newLen);
    //}

    setLen(len + 1);
    changeArray(index, len);
  };

  const decreaseLength = (e) => {
    setLen(len - 1);
    changeArray(index, len);
  };

  return (
    <>
      <div className="bar">
        <div className="side top"></div>
        <div className="side bottom" style={bottom}></div>
        <div className="side right">
          <div
            className="color-bar right-color-bar"
            style={front_back_right_left}
          ></div>
        </div>
        <div className="side left">
          <div
            className="color-bar left-color-bar"
            style={front_back_right_left}
          ></div>
        </div>
        <div className="side front">
          <div
            className="color-bar front-color-bar"
            style={front_back_right_left}
          >
            <input
              type="number"
              style={inputStyle}
              value={len}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>
        <div className="side back">
          <div
            className="color-back back-color-bar"
            style={front_back_right_left}
          ></div>
        </div>
        <div className="quantity-nav">
          <div
            className="quantity-button quantity-up"
            style={quantity}
            onClick={increaseLength}
          >
            +
          </div>
          <div
            className="quantity-button quantity-down"
            style={quantity}
            onClick={decreaseLength}
          >
            -
          </div>
        </div>
      </div>
    </>
  );
}

export default Bar;
