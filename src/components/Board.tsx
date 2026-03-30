import { Cell as CellType, GameState } from "../types";
import Cell from "./Cell";

interface BoardProps {
  board: CellType[][];
  gameState: GameState;
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => void;
}

export default function Board({
  board,
  gameState,
  onCellClick,
  onCellRightClick,
}: BoardProps) {
  const cols = board[0]?.length ?? 0;

  return (
    <div
      className="inline-grid border-2 border-gray-500 bg-gray-400"
      style={{ gridTemplateColumns: `repeat(${cols}, 2rem)` }}
    >
      {board.flatMap((row) =>
        row.map((cell) => (
          <Cell
            key={`${cell.row}-${cell.col}`}
            cell={cell}
            gameState={gameState}
            onClick={() => onCellClick(cell.row, cell.col)}
            onRightClick={() => onCellRightClick(cell.row, cell.col)}
          />
        )),
      )}
    </div>
  );
}
