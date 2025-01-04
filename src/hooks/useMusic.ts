import { useEffect, useState } from "react";
import * as Tone from 'tone'

export const useMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [player, setPlayer] = useState<Tone.Player | null>(null);
    const [nameMusic, setNameMusic] = useState('');
    const [volume, setVolume] = useState(0)

    // GENERADO CON COPILOT
    const unlockAudioContext = (audioCtx) => {
        if (audioCtx.state !== 'suspended') return;
        const events = ['touchstart', 'touchend', 'mousedown', 'keydown'];
        events.forEach(event => document.body.addEventListener(event, unlock, false));
        function unlock() {
            audioCtx.resume().then(clean);
        }
        function clean() {
            events.forEach(event => document.body.removeEventListener(event, unlock));
        }
    };


    useEffect(() => {
        // Configura el reproductor y carga el archivo MP3
        const audioPlayer = new Tone.Player({
            // TODO: Modificar con AudioPad el archivo de audio para que se reproduzca en bucle sin interrupciones
            url: `/music/${nameMusic}.mp3`,
            loop: true, // Activa el bucle
            autostart: false, // No comienza automáticamente
            volume: volume, // Reduce el volumen
            // background hard: -8 / normal: -15

            // Esto es una función onload, debido a la ultima actualización de tonejs aqui se define el codigo que realizara
            onload: () => {
                console.log('Audio loaded successfully');
                setPlayer(audioPlayer);
            }
        }).toDestination(); // Conecta el audio a la salida principal

        // audioPlayer.load = () => {
        //     console.log('Audio loaded successfully');
        //     setPlayer(audioPlayer);
        // };

        // Desbloquea el contexto de audio
        unlockAudioContext(Tone.getContext);

        // Limpieza al desmontar el componente
        return () => {
            audioPlayer.stop();
            audioPlayer.dispose();
        };
    }, [nameMusic, volume]);

    // Función para iniciar la música
    // const startMusic = async () => {
    //     await Tone.start(); // Desbloquea el contexto de audio
    //     player?.start(); // Inicia la reproducción
    //     setIsPlaying(true);
    // };


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
    return {
        nameMusic,
        volume,
        isPlaying,
        startMusic,
        stopMusic,
        setNameMusic,
        setVolume
    }
}