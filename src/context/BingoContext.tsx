import { createContext, ReactNode } from "react";
import usePlayer from "../hooks/usePlayer";
import {
  BoardID,
  Bot,
  Level,
  Pattern,
  SelectedNumbers,
  SelectedPositions,
  Winner,
} from "../types";

type BingoContextProps = {
  color: string;
  round: number;
  targetsNumbers: number[];
  winnerPatters: Pattern[];
  level: number;
  targetText: string;
  boards: number;
  playerBoards: BoardID;
  handleIsSelectedNumber: (idBoard: number, position: number) => boolean;
  handleClickButton: (
    idBoard: number,
    number: number,
    position: number
  ) => void;
  selectedNumbersInBoards: SelectedNumbers;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  handleChangeTargets: () => void;
  handleChangeViewPlayerBoard: () => void;

  setWinner: React.Dispatch<React.SetStateAction<Winner>>;
  clearTargets: () => void;

  handleCheckWinnerPattern: () => boolean;
  viewPlayerBoard: boolean;

  isAtFirstBoard: boolean;
  handleChangeBoard: (direction: "prev" | "next") => void;
  isAtLastBoard: boolean;
  music: string;
  bots: Bot[];
  unlockedLevels: number[];
  currentBoard: number;
  currentLevel: number;
  dataLevel: Level | undefined;
  winner: Winner;
  selectedPositionsInBoards: SelectedPositions;
  excludedTargetNumbers: number[];
  isPlaying: boolean;
  stopMusic: () => void;

  startMusic: () => Promise<void>;
};

type BingoProviderProps = {
  children: ReactNode;
};

export const BingoContext = createContext<BingoContextProps>(null!);

export const BingoProvider = ({ children }: BingoProviderProps) => {
  // const text = 'CONTEXTO DE REACT'
  const {
    color,
    round,
    targetsNumbers,
    winnerPatters,
    level,
    targetText,
    boards,
    playerBoards,
    handleIsSelectedNumber,
    handleClickButton,
    selectedNumbersInBoards,
    handleChangeTargets,
    setCurrentLevel,
    handleChangeViewPlayerBoard,

    setWinner,
    clearTargets,

    handleCheckWinnerPattern,
    viewPlayerBoard,

    isAtFirstBoard,
    handleChangeBoard,
    isAtLastBoard,
    music,
    bots,
    unlockedLevels,
    currentBoard,
    currentLevel,
    dataLevel,
    winner,
    selectedPositionsInBoards,
    excludedTargetNumbers,
    isPlaying,
    stopMusic,
    startMusic,
  } = usePlayer();
  return (
    <BingoContext.Provider
      value={{
        color,
        round,
        targetsNumbers,
        winnerPatters,
        level,
        targetText,
        boards,
        playerBoards,
        handleIsSelectedNumber,
        handleClickButton,
        selectedNumbersInBoards,
        handleChangeTargets,
        setCurrentLevel,
        handleChangeViewPlayerBoard,

        setWinner,
        clearTargets,

        handleCheckWinnerPattern,
        viewPlayerBoard,
        dataLevel,

        isAtFirstBoard,
        handleChangeBoard,
        isAtLastBoard,
        music,
        bots,
        unlockedLevels,
        currentBoard,
        currentLevel,
        winner,
        selectedPositionsInBoards,
        excludedTargetNumbers,
        isPlaying,
        stopMusic,
        startMusic,
      }}
    >
      {children}
    </BingoContext.Provider>
  );
};
