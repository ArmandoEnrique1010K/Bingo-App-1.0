import { useContext, useState } from "react";
import { Link } from "react-router";
import { BingoContext } from "../context/BingoContext";
import { levels } from "../data/levels";

export default function IndexPage() {
  const { unlockedLevels, setCurrentLevel, setWinner, color } =
    useContext(BingoContext);

  const [showLevels, setShowLevels] = useState(false);

  const getColorLevel = (level: number) => {
    const levelData = levels.find((l) => l.level === level);
    const result = levelData ? levelData.color : "";
    return result;
  };

  return (
    <div className="min-h-full max-h-full flex flex-col items-center bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-center my-8">
        BingoApp <span className="text-xl">v1.2</span>
      </h1>
      {showLevels === false ? (
        // Botón de inicio, ocupa toda la pantalla y muestra los niveles al hacer clic
        <button
          className={`w-full flex-grow flex items-center justify-center bg-${color}-500 text-white text-2xl font-semibold p-4`}
          onClick={() => {
            setShowLevels(true);
            // startMusic();
          }}
        >
          Iniciar juego
        </button>
      ) : (
        <>
          <div className="w-full max-w-4xl px-4 mb-4">
            <p className="text-lg text-center mb-6">
              Seleccione un nivel para empezar
            </p>

            {/* Muestra los niveles desbloqueados en un grid adaptable a distintos tamaños de pantalla */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {unlockedLevels.map((level: number) => (
                <Link
                  key={level}
                  to={`/level_${level}`}
                  onClick={() => {
                    setCurrentLevel(level);
                    setWinner("none");
                  }}
                  className={`bg-${getColorLevel(
                    level
                  )}-500 text-white text-center py-4 rounded-md shadow-lg`}
                >
                  Nivel {level}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
