
import "./Bar.css"

function Bar({ index, length, color }) {
    const barStyle = {
        height: length,
    }
    return (
        <>
            <div className="bar" style={barStyle}>

            </div>
        </>
    )
}

export default Bar;
