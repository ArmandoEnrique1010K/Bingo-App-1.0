import { Board } from "../../../types";
import BotColumnView from "./BotColumnView";

type BotBoardViewProps = {
  board: Board;
  handleIsSelectedNumber: (idBoard: number, position: number) => boolean;
  idBoard: number;
  color: string;
};

export default function BotBoardView({
  board,
  handleIsSelectedNumber,
  idBoard,
  color,
}: BotBoardViewProps) {
  return (
    <div className="grid grid-cols-5">
      {/* Se crea un arreglo para generar dinamicamente las columnas del tablero */}
      {Array.from({ length: 5 }).map((_, index) => (
        <BotColumnView
          key={index}
          idBoard={idBoard}
          board={board}
          handleIsSelectedNumber={handleIsSelectedNumber}
          min={index * 5 + 1}
          max={(index + 1) * 5}
          color={color}
        />
      ))}
    </div>
  );
}
