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
    targetsNumbers,
    winnerPatters,
    level,
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
    // currentLevel
  } = useContext(BingoContext);

  const [startModal, setStartModal] = useState<boolean>(true);

  return (
    <>
      <div className="text-white m-auto">
        <div className="container mx-auto py-4 flex sm:flex-row flex-col items-start sm:gap-6 gap-4 justify-center">
          <div className="flex flex-row sm:flex-col sm:w-96 w-full justify-center sm:m-0 sm:gap-0 gap-3 mx-auto">
            <div className=" flex flex-col min-w-20 sm:ml-0 ml-2 sm:w-auto w-full">
              <div className="mb-4 text-center bg-gray-700 rounded-xl p-1">
                <h1
                  className={`sm:text-2xl text-xl font-bold mb-2 text-${color}-500`}
                >
                  Nivel {level}
                </h1>
                <p className="sm:text-lg text-sm">
                  Ronda:{" "}
                  <span className={`font-semibold text-${color}-500`}>
                    {round}
                  </span>{" "}
                  / {MAX_TURNS}
                </p>
              </div>

              {/* Componente de los numeros objetivos */}
              {/* TODO: MEJORAR LA LOGICA DE TARGETS, POR UN MILISEGUNDO SE VE QUE SE MUESTRA UN BOTON??? */}
              <TargetsNumbers
                round={round}
                targets={targetsNumbers}
                handleChangeTargets={handleChangeTargets}
                color={color}
              />
            </div>

            {/* Componente del patrón ganador */}
            <PatternView
              patterns={winnerPatters}
              color={color}
              level={level}
              text={targetText}
            />
          </div>

          <PlayerView
            viewPlayerBoard={viewPlayerBoard}
            boards={boards}
            playerBoards={playerBoards}
            level={level}
            currentBoard={currentBoard}
            color={color}
            isAtFirstBoard={isAtFirstBoard}
            isAtLastBoard={isAtLastBoard}
            handleChangeBoard={handleChangeBoard}
          />
        </div>

        {/* Boton para alternar entre la vista del tablero del jugador y los bots */}
        {/* Diseño de cuadricula en tailwind: grid grid-cols-4 grid-rows-2 */}

        {/* TODO: UTILIZAR LA CLASE hidden PODRIA SER UNA OPCION VIABLE??? */}
        {
          <div
            className={`sm:flex sm:flex-row grid  grid-cols-2 items-center justify-center  sm:mx-auto sm:mt-4 mt-0 mx-2 gap-3 mb-4 ${
              viewPlayerBoard === false ? "" : "hidden"
            }`}
          >
            {
              // SECCION PARA AGRUPAR TODOS LOS BOTS
              bots.map((bot, index) => (
                <BotView
                  key={bot.name}
                  // currentLevel={dataLevel!}
                  targets={targetsNumbers}
                  interval={bot.interval}
                  name={bot.name}
                  patterns={winnerPatters}
                  boards={bot.boards}
                  nextBoards={
                    bot.boards ? dataLevel!.bots[index + 1]?.boards : 0
                  }
                />
              ))
            }
          </div>
        }

        {
          // Si el jugador ha perdido
          winner === "bot" && (
            // Muestra la ventana modal que se muestra automaticamente
            <StatusModalWithButton modal={DEFEAT_MODAL} initialState={true} />
          )
        }

        {
          /// Si el numero de turnos llega a 3 (limite)
          round === MAX_TURNS && winner === "end" && (
            <StatusModalWithButton
              modal={NO_MORE_ROUNDS_MODAL}
              initialState={true}
            />
          )
        }

        {/* TODO: ESTO SE DEBE MOSTRAR CADA VEZ QUE CAMBIA DE NIVEL */}
        <StatusModalWithButton
          modal={START_LEVEL_MODAL}
          initialState={startModal}
          setStartModal={setStartModal}
        />
      </div>
      <div className="fixed bottom-4 right-4 text-right sm:hidden">
        <button
          className={`bg-${color}-500 p-3 rounded-full shadow-lg `}
          onClick={handleChangeViewPlayerBoard}
        >
          {viewPlayerBoard === true ? (
            <img src="images/bot.svg" alt="Bot" className="w-8 h-8" />
          ) : (
            <img src="images/board.svg" alt="Jugador" className="w-8 h-8" />
          )}
        </button>
      </div>
    </>
  );
}
