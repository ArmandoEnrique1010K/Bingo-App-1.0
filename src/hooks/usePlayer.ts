import { useEffect, useMemo, useState } from "react";
import { levels } from "../data/levels";
import { BoardID, Level, Pattern, SelectedNumbers, SelectedPositions, Winner } from "../types";
import { generateBoard } from "../utils/generateBoard";
import { generateTargets } from "../utils/generateTargets";
import { DEFAULT_TARGETS, MAX_TURNS, TAP } from "../constants";
import { useLocation } from "react-router";
import * as Tone from 'tone'

const initialDataLevel = {
    level: 0,
    targetText: '',
    boards: 0,
    patterns: [],
    bots: [
        {
            name: 'test',
            interval: 1000,
            boards: 1,
        }

    ],
    color: 'blue',
    music: TAP,
}

export default function usePlayer() {

    /////////////////////// 
    // RUTAS

    const location = useLocation();

    // Obtiene los niveles desbloqueados desde localStorage o lo inicializa con el nivel 1
    const initialLevels = (): number[] => {
        const localStorageLevels = localStorage.getItem('unlockedLevels')
        return localStorageLevels ? JSON.parse(localStorageLevels) : [1]
    }

    const [unlockedLevels, setUnlockedLevels] = useState<number[]>(initialLevels)

    // Desbloquea un nivel si no se encuentra desbloqueado
    const unlockLevel = (level: number) => {
        if (!unlockedLevels.includes(level)) {
            setUnlockedLevels([...unlockedLevels, level])
        }
    }

    ////////////////////////////// 
    // NIVEL

    // Nivel actual
    const [currentLevel, setCurrentLevel] = useState<number>(0);

    // Datos del nivel actual
    const [dataLevel, setDataLevel] = useState<Level>(initialDataLevel)

    const {
        targetText,
        boards,
        patterns,
        bots,
        color,
        music
    } = dataLevel || {};

    // Tableros del jugador
    const [playerBoards, setPlayerBoards] = useState<BoardID>([]);

    // Numeros objetivos
    const [targets, setTargets] = useState<number[]>([]);

    // Patrones ganadores
    const [winnerPatters, setWinnerPatterns] = useState<Pattern[]>(patterns || [[]]);

    // Posiciones seleccionadas
    const [selectedPositions, setSelectedPositions] = useState<SelectedPositions>([]);

    // Números seleccionados
    const [selectedNumbers, setSelectedNumber] = useState<SelectedNumbers>([]);

    // Ronda
    const [round, setRound] = useState(0)

    // Ganador: player, bot, none, end
    const [winner, setWinner] = useState<Winner>('')

    // Números excluidos (ya que se mostraron en los números objetivos)
    const [excludedTargetNumbers, setExcludedTargetNumbers] = useState<number[]>([]);

    // Vista en diseño responsive
    const [viewPlayerBoard, setViewPlayerBoard] = useState(true);

    // Obtiene los datos del nivel actual usando el metodo find.
    useEffect(() => {
        const result = levels.find(l => l.level === currentLevel);
        if (result) {
            setDataLevel(result);
        } else {
            setDataLevel(initialDataLevel)
        }

        console.log('EL NIVEL ACTUAL ES: ' + result?.level)

    }, [currentLevel]);

    // UNA SOLUCIÓN ES OBTENER DE LA URL EL NIVEL ACTUAL ('level_1', level_2, level_3), TOMAR ESE NUMERO Y GUARDARLO EN EL STATE DE CURRENTLEVEL
    useEffect(() => {
        const path = location.pathname;
        const levelMatch = path.match(/level_(\d+)/);
        if (levelMatch) {
            console.log('SE ENCONTRO EL NIVEL: ' + location.pathname)
            const levelNumber = parseInt(levelMatch[1], 10);
            setCurrentLevel(levelNumber);
            // setDataLevel(levels.find(l => l.level === currentLevel)?.level)
            setWinner('none');

        }
    }, [location.pathname]);


    // MEJORAR ESTO
    useEffect(() => {
        if (patterns) {
            setWinnerPatterns(patterns);
        }
    }, [dataLevel]);

    // Usar useMemo de esta manera asegura que newBoards se recalcule solo cuando currentLevel.level o winner cambie, lo cual es una buena práctica para evitar renders innecesarios y mejorar el rendimiento.
    const newBoards = useMemo(() => {
        if (winner === 'none') {
            return Array.from({ length: boards }).map((_, index) => ({
                id: index + 1,
                board: generateBoard()
            }));
        } else {
            return []
        }
    }, [winner, dataLevel.level])

    // EFECTO SECUNDARIO


    // const newBoards = Array.from({ length: boards }).map((_, index) => ({
    //     id: index + 1,
    //     board: generateBoard()
    // }));


    // useEffect(() => {
    //     setExcludedTargetNumbers([])
    //     console.log(excludedTargetNumbers)
    //     console.log('EL NIVEL ACTUAL ES ' + currentLevel)
    // }, [currentLevel])

    // Función para establecer los valores iniciales al empezar o reiniciar el nivel
    const resetLevel = (): void => {
        console.log('RESETLEVEL: Generando tableros y limpiando números objetivos');
        setPlayerBoards(newBoards)
        console.log(newBoards)
        setTargets([]);
        setRound(0);
        setWinner('none')
        setExcludedTargetNumbers([])

        // Por defecto se asigna el número del centro del tablero como un número seleccionado
        // tanto para las posiciones como para los números seleccionados de cada uno de los tableros
        setSelectedPositions(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index,
            positions: [13]
        })))

        setSelectedNumber(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index,
            numbers: [0]
        })))
    }

    // ...si no hay ningun ganador
    useEffect(() => {
        if (winner === 'none') {
            resetLevel()
        }

    }, [winner])


    // Cambia los numeros objetivos
    const handleChangeTargets = (): void => {
        // Si llega al turno maximo, se acaba la partida
        if (round === MAX_TURNS) {
            setTargets([])
            setWinner('end')
            console.log('SOBREPASO LA CANTIDAD DE TURNOS')
        } else {
            console.log('ESPERE 1 SEG. PARA MOSTRAR LOS NUMEROS OBJETIVOS')
            setRound((prevRound) => prevRound + 1);
            setTargets([]);

            // Espera 1 seg. para generar 3 números objetivos (excluyendo los números que fuerón generados)
            setTimeout(() => {
                const newTargets = generateTargets(DEFAULT_TARGETS, excludedTargetNumbers);
                setTargets(newTargets);
                setExcludedTargetNumbers((prevExcluded) => [...prevExcluded, ...newTargets]);
            }, 1000);

        }
    }

    // Efecto secundario para pruebas
    // useEffect(() => {
    //     console.log("Numeros que ya fuerón utilizados previamente (excepto en este turno): " + excludedTargetNumbers)
    // }, [excludedTargetNumbers])

    // Función para verificar que el numero ya se encuentre marcado en el tablero (devuelve un valor booleano)
    // TODO: MODIFICARLO
    const isSelectedNumber = (idBoard: number, number: number): boolean => {
        // La diferencia entre el metodo some e includes

        // El método some() verifica si al menos un elemento en el array cumple con una condición proporcionada 
        // por una función.Retorna true si encuentra un elemento que cumple con la condición, y false si no 
        // encuentra ninguno.

        // El método includes() verifica si un array contiene un valor específico. Retorna true si el array 
        // contiene el valor y false si no lo contiene.

        // Si en el state de selectedNumbers, algun elemento, segun el id recibido del tablero y si en 
        // el arreglo numbers se encuentra el número recibido
        if (selectedNumbers.some(board => board.idBoard === idBoard && board.numbers.includes(number))) {
            // console.log("Este número ya ha sido seleccionado")
            return true;
        }
        return false;
    }

    // Función para marcar un número seleccionado en el tablero, requiere el id, number y position
    const handleClickButton = (idBoard: number, number: number, position: number) => {
        // Si uno de los números seleccionados es igual al número objetivo, y si ese numero 
        // no se encuentra marcado en el tablero
        if (targets.includes(number) && !isSelectedNumber(idBoard, number)) {
            // Se agrega la posición y el numero en los state de selectedPositions y selectedNumbers
            // Para aquello es necesario crear una copia superficial del estado para agregar el nuevo
            // elemento, se itera sobre los tableros, se busca el tablero por su id y se añade al state
            setSelectedPositions(prevState =>
                prevState.map(board =>
                    board.idBoard === idBoard
                        ? { ...board, positions: [...board.positions, position] }
                        : board
                )
            );
            setSelectedNumber(prevState =>
                prevState.map(board =>
                    board.idBoard === idBoard
                        ? { ...board, numbers: [...board.numbers, number] }
                        : board
                )
            );
            // console.log("El usuario selecciono el numero: " + number + "en el tablero " + idBoard)
        }
    }


    // TODO: MEJORAR EL PERFORMANCE DE ESTA FUNCIÓN
    const handleIsSelectedNumber = (idBoard: number, position: number) => {
        if (selectedPositions.some(board => board.idBoard === idBoard && board.positions.some(pos => pos === position))) {
            // console.log("TRUE");
            return true;
        }
        // console.log("FALSE");
        return false;
    }



    // Función para verificar si es un número seleccionado según el tablero y su posición del número

    // Función para verificar si el usuario ha completado un patrón ganador
    const handleCheckWinnerPattern = () => {

        // Itera sobre las posiciones seleccionadas de cada uno de los tableros
        for (const board of selectedPositions) {
            // Verifica si al menos uno de los elementos en patterns cumple la condición especificada en la función flecha.
            // Dentro de some, se utiliza every para verificar si todos los elementos en el array p cumplen la condición 
            // especificada en la función flecha.
            // Dentro de la función de every se utiliza some para verificar si al menos uno de los elementos en 
            // board.positions es igual a n.
            console.log(winnerPatters);
            console.log(selectedPositions)

            if (winnerPatters?.some(p => p.every(n => board.positions.some(
                position => position === n
            )))) {

                // Se establece victory en true
                // setVictory(true);
                // setDefeat(false);
                // console.log("El jugador ha ganado el nivel " + level);

                // Es necesario limpiar los numeros objetivos para evitar que el bot siga marcando
                setTargets([]);

                // Desbloquea el siguiente nivel
                // 20 es el nivel final
                if (currentLevel !== 20) {
                    unlockLevel(currentLevel + 1);
                }

                // Retorna un true para confirmar el patrón ganador
                return true;
            }
        }

        // De lo contrario false
        // console.log("Sigue intentando");
        return false;
    };

    // Funciones para establecer los states de defeat y victory
    // const handleSetDefeat = (boolean: boolean) => {
    //     setDefeat(boolean)
    // }

    // const handleSetVictory = (boolean: boolean) => {
    //     setVictory(boolean)
    // }

    // Limpia los números objetivos
    const clearTargets = (): void => {
        setTargets([]);
    };

    // READY: ESTADO PARA MOSTRAR SOLAMENTE UN TABLERO
    // const actualBoard = newBoards.find(b => b.id === 1)?.id || 5;

    const [currentBoard, setCurrentBoard] = useState(() =>
        newBoards.find(b => b.id === 1)?.id || 1
    );

    const verifyExistBoard = (id: number) => newBoards.some(b => b.id === id);

    const handleChangeBoard = (direction: "prev" | "next") => {
        const newBoardId = direction === "prev" ? currentBoard - 1 : currentBoard + 1;
        if (verifyExistBoard(newBoardId)) {
            setCurrentBoard(newBoardId);
            // console.log("Se muestra el tablero " + newBoardId)
        }
        // else {
        //     console.log("No existe otro tablero");
        // }
    };

    const isAtFirstBoard = currentBoard === Math.min(...newBoards.map(b => b.id));
    const isAtLastBoard = currentBoard === Math.max(...newBoards.map(b => b.id));
    // Contenido HTML devuelto por el componente
    // Efecto de gradiente en tailwindcss
    // bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700


    // Cambia la vista en diseño responsive
    const handleChangeViewPlayerBoard = () => {
        setViewPlayerBoard(!viewPlayerBoard);
    };
    /////////////////////////////////////////////////////////////////////
    // CONFIGURACIONES DE SONIDO Y AUDIO CON TONEJS

    // Estado para reproducir el audio
    const [isPlaying, setIsPlaying] = useState(false);

    // Estado para almacenar el reproductor de audio
    const [player, setPlayer] = useState<Tone.Player>(new Tone.Player());

    useEffect(() => {
        // Inicializa el reproductor de audio
        const audioPlayer = new Tone.Player({
            url: `/music/${dataLevel.music.name}.mp3`,
            loop: true,
            autostart: false,
            volume: dataLevel.music.volume,
        }).toDestination();

        // Actualiza el estado de player
        setPlayer(audioPlayer);

        // Limpieza del reproductor al desmontar el componente
        return () => {
            audioPlayer.stop();
            audioPlayer.dispose();
        };
    }, [dataLevel]);

    // Inicia la música si el audio está cargado
    const startMusic = async () => {
        try {
            await Tone.start();

            if (player?.loaded) {
                player.start();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error("No se pudo cargar el archivo de audio" + error);
        }
    };

    // Detiene la música
    const stopMusic = () => {
        player?.stop();
        setIsPlaying(false);
    };

    return {
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
        // Contanstes, estados y funciones relacionados con sonido y audio
        isPlaying,
        stopMusic,
        startMusic
    }
}
