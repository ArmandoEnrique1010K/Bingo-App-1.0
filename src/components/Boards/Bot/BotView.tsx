import { useContext, useEffect, useMemo, useState } from "react";
import { generateBoard } from "../../../utils/generateBoard";
import {
  BoardID,
  // Level,
  Pattern,
  ResultNumberBoardsBot,
  SelectedNumbers,
  SelectedPositions,
} from "../../../types";
import { dynamicInterval } from "../../../utils/dynamicInterval";
import { BingoContext } from "../../../context/BingoContext";
import { BOT_REACTION_DELAY } from "../../../constants";
// import { useLocation } from "react-router";
import BotBoardView from "./BotBoardView";

type BotViewProps = {
  // currentLevel: Level;
  targets: number[];
  interval: number;
  name: string;
  patterns: Pattern[];
  boards: number;
  nextBoards: number;
};

export default function BotView({
  // currentLevel,
  targets,
  interval,
  name,
  patterns,
  boards,
  nextBoards,
}: BotViewProps) {
  // const location = useLocation();

  const { winner, clearTargets, color, setWinner } = useContext(BingoContext);

  // Tableros generados para el bot
  const [botBoard, setBotBoard] = useState<BoardID>([]);

  // Posiciones marcadas por el bot
  const [botSelectedPositions, setBotSelectedPositions] =
    useState<SelectedPositions>([]);

  // Números seleccionados por el bot
  const [botSelectedNumbers, setBotSelectedNumbers] = useState<SelectedNumbers>(
    []
  );

  // Identificadores de los temporizadores activos
  const [timeoutIds, setTimeoutIds] = useState<number[]>([]);

  // Números objetivo encontrados en los tableros del bot
  const [result, setResult] = useState<ResultNumberBoardsBot>([]);

  // Genera los tableros del bot, solamente si no hay un ganador
  const newBoards = useMemo(() => {
    if (winner === "none") {
      return Array.from({ length: boards }).map((_, index) => ({
        // Se evita el valor 0 como ID
        id: index + 1,
        board: generateBoard(),
      }));
    } else {
      return [];
    }
  }, [winner]);

  // Detecta y marca automáticamente los números objetivo encontrados en los tableros del bot
  useEffect(() => {
    // Si no hay tableros, objetivos o el juego terminó, detiene la ejecución
    if (!botBoard.length || !targets.length || winner === "bot") return;

    // Limpia temporizadores previos antes de ejecutar nuevos
    timeoutIds.forEach((id) => clearTimeout(id));
    setTimeoutIds([]);

    // TODO: DINAMIZAR ESTO, EL ORDEN DE LOS ELEMENTOS DEBE CAMBIAR CADA VEZ

    let currentDelay = 0;
    const newTimeoutIds: number[] = [];

    // Copia de `result` para evitar modificar el estado directamente
    const dynamicResult = [...result];

    // Mezcla el orden de tableros y objetivos para mayor aleatoriedad
    dynamicResult.sort(() => Math.random() - 0.5);

    dynamicResult.forEach((res) => {
      res.targets.sort(() => Math.random() - 0.5);

      res.targets.forEach((t) => {
        // Calcula un intervalo aleatorio
        const randomInterval = dynamicInterval() * interval;
        currentDelay = currentDelay + randomInterval;

        // Marca el número en el tablero luego del tiempo establecido en el intervalo
        const timeoutId = setTimeout(() => {
          markNumberOnBoard(res.idBoard, t.number, t.position);
        }, currentDelay);

        newTimeoutIds.push(timeoutId);
      });
    });
    setTimeoutIds(newTimeoutIds);

    // Limpieza de temporizadores al desmontar el componente
    return () => {
      newTimeoutIds.forEach((id) => clearTimeout(id));
    };
  }, [result]);

  // Busca los números objetivo dentro de los tableros del bot
  useEffect(() => {
    if (targets.length > 0) {
      botBoard.forEach((board, index) => {
        const arrayTargets = board.board.filter((n) =>
          targets.includes(n.number)
        );

        setResult((prevResult) => [
          ...prevResult,
          {
            // ID del tablero
            idBoard: index + 1,
            targets: arrayTargets,
          },
        ]);
      });
    } else {
      // Limpia los resultados si no hay objetivos
      setResult([]);
    }
  }, [targets]);

  // Verifica si un número ya fue marcado
  const isNumberAlreadySelected = (idBoard: number, number: number) => {
    return !botSelectedNumbers.some(
      (board) => board.idBoard === idBoard && board.numbers.includes(number)
    );
  };

  // Marca un número en el tablero del bot
  const markNumberOnBoard = (
    idBoard: number,
    number: number,
    position: number
  ) => {
    setBotSelectedNumbers((prevState) =>
      prevState.map((board) =>
        board.idBoard === idBoard
          ? {
              ...board,
              numbers: isNumberAlreadySelected(idBoard, number)
                ? [...board.numbers, number]
                : board.numbers,
            }
          : board
      )
    );

    setBotSelectedPositions((prevState) =>
      prevState.map((board) =>
        board.idBoard === idBoard
          ? {
              ...board,
              positions: isNumberAlreadySelected(idBoard, number)
                ? [...board.positions, position]
                : board.positions,
            }
          : board
      )
    );
  };

  // Verifica si es un número seleccionado según el tablero
  const handleIsSelectedNumber = (idBoard: number, number: number): boolean => {
    return (
      botSelectedNumbers
        .find((board) => board.idBoard === idBoard)
        ?.numbers.includes(number) || false
    );
  };

  // Verifica si el bot ha ganado
  const checkBotWinnerPattern = () => {
    // Si ya hay un ganador, no evalúa
    if (winner !== "none") return;

    // Itera por cada tablero del bot, evalua si tiene el patrón ganador
    for (const board of botSelectedPositions) {
      const hasWinningPattern = patterns.some((pattern) =>
        pattern.every((position) => board.positions.includes(position))
      );

      if (hasWinningPattern) {
        const timeoutId = setTimeout(() => {
          setWinner((prevWinner) => {
            if (prevWinner === "none") {
              clearTargets();
              return "bot";
            }
            return prevWinner;
          });
        }, BOT_REACTION_DELAY);

        // Limpia los temporizadores
        return () => clearTimeout(timeoutId);
      }
    }
  };

  // Evalúa si hay un patrón ganador cuando cambian las posiciones marcadas
  useEffect(() => {
    checkBotWinnerPattern();
  }, [botSelectedNumbers]);

  // Reinicia el bot si no hay un ganador (al reiniciar el nivel o pasar de nivel)
  useEffect(() => {
    if (winner === "none") {
      setBotBoard(newBoards);
      setBotSelectedPositions(
        Array.from({ length: boards }).map((_, index) => ({
          idBoard: index + 1,
          positions: [13],
        }))
      );
      setBotSelectedNumbers(
        Array.from({ length: boards }).map((_, index) => ({
          idBoard: index + 1,
          numbers: [0],
        }))
      );
    }
  }, [winner]);

  return (
    <div
      className={`flex flex-col items-center bg-gray-700 p-2 rounded-lg shadow-md  ${
        boards >= 2 ? "col-span-2" : ""
      } ${
        boards < 2 && (nextBoards !== 0 || nextBoards >= 2) ? "col-span-2" : ""
      }`}
    >
      <h2 className="text-lg font-semibold text-gray-200 mb-2">{name}</h2>
      <div className="flex flex-row gap-4">
        {Array.from({ length: boards }).map((_, index) => (
          <BotBoardView
            key={index + 1}
            board={botBoard.find((b) => b.id === index + 1)?.board || []}
            idBoard={index + 1}
            color={color}
            handleIsSelectedNumber={handleIsSelectedNumber}
          />
        ))}
      </div>
    </div>
  );
}
