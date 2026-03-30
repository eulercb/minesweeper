import { BestTime } from "../types";

const STORAGE_KEY = "minesweeper-best-times";

export function getBestTimes(): BestTime[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveBestTime(difficulty: string, seconds: number): void {
  const times = getBestTimes();
  const existing = times.find((t) => t.difficulty === difficulty);

  if (!existing || seconds < existing.seconds) {
    const updated = times.filter((t) => t.difficulty !== difficulty);
    updated.push({ difficulty, seconds, date: new Date().toLocaleDateString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}

export function clearBestTimes(): void {
  localStorage.removeItem(STORAGE_KEY);
}
