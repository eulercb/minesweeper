import { useState } from "react";
import { Difficulty } from "./types";
import { useMinesweeper } from "./hooks/useMinesweeper";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Board from "./components/Board";
import BestTimes from "./components/BestTimes";

function Game({
  difficulty,
  onBack,
}: {
  difficulty: Difficulty;
  onBack: () => void;
}) {
  const {
    board,
    gameState,
    minesRemaining,
    elapsed,
    handleCellClick,
    handleCellRightClick,
    handleReset,
  } = useMinesweeper(difficulty);

  return (
    <div className="flex flex-col items-center gap-2 p-4">
      <div className="flex items-center gap-4 mb-2">
        <button
          className="text-sm text-blue-500 underline cursor-pointer hover:text-blue-700"
          onClick={onBack}
        >
          &larr; Menu
        </button>
        <span className="text-gray-600 font-medium">
          {difficulty.name} ({difficulty.rows}x{difficulty.cols})
        </span>
      </div>
      <Header
        minesRemaining={minesRemaining}
        gameState={gameState}
        elapsed={elapsed}
        onReset={handleReset}
      />
      <div className="overflow-auto max-w-full">
        <Board
          board={board}
          gameState={gameState}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />
      </div>
      {gameState === "won" && (
        <div className="mt-2 text-green-600 font-bold text-lg">
          You won in {elapsed}s!
        </div>
      )}
      {gameState === "lost" && (
        <div className="mt-2 text-red-600 font-bold text-lg">Game Over!</div>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<"menu" | "game">("menu");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [showBestTimes, setShowBestTimes] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleStart = (d: Difficulty) => {
    setDifficulty(d);
    setGameKey((k) => k + 1);
    setScreen("game");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {screen === "menu" ? (
        <Menu onStart={handleStart} onShowBestTimes={() => setShowBestTimes(true)} />
      ) : (
        difficulty && (
          <Game
            key={gameKey}
            difficulty={difficulty}
            onBack={() => setScreen("menu")}
          />
        )
      )}
      {showBestTimes && <BestTimes onClose={() => setShowBestTimes(false)} />}
    </div>
  );
}
