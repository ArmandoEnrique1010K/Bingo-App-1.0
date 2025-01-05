import { useEffect, useState } from 'react';
import * as Tone from 'tone'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'

export default function Music() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [player, setPlayer] = useState<Tone.Player | null>(null);

    // Lista de canciones
    const trackList = [
        "/music/track1.mp3",
        "/music/track2.mp3",
        "/music/track3.mp3",
    ];


    useEffect(() => {
        // Configura el reproductor y carga el archivo MP3
        const audioPlayer = new Tone.Player({
            // TODO: Agregar más archivos de audio
            url: "/music/background.mp3", // Nombre del archivo de audio
            loop: true, // Activa el bucle
            autostart: false, // No comienza automáticamente
            volume: -15, // Reduce el volumen
            // background hard: -8 / normal: -15
        }).toDestination(); // Conecta el audio a la salida principal

        setPlayer(audioPlayer);

        // Cargar los buffers
        Tone.loaded().then(() => {
            console.log("Todos los archivos de audio están listos.");
        });


        // Limpieza al desmontar el componente
        return () => {
            audioPlayer.stop();
            audioPlayer.dispose();
        };
    }, []);

    // Función para iniciar la música
    const startMusic = async () => {
        await Tone.start();
        if (player && player.loaded) {
            player.start();
            setIsPlaying(true);
            console.log('El audio está en reproducción');
        } else {
            console.error('Audio buffer is not loaded yet');
        }
    };

    // Función para detener la música
    const stopMusic = () => {
        player?.stop(); // Detiene la reproducción
        setIsPlaying(false);
    };

    return (
        <div>
            <button onClick={isPlaying ? stopMusic : startMusic}>
                {/* {isPlaying ? "Stop Music" : "Play Music"} */}
                <MusicalNoteIcon className='h-6 w-6 text-blue-300' aria-hidden="true" />

            </button>
        </div>
    );
}
