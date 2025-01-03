import { useEffect, useState } from 'react'
import * as Tone from 'tone'

export default function Music() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState<Tone.Player | null>(null);

    useEffect(() => {
        // Configura el reproductor y carga el archivo MP3
        const audioPlayer = new Tone.Player({
            // TODO: Modificar con AudioPad el archivo de audio para que se reproduzca en bucle sin interrupciones
            url: "/music/background_hard.mp3",
            loop: true, // Activa el bucle
            autostart: false, // No comienza automáticamente
            volume: -8, // Reduce el volumen
            // background hard: -8 / normal: -15
        }).toDestination(); // Conecta el audio a la salida principal

        setPlayer(audioPlayer);

        // Limpieza al desmontar el componente
        return () => {
            audioPlayer.stop();
            audioPlayer.dispose();
        };
    }, []);

    // Función para iniciar la música
    const startMusic = async () => {
        await Tone.start(); // Desbloquea el contexto de audio
        player?.start(); // Inicia la reproducción
        setIsPlaying(true);
    };

    // const startMusic = async () => {
    //     await Tone.start();
    //     if (player && player.loaded) {
    //         player.start();
    //         setIsPlaying(true);
    //     } else {
    //         console.error('Audio buffer is not loaded yet');
    //     }
    // };
    // Función para detener la música
    const stopMusic = () => {
        player?.stop(); // Detiene la reproducción
        setIsPlaying(false);
    };

    return (
        <div>
            <button onClick={isPlaying ? stopMusic : startMusic}>
                {isPlaying ? "Stop Music" : "Play Music"}
            </button>
        </div>
    );
}
