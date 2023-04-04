import React from 'react';
import { level1, level2, level3 } from './model/Levels.js'
import { redrawCanvas } from './boundary/Boundary.js'
import { Model } from './model/Model.js'
import { layout } from './Layout.js';
import { canMove, key } from './controller/Controller.js'

export let pickup = false

export function setPickup(val) {
    pickup = val;
}
const upbutton = {
    position: "absolute",
    left: 600,
    top: 80,
}

const leftbutton = {
    position: "absolute",
    left: 550,
    top: 120,
}

const rightbutton = {
    position: "absolute",
    left: 650,
    top: 120,
}

const downbutton = {
    position: "absolute",
    left: 600,
    top: 160,
}

const pick = {
    position: "absolute",
    left: 580,
    top: 220,
}

const choselevel1 = {
    position: "absolute",
    left: 500,
    top: 280,
}

const choselevel2 = {
    position: "absolute",
    left: 600,
    top: 280,
}

const choselevel3 = {
    position: "absolute",
    left: 700,
    top: 280,
}

const reset = {
    position: "absolute",
    left: 600,
    top: 320,
}
let defaultState1 = true, defaultState2 = false, defaultState3 = false
let a = false, b = false, c = false, d = false

function App() {
    const appRef = React.useRef(null);
    const [model, setModel] = React.useState(new Model(level1, 1));
    const [redraw, forceRedraw] = React.useState(0);
    const canvasRef = React.useRef(null);
    React.useEffect(() => {
        redrawCanvas(model, canvasRef.current)
    }, [model, redraw])

    let chosel1 = function () {
        if (model.ln == 1) {
            return;
        }
        defaultState1 = true
        defaultState2 = false
        defaultState3 = false
        setModel(new Model(level1, 1))
    }
    let chosel2 = function () {
        if (model.ln == 2) {
            return;
        }
        defaultState1 = false
        defaultState2 = true
        defaultState3 = false
        setModel(new Model(level2, 2))
    }

    let chosel3 = function () {
        if (model.ln == 3) {
            return;
        }
        defaultState1 = false
        defaultState2 = false
        defaultState3 = true
        setModel(new Model(level3, 3))
    }
    return (
        <main style={layout.Appmain} ref={appRef}>
            <canvas tabIndex="1"
                className="App-canvas"
                ref={canvasRef}
                width="1200"
                height="800" />
            <button id="a" style={upbutton} disabled={a} onClick={() => canMove(1, model, canvasRef)}>^</button>
            <button id="b" style={leftbutton} disabled={b} onClick={() => canMove(2, model, canvasRef)}>&lt;</button>
            <button id="c" style={rightbutton} disabled={c} onClick={() => canMove(4, model, canvasRef)}>&gt;</button>
            <button id="d" style={downbutton} disabled={d} onClick={() => canMove(3, model, canvasRef)}>v</button>
            <button id="pick" style={pick} disabled={pickup} onClick={() => key(model, canvasRef)} >Pick up</button>
            <button id="level1" style={choselevel1} disabled={defaultState1} onClick={() => chosel1()}>Level 1</button>
            <button id="level2" style={choselevel2} disabled={defaultState2} onClick={() => chosel2()}>Level 2</button>
            <button id="level3" style={choselevel3} disabled={defaultState3} onClick={() => chosel3()}>Level 3</button>
            <button id="reset" style={reset} onClick={() => setModel(new Model(model.level, model.levelNum))}>Reset</button>
        </main>
    );
}

export default App;