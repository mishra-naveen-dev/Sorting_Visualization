import React, { useState } from "react"; // Add useState import
import "./Bar.css";

function Bar({ index, length, color }) {
    const [len, setLen] = useState(length);

    const barStyle = {
        height: `${length}px`,
    };

    const colors = [
        ['rgba(61,90,241,0.5)', 'rgba(61,90,241,0.2)'],
        ['rgba(255,48,79,1)', 'rgba(255,48,79,0.5)'],
        ['rgba(131,232,90,0.5)', 'rgba(131,232,90,0.2)'],
    ];

    const inputStyle = {
        position: 'relative',
        top: Math.floor(length / 2) - 10,
        width: `${length}px`,
        left: -Math.floor(length / 2) + 10,
        border: "none",
    };

    const front_bottom = {
        transform: `translateY(${200 - length}px) rotateX(-90deg)`, // Correct spelling of 'translateY'
        backgroundColor: `${colors[color][0]}`, // Correct template literal
        boxShadow: `5px 5px 50px 5px ${colors[color][0]}`, // Correct template literal
        transition: '0.3s',
    };

    const right_left = {
        height: `${length}px`,
        transform: `translateY(${200 - length}px)`,
        backgroundColor: `${colors[color][1]}`, // Correct index access
        boxShadow: `5px 5px 50px 5px ${colors[color][1]}`, // Correct template literal
        transition: '0.3s',
    };

    const handleChange = (e) => {
        let val = e.target.value;
        if (val === "") {
            setLen(0);
        } else {
            val = parseInt(val);
            if (val > 200) {
                setLen(200);
            } else {
                setLen(val);
            }
        }
    };

    return (
        <>
            <div className="bar" style={barStyle}>
                <div className="side top"></div>
                <div className="side bottom" style={front_bottom}>

                </div>
                <div className="side right" >
                    <div className="color-bar right-color-bar" style={right_left}></div>
                </div>
                <div className="side left" style={right_left}>
                    <div className="color-bar left-color-bar" style={right_left}></div>

                </div>
                <div className="side front" >
                    <div className="color-bar front-color-bar" style={front_bottom}> </div>
                    <input
                        type="number"
                        length={length}
                        style={inputStyle}
                        value={len}
                        onChange={handleChange}
                        className="input"
                    />

                </div>
                <div className="side back">
                    <div className="color-back back-color-bar" style={front_bottom}></div>
                </div>
            </div>
        </>
    );
}

export default Bar;
