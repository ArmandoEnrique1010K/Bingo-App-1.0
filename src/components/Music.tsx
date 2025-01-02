import { useEffect, useState } from 'react'
import * as Tone from 'tone'

export default function Music() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState<Tone.Player | null>(null);

    useEffect(() => {
        // Configura el reproductor y carga el archivo MP3
        const audioPlayer = new Tone.Player({
            // TODO: Modificar con AudioPad el archivo de audio para que se reproduzca en bucle sin interrupciones
            url: "/music/background.mp3",
            loop: true, // Activa el bucle
            autostart: false, // No comienza automáticamente
            volume: -15, // Reduce el volumen
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
