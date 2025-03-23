import { Board } from "../../../types";
import BotNumberView from "./BotNumberView";

type BotColumnViewProps = {
  board: Board;
  handleIsSelectedNumber: (idBoard: number, position: number) => boolean;
  max: number;
  min: number;
  idBoard: number;
  color: string;
};

export default function BotColumnView({
  board,
  handleIsSelectedNumber,
  max,
  min,
  idBoard,
  color,
}: BotColumnViewProps) {
  return (
    <>
      <div className="flex flex-col">
        {
          // Itera sobre board seleccionando unos 5 numeros con filter para asignarlos a BotSquareNumber
          board
            .filter((n) => n.position >= min && n.position <= max)
            .map((n) => (
              <BotNumberView
                key={n.position}
                idBoard={idBoard}
                handleIsSelectedNumber={handleIsSelectedNumber}
                value={{ number: n.number, position: n.position }}
                color={color}
              />
            ))
        }
      </div>
    </>
  );
}
