import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import StatusModalBase from "./StatusModalBase";
import { BingoContext } from "../../context/BingoContext";
import { Modal } from "../../types";
import { START_LEVEL_MODAL, VICTORY_MODAL } from "../../constants";

type StatusModalWithButtonProps = {
  modal: Modal;
  initialState: boolean;
  setStartModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

// COMPONENTE PARA MOSTRAR LA VENTANA MODAL CON HEADLESS UI
export default function StatusModalWithButton({
  modal: typeModal,
  initialState,
}: StatusModalWithButtonProps) {
  const [modal, setModal] = useState(typeModal);

  // Llama al contexto
  const {
    handleCheckWinnerPattern,
    setWinner,
    color,
    currentLevel,
    setCurrentLevel,
    startMusic,
    stopMusic,
  } = useContext(BingoContext);

  // Estado para ver la ventana modal
  const [isOpen, setIsOpen] = useState(initialState);

  const navigate = useNavigate();

  // Abrir ventana
  function open() {
    setIsOpen(true);
  }

  // Cerrar ventana
  function close() {
    setIsOpen(false);
  }

  // Reintentar el nivel actual
  function tryAgain() {
    navigate(`/level_${currentLevel}`);
    setWinner("none");
    // handleSetDefeat(false)
    close();
  }

  // Comprobar si el jugador gano
  function check() {
    if (handleCheckWinnerPattern() === true) {
      setWinner("player");
      open();
    } else {
      console.log("AUN NO HA GANADO EL JUGADOR");
    }
  }

  // Salir del juego
  function leaveGame() {
    close();
    navigate("/");
    setWinner("");
    stopMusic();
  }

  // Siguiente nivel
  function nextLevel() {
    close();
    navigate(`/level_${currentLevel + 1}`);
    setCurrentLevel((l) => l + 1);
    setWinner("none");
    // RARO, AL DESACTIVAR ESTO, SE EVITA EL PROBLEMA DE SALTEARSE DE RUTA
    // setStartModal!(true);
    // setStartModal!(true)
    // DEBE MOSTRAR LA VENTANA MODAL DEL NIVEL INICIAL
    setModal(START_LEVEL_MODAL);
    setIsOpen(true);
  }

  function closeAndPlayMusic() {
    close();
    startMusic();
    setTimeout(() => {
      setModal(VICTORY_MODAL);
    }, 2000);
  }
  return (
    <>
      {/* Ejecuta la acción de acuerdo al tipo de modal */}
      {typeModal.type === "victory" ? (
        <button
          onClick={check}
          className={`w-full bg-${color}-500 text-white font-semibold px-4 sm:py-3 py-2 rounded-lg shadow-black 
                    shadow-md transition duration-300 sm:text-base text-sm`}
        >
          Comprobar patrón
        </button>
      ) : typeModal.type === "exit" ? (
        <button
          onClick={open}
          className={`w-full bg-${color}-500 text-white font-semibold px-4 sm:py-3 py-2 rounded-lg shadow-black 
                    shadow-md transition duration-300 sm:text-base text-sm`}
        >
          Abandonar partida
        </button>
      ) : (
        ""
      )}
      <StatusModalBase
        modal={modal}
        open={open}
        close={close}
        isOpen={isOpen}
        tryAgain={tryAgain}
        leaveGame={leaveGame}
        nextLevel={nextLevel}
        closeAndPlayMusic={closeAndPlayMusic}
      />
    </>
  );
}
