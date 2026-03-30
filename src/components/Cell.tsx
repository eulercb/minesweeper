import { Cell as CellType, GameState } from "../types";

const NUMBER_COLORS: Record<number, string> = {
  1: "text-blue-600",
  2: "text-green-600",
  3: "text-red-600",
  4: "text-blue-900",
  5: "text-red-900",
  6: "text-teal-600",
  7: "text-black",
  8: "text-gray-500",
};

interface CellProps {
  cell: CellType;
  gameState: GameState;
  onClick: () => void;
  onRightClick: () => void;
}

export default function Cell({ cell, gameState, onClick, onRightClick }: CellProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick();
  };

  if (!cell.isRevealed) {
    return (
      <button
        className="w-8 h-8 border border-gray-400 bg-gray-300 hover:bg-gray-200 active:bg-gray-400 flex items-center justify-center text-sm font-bold select-none cursor-pointer shadow-[inset_1px_1px_0_#fff,inset_-1px_-1px_0_#808080]"
        onClick={onClick}
        onContextMenu={handleContextMenu}
      >
        {cell.isFlagged ? "🚩" : ""}
      </button>
    );
  }

  if (cell.isMine) {
    const isExploded = gameState === "lost";
    return (
      <div
        className={`w-8 h-8 border border-gray-400 flex items-center justify-center text-sm select-none ${
          isExploded ? "bg-red-500" : "bg-gray-200"
        }`}
      >
        💣
      </div>
    );
  }

  return (
    <div
      className={`w-8 h-8 border border-gray-300 bg-gray-200 flex items-center justify-center text-sm font-bold select-none ${
        NUMBER_COLORS[cell.adjacentMines] ?? ""
      }`}
    >
      {cell.adjacentMines > 0 ? cell.adjacentMines : ""}
    </div>
  );
}
