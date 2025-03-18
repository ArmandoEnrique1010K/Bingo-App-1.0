import { MusicalNoteIcon as  MusicalNoteIconSolid} from '@heroicons/react/24/solid'
import { MusicalNoteIcon as MusicalNoteIconOutline} from '@heroicons/react/24/outline'
import { BingoContext } from '../../context/BingoContext';
import { useContext } from 'react';


// Este componente es un botón para reproducir la musica de fondo
export default function Music() {

 
    const {color, isPlaying, stopMusic, startMusic} = useContext(BingoContext)

    return (
        <>
            {/* Este botón se mostrara al renderizar este componente */}
            {/* Si isPlaying es true, detiene la canción, de lo contrario lo reproduce */}

            {/* TODO: ELIMINAR PSEUDOCLASES, NO FUNCIONAN SI SON DINAMICAS */}
            <button className={`sm:py-4 py-2 px-3 ${isPlaying
                ? `text-${color}-500 hover:text-${color}-600 active:text-${color}-700` 
                : `text-${color}-500 hover:text-${color}-600 active:text-${color}-700` 
                }`}
                onClick={isPlaying ? stopMusic : startMusic}>
                {/* Aplica un estilo dependiendo de la reproducción del audio */}
                {
                    isPlaying ?                 <MusicalNoteIconSolid className={`sm:w-7 w-5`}
                    // aria-hidden="true"
                    /> :                 <MusicalNoteIconOutline className={`sm:w-7 w-5`}
                    // aria-hidden="true"
                    />
                }

            </button>
        </>
    );
}
