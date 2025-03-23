import { MusicalNoteIcon as MusicalNoteIconSolid } from "@heroicons/react/24/solid";
import { MusicalNoteIcon as MusicalNoteIconOutline } from "@heroicons/react/24/outline";
import { BingoContext } from "../../context/BingoContext";
import { useContext } from "react";

export default function MusicButton() {
  const { color, isPlaying, stopMusic, startMusic } = useContext(BingoContext);

  return (
    // Muestra un estilo y reproduce el audio dependiendo de isPlaying
    <button
      className={`sm:py-4 py-2 px-3 ${
        isPlaying ? `text-${color}-500` : `text-${color}-500`
      }`}
      onClick={isPlaying ? stopMusic : startMusic}
    >
      {/* Aplica un estilo dependiendo de la reproducción del audio */}
      {isPlaying ? (
        <MusicalNoteIconSolid className={`sm:w-7 w-5`} />
      ) : (
        <MusicalNoteIconOutline className={`sm:w-7 w-5`} />
      )}
    </button>
  );
}
