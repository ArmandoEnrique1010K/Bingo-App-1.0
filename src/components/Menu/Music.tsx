import { useEffect, useState } from 'react';
import * as Tone from 'tone'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'

// Este componente es un botón para reproducir la musica de fondo
export default function Music() {

    const [isPlaying, setIsPlaying] = useState(false);

    // Estado para el reproductor de audio
    // Se utiliza un constructor como valor por defecto.
    const [player, setPlayer] = useState<Tone.Player>(new Tone.Player());

    // Efecto secundario que se monta al cargar el componente
    useEffect(() => {
        // Configura el reproductor y carga el archivo MP3
        const audioPlayer = new Tone.Player({
            url: "/music/background.mp3", // Nombre del archivo de audio
            loop: true, // Activa el bucle
            autostart: false, // No comienza automáticamente
            volume: -15, // Reduce el volumen
        }).toDestination(); // Conecta el audio a la salida principal

        // Actualiza el estado de player
        setPlayer(audioPlayer);

        // Cargar los buffers
        // Tone.loaded().then(() => {
        //     console.log("Todos los archivos de audio están listos.");
        // });

        // Limpieza al desmontar el componente
        return () => {
            audioPlayer.stop();
            audioPlayer.dispose();
        };
    }, []);

    // Función para iniciar la música de fondo
    const startMusic = async () => {
        // Utiliza un try-catch en funciones asincronas
        try {
            // Espera a que llame
            await Tone.start();

            // Reproduce el audio si el estado de player esta listo
            if (player && player.loaded) {
                player.start(); // Reproduce el audio
                setIsPlaying(true); // Actualiza el state de isPlaying
                // console.log('El audio está en reproducción');
            }

        } catch (error) {
            // Muestra un mensaje de error
            // console.error('Audio buffer is not loaded yet' + error);
            console.error('No se pudo cargar el archivo de audio' + error);
        }
    };

    // Función para detener la música de fondo
    const stopMusic = () => {
        player?.stop(); // Detiene la reproducción
        setIsPlaying(false);
    };

    return (
        <>
            {/* Este botón se mostrara al renderizar este componente */}
            {/* Si isPlaying es true, detiene la canción, de lo contrario lo reproduce */}
            <button className={`sm:py-4 py-2 px-3 ${isPlaying
                ? "text-cyan-500 hover:text-cyan-600 active:text-cyan-700"
                : "text-cyan-800 hover:text-cyan-600 active:text-cyan-700"}`}
                onClick={isPlaying ? stopMusic : startMusic}>
                {/* Aplica un estilo dependiendo de la reproducción del audio */}
                <MusicalNoteIcon className={`sm:w-7 w-5`}
                // aria-hidden="true"
                />
            </button>
        </>
    );
}
