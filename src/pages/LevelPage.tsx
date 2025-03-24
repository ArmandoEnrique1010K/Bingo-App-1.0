import { useContext, useState } from "react";
import TargetsNumbers from "../components/Target/TargetNumbersView";
import PatternView from "../components/Target/PatternView";
import {
  DEFEAT_MODAL,
  MAX_TURNS,
  NO_MORE_ROUNDS_MODAL,
  START_LEVEL_MODAL,
} from "../constants";
import { BingoContext } from "../context/BingoContext";
import BotView from "../components/Boards/Bot/BotView";
import PlayerView from "../components/Boards/Player/PlayerView";
import StatusModalWithButton from "../components/Status/StatusModalWithButton";

// Pagina de un nivel

// PROBLEMA: COMO PASAR UNA PROP level POR MEDIO DEL CONTEXTO
export default function LevelPage() {
  const {
    color,
    round,
    targets,
    winnerPatters,
    targetText,
    boards,
    playerBoards,
    handleChangeTargets,
    handleChangeViewPlayerBoard,
    viewPlayerBoard,
    isAtFirstBoard,
    handleChangeBoard,
    isAtLastBoard,
    currentBoard,
    winner,
    bots,
    dataLevel,
    currentLevel,
  } = useContext(BingoContext);

  const [startModal, setStartModal] = useState<boolean>(true);

  return (
    <>
      <div className="text-white m-auto">
        <div className="container py-4 flex sm:flex-row flex-col items-start sm:gap-6 gap-4 justify-center mx-auto">
          <div className="flex flex-row sm:flex-col sm:w-96 w-full justify-center sm:m-0 sm:gap-0 gap-3 mx-auto">
            <div className=" flex flex-col min-w-20 sm:ml-0 ml-2 sm:w-auto w-full">
              <div className="mb-4 text-center bg-gray-700 rounded-xl p-1">
                <h1
                  className={`sm:text-2xl text-xl font-bold mb-2 text-${color}-500`}
                >
                  Nivel {currentLevel}
                </h1>
                <p className="sm:text-lg text-sm">
                  Ronda:{" "}
                  <span className={`font-semibold text-${color}-500`}>
                    {round}
                  </span>{" "}
                  / {MAX_TURNS}
                </p>
              </div>

              {/* Números objetivos */}
              <TargetsNumbers
                round={round}
                targets={targets}
                handleChangeTargets={handleChangeTargets}
                color={color}
              />
            </div>

            {/* Patrón ganador */}
            <PatternView
              patterns={winnerPatters}
              color={color}
              level={currentLevel}
              text={targetText}
            />
          </div>

          {/* Tablero del jugador */}
          <PlayerView
            viewPlayerBoard={viewPlayerBoard}
            boards={boards}
            playerBoards={playerBoards}
            level={currentLevel}
            currentBoard={currentBoard}
            color={color}
            isAtFirstBoard={isAtFirstBoard}
            isAtLastBoard={isAtLastBoard}
            handleChangeBoard={handleChangeBoard}
          />
        </div>

        {/* Contenedor dinámico para mostrar los tableros de los bots */}

        <div
          className={`grid gap-3 mb-4 mt-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mx-auto container ${
            viewPlayerBoard === false ? "grid" : "hidden"
          } sm:grid`}
        >
          {
            // Grupo de los bots
            bots.map((bot, index) => (
              <BotView
                key={bot.name}
                // currentLevel={dataLevel.level}
                targets={targets}
                interval={bot.interval}
                name={bot.name}
                patterns={winnerPatters}
                boards={bot.boards}
                // Obtiene los tableros del siguiente bot en la lista, o 0 si no hay más
                nextBoards={bot.boards ? dataLevel!.bots[index + 1]?.boards : 0}
              />
            ))
          }
        </div>
      </div>

      {/* Botón en la esquina inferior derecha de la pantalla, visible solo en pantallas pequeñas */}
      <div className="fixed bottom-4 right-4 text-right sm:hidden">
        <button
          className={`bg-${color}-500 p-3 rounded-full shadow-lg `}
          onClick={handleChangeViewPlayerBoard}
        >
          {/* Muestra un ícono diferente dependiendo de la vista actual */}
          {viewPlayerBoard === true ? (
            <img src="images/bot.svg" alt="Bot" className="w-8 h-8" />
          ) : (
            <img src="images/board.svg" alt="Jugador" className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Ventana modal que se ve al empezar un nivel */}
      <StatusModalWithButton
        modal={START_LEVEL_MODAL}
        initialState={startModal}
        setStartModal={setStartModal}
      />

      {
        // Muestra la ventana modal si el bot ha ganado
        winner === "bot" && (
          <StatusModalWithButton modal={DEFEAT_MODAL} initialState={true} />
        )
      }

      {
        // Ventana modal si ha pasado el limite de turnos
        round === MAX_TURNS && winner === "end" && (
          <StatusModalWithButton
            modal={NO_MORE_ROUNDS_MODAL}
            initialState={true}
          />
        )
      }
    </>
  );
}
