import { createContext, ReactNode } from "react";
import usePlayer from "../hooks/usePlayer";
import {
  BoardID,
  Bot,
  Level,
  Music,
  Pattern,
  SelectedNumbers,
  SelectedPositions,
  Winner,
} from "../types";

type BingoContextProps = {
  color: string;
  round: number;
  targets: number[];
  winnerPatters: Pattern[];
  targetText: string;
  boards: number;
  playerBoards: BoardID;
  handleIsSelectedNumber: (idBoard: number, position: number) => boolean;
  handleClickButton: (
    idBoard: number,
    number: number,
    position: number
  ) => void;
  selectedNumbers: SelectedNumbers;
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
  music: Music;
  bots: Bot[];
  unlockedLevels: number[];
  currentBoard: number;
  currentLevel: number;
  dataLevel: Level | undefined;
  winner: Winner;
  selectedPositions: SelectedPositions;
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
    targets,
    winnerPatters,
    targetText,
    boards,
    playerBoards,
    handleIsSelectedNumber,
    handleClickButton,
    selectedNumbers,
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
    selectedPositions,
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
        targets,
        winnerPatters,
        targetText,
        boards,
        playerBoards,
        handleIsSelectedNumber,
        handleClickButton,
        selectedNumbers,
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
        selectedPositions,
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
