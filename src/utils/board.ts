import { Cell } from "../types";

export function createEmptyBoard(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      isMine: false,
      adjacentMines: 0,
      isRevealed: false,
      isFlagged: false,
    })),
  );
}

export function placeMines(
  board: Cell[][],
  mines: number,
  safeRow: number,
  safeCol: number,
): Cell[][] {
  const rows = board.length;
  const cols = board[0].length;
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));

  const isSafe = (r: number, c: number) =>
    Math.abs(r - safeRow) <= 1 && Math.abs(c - safeCol) <= 1;

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!newBoard[r][c].isMine && !isSafe(r, c)) {
      newBoard[r][c].isMine = true;
      placed++;
    }
  }

  return calculateAdjacent(newBoard);
}

function calculateAdjacent(board: Cell[][]): Cell[][] {
  const rows = board.length;
  const cols = board[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
            count++;
          }
        }
      }
      board[r][c].adjacentMines = count;
    }
  }

  return board;
}

export function revealCell(board: Cell[][], row: number, col: number): Cell[][] {
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));
  const rows = newBoard.length;
  const cols = newBoard[0].length;

  const stack: [number, number][] = [[row, col]];

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    if (r < 0 || r >= rows || c < 0 || c >= cols) continue;
    if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) continue;

    newBoard[r][c].isRevealed = true;

    if (newBoard[r][c].adjacentMines === 0 && !newBoard[r][c].isMine) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          stack.push([r + dr, c + dc]);
        }
      }
    }
  }

  return newBoard;
}

export function revealAllMines(board: Cell[][]): Cell[][] {
  return board.map((r) =>
    r.map((c) => (c.isMine ? { ...c, isRevealed: true } : { ...c })),
  );
}

export function checkWin(board: Cell[][]): boolean {
  return board.every((row) =>
    row.every((cell) => cell.isMine || cell.isRevealed),
  );
}
