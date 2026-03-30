import { useState } from "react";
import { BestTime } from "../types";
import { getBestTimes, clearBestTimes } from "../utils/storage";

interface BestTimesProps {
  onClose: () => void;
}

export default function BestTimes({ onClose }: BestTimesProps) {
  const [times, setTimes] = useState<BestTime[]>(getBestTimes);

  const handleClear = () => {
    clearBestTimes();
    setTimes([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 min-w-[300px]">
        <h2 className="text-xl font-bold mb-4">Best Times</h2>
        {times.length === 0 ? (
          <p className="text-gray-500 mb-4">No times recorded yet.</p>
        ) : (
          <table className="w-full mb-4">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Difficulty</th>
                <th className="text-right py-1">Time</th>
                <th className="text-right py-1">Date</th>
              </tr>
            </thead>
            <tbody>
              {times.map((t) => (
                <tr key={t.difficulty} className="border-b border-gray-100">
                  <td className="py-1">{t.difficulty}</td>
                  <td className="text-right py-1">{t.seconds}s</td>
                  <td className="text-right py-1 text-gray-500 text-sm">
                    {t.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
