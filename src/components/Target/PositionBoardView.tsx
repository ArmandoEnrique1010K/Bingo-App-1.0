import { useEffect, useState } from "react";
import { getPositionsBoard } from "../../utils/getPositionsBoard";

type PositionBoardViewProps = {
  color: string;
  patterns: number[][];
};

export default function PositionBoardView({
  color,
  patterns,
}: PositionBoardViewProps) {
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);

  const verifyTargets = patterns[currentPatternIndex];

  // Ejecutar siempre cada 5 segundos, patron dinamico
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPatternIndex((prevIndex) => (prevIndex + 1) % patterns.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [patterns.length]);

  return (
    <div className="flex flex-row justify-center">
      {getPositionsBoard().map((column, index) => (
        <div key={index + 1} className="flex flex-col">
          {column.map((num) => (
            <div
              key={num}
              className={`size-8 border-solid border-2 border-gray-700 flex items-center justify-center ${
                verifyTargets.includes(num) ? `bg-${color}-500` : "bg-gray-600"
              }`}
            >
              {/*num*/}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
