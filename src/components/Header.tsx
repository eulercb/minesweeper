import { GameState } from "../types";

interface HeaderProps {
  minesRemaining: number;
  gameState: GameState;
  elapsed: number;
  onReset: () => void;
}

function pad(n: number): string {
  return String(Math.min(n, 999)).padStart(3, "0");
}

export default function Header({
  minesRemaining,
  gameState,
  elapsed,
  onReset,
}: HeaderProps) {
  const face = gameState === "won" ? "😎" : gameState === "lost" ? "😵" : "😊";

  return (
    <div className="flex items-center justify-between bg-gray-300 border-2 border-gray-500 px-3 py-2 mb-1">
      <span className="font-mono text-xl bg-black text-red-500 px-2 py-1 rounded min-w-[3.5rem] text-center">
        {pad(minesRemaining)}
      </span>
      <button
        className="text-2xl cursor-pointer hover:scale-110 transition-transform"
        onClick={onReset}
      >
        {face}
      </button>
      <span className="font-mono text-xl bg-black text-red-500 px-2 py-1 rounded min-w-[3.5rem] text-center">
        {pad(elapsed)}
      </span>
    </div>
  );
}
