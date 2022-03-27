import { useEffect, useRef, useState } from "react";
import { gridSize } from "../constants";
import "../styles/style.css";

export default function Board({ generation, setGeneration, isStarted, grid, SetGrid }) {

  useEffect(() => {
    if (isStarted) {
      setTimeout(evaluate, 1);
    }
  }, [generation, isStarted]);

  const evaluate = () => {
    const gridCopy = [...grid];
    for (var i = 0; i < gridCopy.length; i++) {
      gridCopy[i] = [...gridCopy[i]];
    }
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        let nextState = grid[row][col];
        const neighbourValues = getNeighbouringCellState(row, col);
        let nLive = neighbourValues.reduce((x, y) => x + y);

        let currentState = grid[row][col];
        if (currentState) {
          if (nLive < 2 || nLive > 3) {
            nextState = 0;
          }
        } else {
          if (nLive === 3) {
            nextState = 1;
          }
        }
        gridCopy[row][col] = nextState;
      }
    }
    SetGrid(gridCopy);
    setGeneration(generation + 1);
  };

  const getNeighbours = (row, col) => {
    const neighPos = [
      [0, -1],
      [0, 1],
      [1, 0],
      [-1, 0],
      [-1, 1],
      [1, -1],
      [1, 1],
      [-1, -1],
    ];
    const neighbourCells = [];
    for (var i = 0; i < neighPos.length; i++) {
      let pos = neighPos[i];
      const neighCellPos = [pos[0] + row, pos[1] + col];
      if (
        0 <= neighCellPos[0] &&
        neighCellPos[0] < gridSize &&
        0 <= neighCellPos[1] &&
        neighCellPos[1] < gridSize
      ) {
        neighbourCells.push(neighCellPos);
      }
    }
    return neighbourCells;
  };

  const getNeighbouringCellState = (row, col) =>
    getNeighbours(row, col).map(([i, j]) => grid[i][j]);

  const handleCellClick = (e) => {
    if (!isStarted) {
      const [row, col] = e.currentTarget
        .getAttribute("value")
        .split(",")
        .map((num) => Number(num));
      const gridCopy = [...grid];
      for (var i = 0; i < gridCopy.length; i++) {
        gridCopy[i] = [...gridCopy[i]];
      }
      gridCopy[row][col] = gridCopy[row][col] === 1 ? 0 : 1;
      SetGrid(gridCopy);
    }
  };

  return (
    <div>
      <table>
        {grid.map((row, rowidx) => (
          <tr key={rowidx}>
            {row.map((col, colidx) => (
              <td
                key={`${rowidx},${colidx}`}
                value={`${rowidx},${colidx}`}
                style={{ backgroundColor: col === 1 ? "black" : "white" }}
                onClick={handleCellClick}
              ></td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
