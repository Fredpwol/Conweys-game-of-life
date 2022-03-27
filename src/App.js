import { useState, useEffect } from "react";
import Board from "./components/Board";
import { gridSize } from "./constants";

function App() {
  const [generation, setGeneration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const [grid, SetGrid] = useState([]);

  useEffect(() => {
    SetGrid(emptyGrid());
  }, []);

  const emptyGrid = () => Array(gridSize).fill(Array(gridSize).fill(0));
  return (
    <div>
      <Board
        generation={generation}
        setGeneration={setGeneration}
        isStarted={isStarted}
        grid={grid}
        SetGrid={SetGrid}
      />
      <div>
        <div className="footer">
          <div className="control-panel">
            <h2 className="stat-item">GENERATION: {generation}</h2>
            <button
              className="stat-item"
              onClick={() => setIsStarted(!isStarted)}
            >
             { isStarted ? "Pause" : "Start"}
            </button>
            <button
              className="stat-item"
              onClick={() => {
                setIsStarted(false)
                setTimeout(() => {
                  SetGrid(emptyGrid());
                  setGeneration(0);
                }, 1000)
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
