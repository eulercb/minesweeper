export interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  adjacentMines: number;
  isRevealed: boolean;
  isFlagged: boolean;
}

export type GameState = "idle" | "playing" | "won" | "lost";

export interface Difficulty {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}

export const DIFFICULTIES: Difficulty[] = [
  { name: "Beginner", rows: 9, cols: 9, mines: 10 },
  { name: "Intermediate", rows: 16, cols: 16, mines: 40 },
  { name: "Expert", rows: 16, cols: 30, mines: 99 },
];

export interface BestTime {
  difficulty: string;
  seconds: number;
  date: string;
}
