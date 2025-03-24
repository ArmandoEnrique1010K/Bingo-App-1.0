import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import PlayerBoardView from "./PlayerBoardView";
import {
  EXIT_MODAL,
  FINAL_LEVEL,
  FINAL_LEVEL_VICTORY_MODAL,
  VICTORY_MODAL,
} from "../../../constants";
import { BoardID, Direction } from "../../../types";
import StatusModalWithButton from "../../Status/StatusModalWithButton";

type PlayerViewProps = {
  viewPlayerBoard: boolean;
  boards: number;
  playerBoards: BoardID;
  level: number;
  color: string;
  currentBoardId: number;
  isAtFirstBoard: boolean;
  isAtLastBoard: boolean;
  changeBoard: (direction: Direction) => void;
};
export default function PlayerView({
  viewPlayerBoard,
  boards,
  playerBoards,
  level,
  color,
  currentBoardId,
  isAtFirstBoard,
  isAtLastBoard,
  changeBoard,
}: PlayerViewProps) {
  return (
    <>
      {viewPlayerBoard === true && (
        <div className="flex flex-col gap-4 sm:mx-0 mx-auto">
          <div className="flex flex-row mx-auto border-4 border-gray-700 rounded-xl">
            {
              // Renderiza BoardNumbers por la cantidad de boards en currentLevel
              Array.from({ length: boards }).map(
                (_, index) =>
                  // TODO: BUSCAR EL TABLERO POR EL INDEX
                  // index + 1 <-- obtiene el id

                  currentBoardId === index + 1 && (
                    <PlayerBoardView
                      key={index}
                      idBoard={index}
                      // Busca el tablero por su id y lo pasa como propiedad
                      board={
                        playerBoards.find((b) => b.id === index + 1)?.board ||
                        []
                      }
                      // handleIsSelectedNumber={handleIsSelectedNumber}
                      // handleClickButton={handleClickButton}
                      // selectedNumbers={selectedNumbers}
                      // color={color}
                    />
                  )
              )
            }
          </div>
          <div className="bg-gray-700 flex flex-col px-3 sm:mx-0 mx-3 gap-3 rounded-xl py-4">
            <div className="flex flex-row justify-between gap-4">
              <button
                className={`px-4 sm:py-3 py-2 font-semibold rounded-lg shadow-md transition duration-300  w-full  shadow-black 
                ${
                  isAtFirstBoard
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : `bg-${color}-500 text-white `
                } 
                `}
                onClick={() => changeBoard("left")}
                disabled={isAtFirstBoard}
              >
                <ArrowLeftIcon className="h-6 mx-auto" />
              </button>

              <button
                className={`px-4 sm:py-3 py-2 font-semibold rounded-lg shadow-md transition duration-300 w-full  sm:text-base text-sm shadow-black 
                ${
                  isAtLastBoard
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : `bg-${color}-500 text-white `
                }`}
                onClick={() => changeBoard("right")}
                disabled={isAtLastBoard}
              >
                <ArrowRightIcon className="h-6 mx-auto" />
              </button>
            </div>
            <div className="flex flex-row justify-between gap-4">
              <StatusModalWithButton
                modal={
                  level !== FINAL_LEVEL
                    ? VICTORY_MODAL
                    : FINAL_LEVEL_VICTORY_MODAL
                }
                initialState={false}
              />

              <StatusModalWithButton modal={EXIT_MODAL} initialState={false} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
