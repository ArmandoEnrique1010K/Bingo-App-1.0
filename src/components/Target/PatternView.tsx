import PositionBoardView from "./PositionBoardView";

type PatternViewProps = {
  level: number;
  text: string;
  color: string;
  patterns: number[][];
};

// Componente para mostrar el patrón objetivo
export default function PatternView({
  color,
  text,
  patterns,
}: PatternViewProps) {
  // console.log(color);
  return (
    <div className="w-full bg-gray-700 p-3 rounded-lg shadow-lg flex flex-col sm:min-w-20 sm:ml-0 sm:mr-0 mr-2 sm:w-auto ">
      <div
        className={`sm:text-xl font-semibold text-center mb-4 text-${color}-500`}
      >
        Patrón objetivo
      </div>

      {/* Muestra un tablero de posiciones dinamicas */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center w-auto">
        <PositionBoardView color={color} patterns={patterns} />

        <div className="sm:text-lg  text-sm text-white text-center my-auto ">
          {text}
        </div>
      </div>
    </div>
  );
}
