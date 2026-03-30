import { useState, useCallback, useEffect, useRef } from "react";
import { Cell, Difficulty, GameState } from "../types";
import {
  createEmptyBoard,
  placeMines,
  revealCell,
  revealAllMines,
  checkWin,
} from "../utils/board";
import { saveBestTime } from "../utils/storage";

// Re-export for convenience — the preset names are needed to decide if a time should be saved
const PRESET_NAMES = new Set(["Beginner", "Intermediate", "Expert"]);

export function useMinesweeper(difficulty: Difficulty) {
  const [board, setBoard] = useState<Cell[][]>(() =>
    createEmptyBoard(difficulty.rows, difficulty.cols),
  );
  const [gameState, setGameState] = useState<GameState>("idle");
  const [flagCount, setFlagCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    return stopTimer;
  }, [stopTimer]);

  const handleReset = useCallback(() => {
    stopTimer();
    setBoard(createEmptyBoard(difficulty.rows, difficulty.cols));
    setGameState("idle");
    setFlagCount(0);
    setElapsed(0);
  }, [difficulty, stopTimer]);

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (gameState === "won" || gameState === "lost") return;

      setBoard((prevBoard) => {
        const cell = prevBoard[row][col];
        if (cell.isRevealed || cell.isFlagged) return prevBoard;

        let newBoard: Cell[][];

        if (gameState === "idle") {
          newBoard = placeMines(prevBoard, difficulty.mines, row, col);
          startTimer();
          setGameState("playing");
        } else {
          newBoard = prevBoard.map((r) => r.map((c) => ({ ...c })));
        }

        if (newBoard[row][col].isMine) {
          newBoard = revealAllMines(newBoard);
          newBoard[row][col] = { ...newBoard[row][col], isRevealed: true };
          stopTimer();
          setGameState("lost");
          return newBoard;
        }

        newBoard = revealCell(newBoard, row, col);

        if (checkWin(newBoard)) {
          stopTimer();
          setGameState("won");
          // Save best time for preset difficulties
          if (PRESET_NAMES.has(difficulty.name)) {
            // elapsed is stale in this closure, so we read from the ref-based timer
            // We'll save the time in an effect instead
          }
        }

        return newBoard;
      });
    },
    [gameState, difficulty, startTimer, stopTimer],
  );

  // Save best time when game is won
  useEffect(() => {
    if (gameState === "won" && PRESET_NAMES.has(difficulty.name)) {
      saveBestTime(difficulty.name, elapsed);
    }
  }, [gameState, difficulty.name, elapsed]);

  const handleCellRightClick = useCallback(
    (row: number, col: number) => {
      if (gameState === "won" || gameState === "lost") return;
      if (gameState === "idle") return;

      setBoard((prevBoard) => {
        const cell = prevBoard[row][col];
        if (cell.isRevealed) return prevBoard;

        const newBoard = prevBoard.map((r) => r.map((c) => ({ ...c })));
        newBoard[row][col].isFlagged = !cell.isFlagged;
        setFlagCount((prev) => prev + (cell.isFlagged ? -1 : 1));
        return newBoard;
      });
    },
    [gameState],
  );

  return {
    board,
    gameState,
    minesRemaining: difficulty.mines - flagCount,
    elapsed,
    handleCellClick,
    handleCellRightClick,
    handleReset,
  };
}
