import { useState } from "react";
import { Difficulty, DIFFICULTIES } from "../types";

interface MenuProps {
  onStart: (difficulty: Difficulty) => void;
  onShowBestTimes: () => void;
}

export default function Menu({ onStart, onShowBestTimes }: MenuProps) {
  const [customRows, setCustomRows] = useState(20);
  const [customCols, setCustomCols] = useState(20);
  const [customMines, setCustomMines] = useState(60);

  const maxMines = (customRows * customCols) - 9; // leave room for safe zone

  const handleCustomStart = () => {
    const clampedMines = Math.min(customMines, Math.max(1, maxMines));
    onStart({
      name: "Custom",
      rows: customRows,
      cols: customCols,
      mines: clampedMines,
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <h1 className="text-4xl font-bold text-gray-800">💣 Minesweeper</h1>

      <div className="flex gap-3">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.name}
            className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 cursor-pointer transition-colors"
            onClick={() => onStart(d)}
          >
            {d.name}
            <span className="block text-xs font-normal opacity-80">
              {d.rows}x{d.cols} &middot; {d.mines} mines
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-5 w-full max-w-sm">
        <h2 className="font-semibold text-gray-700 mb-3">Custom Game</h2>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <label className="flex flex-col text-sm text-gray-600">
            Rows
            <input
              type="number"
              min={5}
              max={30}
              value={customRows}
              onChange={(e) => setCustomRows(Math.max(5, Math.min(30, +e.target.value)))}
              className="mt-1 border rounded px-2 py-1 text-center"
            />
          </label>
          <label className="flex flex-col text-sm text-gray-600">
            Cols
            <input
              type="number"
              min={5}
              max={50}
              value={customCols}
              onChange={(e) => setCustomCols(Math.max(5, Math.min(50, +e.target.value)))}
              className="mt-1 border rounded px-2 py-1 text-center"
            />
          </label>
          <label className="flex flex-col text-sm text-gray-600">
            Mines
            <input
              type="number"
              min={1}
              max={maxMines}
              value={customMines}
              onChange={(e) => setCustomMines(Math.max(1, Math.min(maxMines, +e.target.value)))}
              className="mt-1 border rounded px-2 py-1 text-center"
            />
          </label>
        </div>
        <button
          className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 cursor-pointer transition-colors"
          onClick={handleCustomStart}
        >
          Start Custom Game
        </button>
      </div>

      <button
        className="text-blue-500 underline cursor-pointer hover:text-blue-700"
        onClick={onShowBestTimes}
      >
        View Best Times
      </button>
    </div>
  );
}
