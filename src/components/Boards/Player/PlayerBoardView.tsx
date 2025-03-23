import { Board } from "../../../types";
import PlayerColumnView from "./PlayerColumnView";

type PlayerBoardViewProps = {
  board: Board;
  idBoard: number;
};

export default function PlayerBoardView({
  board,
  idBoard,
}: PlayerBoardViewProps) {
  return (
    <>
      <div className="flex flex-row gap-2 sm:p-4 p-2 bg-gray-700 justify-center items-center">
        {/* Conviene usar un arreglo para generar dinamicamente las columnas del tablero */}
        {Array.from({ length: 5 }).map((_, index) => (
          <PlayerColumnView
            key={index}
            numberBoard={board}
            idBoard={idBoard}
            min={index * 5 + 1}
            max={(index + 1) * 5}
          />
        ))}
      </div>
    </>
  );
}
