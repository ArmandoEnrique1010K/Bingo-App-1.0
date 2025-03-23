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

    /////////////////////// RUTAS

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


    ////////////////////////////// NIVEL

    // Nivel actual
    const [currentLevel, setCurrentLevel] = useState<number>(0); // Numero
    const [dataLevel, setDataLevel] = useState<Level>(initialDataLevel) // Data

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


    const {
        level,
        targetText,
        boards,
        patterns,
        bots,
        color,
        music
    } = dataLevel || {};

    useEffect(() => {
        console.log(patterns)
    }, [currentLevel])


    // UNA SOLUCIÓN ES OBTENER DE LA URL EL NIVEL ACTUAL ('level_1', level_2, level_3), TOMAR ESE NUMERO Y GUARDARLO EN EL STATE DE CURRENTLEVEL
    useEffect(() => {
        const path = location.pathname;
        const levelMatch = path.match(/level_(\d+)/);
        if (levelMatch) {
            const levelNumber = parseInt(levelMatch[1], 10);
            setCurrentLevel(levelNumber);
            setWinner('none');
        }

        console.log(`EL ENDPOINT ACTUAL ES: ${location.pathname}`)
    }, []);

    // Tableros del jugador
    const [playerBoards, setPlayerBoards] = useState<BoardID>([]);

    // Numeros objetivos
    const [targetsNumbers, setTargetsNumbers] = useState<number[]>([]);

    // Patrones ganadores
    const [winnerPatters, setWinnerPatterns] = useState<Pattern[]>(dataLevel?.patterns || [[13]]);


    // Posiciones de los numeros seleccionados (se utiliza el type SelectedPositions)
    const [selectedPositionsInBoards, setSelectedPositionsInBoards] = useState<SelectedPositions>([]);

    // Números seleccionados
    const [selectedNumbersInBoards, setSelectedNumbersInBoards] = useState<SelectedNumbers>([]);

    // Turno o ronda (NO DEBE PASAR DE 20 RONDAS)
    const [round, setRound] = useState(0)

    // EL GANADOR
    const [winner, setWinner] = useState<Winner>('') // player, bot, none, end

    // NUMEROS EXCLUIDOS (YA QUE MOSTRARON EN LOS NUMEROS OBJETIVOS)
    const [excludedTargetNumbers, setExcludedTargetNumbers] = useState<number[]>([]);


    // // Efecto para cargar los posibles patrones y almacenarlo en el state de patterns
    // useEffect(() => {
    //     setWinnerPatterns(patterns);
    //     console.log('SE CARGO LOS PATRONES DE ESTE NIVEL: ' + dataLevel?.patterns)
    // }, [currentLevel])

    // Efecto para cargar los posibles patrones y almacenarlo en el state de patterns
    useEffect(() => {
        if (dataLevel?.patterns) {
            setWinnerPatterns(dataLevel.patterns);
            console.log('SE CARGARON LOS PATRONES DE ESTE NIVEL: ' + dataLevel.patterns);
        }
    }, [dataLevel]);
    // Usar useMemo de esta manera asegura que newBoards se recalculará solo cuando currentLevel.boards 
    // cambie, lo cual es una buena práctica para evitar renders innecesarios y mejorar el rendimiento.

    // Genera los tableros de acuerdo a la cantidad asignada en la propiedad boards del nivel actual

    // IMPRIME EL ENDPOINT ACTUAL
    // console.log(location.pathname)
    // console.log(location.pathname === `level_${level + 1}`)

    const newBoards = useMemo(() => {

        // SI NO HAY DERROTA O SI HAY VICTORIA Y PASO DE NIVEL

        // TODO: CORREGIR ESTO
        if (winner === 'none') {
            // Array sirve para crear un nuevo arreglo y from especifica la cantidad de elementos del arreglo
            // El metodo map, el primer argumento "_", representa cada elemento, el segundo "index" es el orden
            // del elemento
            console.log('SE GENERARON LOS NUEVOS TABLEROS: ' + boards)
            return Array.from({ length: boards }).map((_, index) => ({
                // Se evita el id igual a 0
                id: index + 1,
                board: generateBoard()
            }));

        } else {
            return []
        }

        // TODO: ¿CONVIENE COLOCAR defeat y victory EN EL ARREGLO DE DEPENDENCIAS?
    }, [winner, boards])

    // EFECTO SECUNDARIO


    // ¿PORQUE DEPENDE TAMBIEN DE LEVEL?
    useEffect(() => {
        if (winner === 'none') {
            console.log('AUN NO HAY GANADOR')
            resetLevel()
            console.log(newBoards)
        }

    }, [level, winner])
    // EN el arreglo de dependencias se coloca las variables, cuyo valor si cambia, ejecuta la función definida en el useEffect



    useEffect(() => {
        setExcludedTargetNumbers([])
        console.log(excludedTargetNumbers)
        console.log('EL NIVEL ACTUAL ES ' + currentLevel)
    }, [currentLevel])

    // Función para establecer los valores iniciales al empezar o reiniciar el nivel
    const resetLevel = () => {
        console.log('RESETLEVEL: Generando tableros y limpiando números objetivos');
        // Genera los tableros y se limpian los numeros objetivos
        setPlayerBoards(newBoards)
        setTargetsNumbers([]);

        // Por defecto se asigna el número del centro del tablero como un número seleccionado
        // tanto para las posiciones y los numeros seleccionados de cada uno de los tableros
        setSelectedPositionsInBoards(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index,
            positions: [13]
        })))

        setSelectedNumbersInBoards(Array.from({ length: boards }).map((_, index) => ({
            idBoard: index,
            numbers: [0]
        })))

        // Ronda 0
        setRound(0);
        // Aun no hay victoria ni derrota
        setWinner('none')
        // setVictory(false);
        // setDefeat(false);
        // Eliminar los numeros excluidos
        setExcludedTargetNumbers([])

        console.log('SE REESTABLECIO LOS DATOS INICIALES DEL NIVEL (RESETLEVEL)')
    }


    const handleChangeTargets = () => {

        // Si llega al turno maximo, se acaba la partida
        if (round === MAX_TURNS) {
            setTargetsNumbers([])
            // setDefeat(true);
            setWinner('end')
            console.log('SOBREPASO LA CANTIDAD DE TURNOS')
        } else {

            console.log('ESPERE 1 SEG. PARA MOSTRAR LOS NUMEROS OBJETIVOS')
            setRound(round + 1) // Incrementa la ronda en 1
            setTargetsNumbers([]); // Limpia los numeros objetivos

            // Espera 1 seg. para generar los numeros objetivos
            // Recordar que la función generateTargets necesita la cantidad de números que se generaran y los numeros excluidos
            setTimeout(() => {
                // setTargetsNumbers(generateTargets(DEFAULT_TARGETS, excludedTargetNumbers));
                // setExcludedTargetNumbers([...excludedTargetNumbers, ...targetsNumbers])

                const newTargets = generateTargets(DEFAULT_TARGETS, excludedTargetNumbers);
                setTargetsNumbers(newTargets);
                setExcludedTargetNumbers(prevExcluded => [...prevExcluded, ...newTargets]);
            }, 1000)

        }
    }

    // Efecto secundario para pruebas
    useEffect(() => {
        console.log("Numeros que ya fuerón utilizados previamente (excepto en este turno): " + excludedTargetNumbers)
    }, [excludedTargetNumbers])

    // Función para verificar que el numero ya se encuentre marcado en el tablero (devuelve un valor booleano)
    // TODO: MODIFICARLO
    const isSelectedNumber = (idBoard: number, number: number): boolean => {
        // La diferencia entre el metodo some e includes

        // El método some() verifica si al menos un elemento en el array cumple con una condición proporcionada 
        // por una función.Retorna true si encuentra un elemento que cumple con la condición, y false si no 
        // encuentra ninguno.

        // El método includes() verifica si un array contiene un valor específico. Retorna true si el array 
        // contiene el valor y false si no lo contiene.

        // Si en el state de selectedNumbersInBoards, algun elemento, segun el id recibido del tablero y si en 
        // el arreglo numbers se encuentra el número recibido
        if (selectedNumbersInBoards.some(board => board.idBoard === idBoard && board.numbers.includes(number))) {
            // console.log("Este número ya ha sido seleccionado")
            return true;
        }
        return false;
    }

    // Función para marcar un número seleccionado en el tablero, requiere el id, number y position
    const handleClickButton = (idBoard: number, number: number, position: number) => {
        // Si uno de los números seleccionados es igual al número objetivo, y si ese numero 
        // no se encuentra marcado en el tablero
        if (targetsNumbers.includes(number) && !isSelectedNumber(idBoard, number)) {
            // Se agrega la posición y el numero en los state de selectedPositionsInBoards y selectedNumbersInBoards
            // Para aquello es necesario crear una copia superficial del estado para agregar el nuevo
            // elemento, se itera sobre los tableros, se busca el tablero por su id y se añade al state
            setSelectedPositionsInBoards(prevState =>
                prevState.map(board =>
                    board.idBoard === idBoard
                        ? { ...board, positions: [...board.positions, position] }
                        : board
                )
            );
            setSelectedNumbersInBoards(prevState =>
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
        if (selectedPositionsInBoards.some(board => board.idBoard === idBoard && board.positions.some(pos => pos === position))) {
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
        for (const board of selectedPositionsInBoards) {
            // Verifica si al menos uno de los elementos en patterns cumple la condición especificada en la función flecha.
            // Dentro de some, se utiliza every para verificar si todos los elementos en el array p cumplen la condición 
            // especificada en la función flecha.
            // Dentro de la función de every se utiliza some para verificar si al menos uno de los elementos en 
            // board.positions es igual a n.
            console.log(winnerPatters);
            console.log(selectedPositionsInBoards)

            if (winnerPatters?.some(p => p.every(n => board.positions.some(
                position => position === n
            )))) {

                // Se establece victory en true
                // setVictory(true);
                // setDefeat(false);
                // console.log("El jugador ha ganado el nivel " + level);

                // Es necesario limpiar los numeros objetivos para evitar que el bot siga marcando
                setTargetsNumbers([]);

                // Desbloquea el siguiente nivel
                // 20 es el nivel final
                if (level !== 20) {
                    unlockLevel(level + 1);
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

    // Función para limpiar los numeros objetivos
    const clearTargets = () => {
        setTargetsNumbers([])
    }

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

    // TODO: ESTADO PARA MOSTRAR EL TABLERO O LOS TABLEROS DE LOS BOTS (SOLAMENTE EN DISEÑO RESPONSIVE)

    const [viewPlayerBoard, setViewPlayerBoard] = useState(true);

    // useEffect(() => {
    //     if (viewPlayerBoard === false) {
    //         console.log("Mostrando los tableros de los bots")
    //     } else {
    //         console.log("Mostrando el tablero del jugador")
    //     }
    // }, [viewPlayerBoard])

    const handleChangeViewPlayerBoard = () => {
        setViewPlayerBoard(!viewPlayerBoard)
    }

    /////////////////////////////////////////////////////////////////////
    // CONFIGURACIONES DE SONIDO Y AUDIO CON TONEJS


    // EN REPRODUCCIÓN DE AUDIO ?
    const [isPlaying, setIsPlaying] = useState(false);

    // Estado para el reproductor de audio
    // Se utiliza un constructor como valor por defecto.
    const [player, setPlayer] = useState<Tone.Player>(new Tone.Player());

    // Efecto secundario que se monta al cargar el componente
    useEffect(() => {
        // Configura el reproductor y carga el archivo MP3
        const audioPlayer = new Tone.Player({
            // url: "/music/tap_out.mp3", // Nombre del archivo de audio
            url: `/music/${dataLevel.music.name}.mp3`, // Nombre del archivo de audio
            loop: true, // Activa el bucle
            autostart: false, // No comienza automáticamente

            // TODO: EL VOLUMEN DEBE SER DINAMICO
            volume: dataLevel.music.volume, // Reduce el volumen
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
    }, [dataLevel]);

    // Función para iniciar la música de fondo
    const startMusic = async () => {
        // Utiliza un try-catch en funciones asincronas
        try {
            // Espera a que llame
            await Tone.start();
            console.log(`Ahora se esta reproduciendo: ${dataLevel.music.name}`)

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



    // useEffect(() => {
    //     startMusic()
    // }, [])


    return {
        color,
        round,
        targetsNumbers,
        winnerPatters,
        level,
        targetText,
        boards,
        playerBoards,
        handleIsSelectedNumber,
        handleClickButton,
        selectedNumbersInBoards,
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
        selectedPositionsInBoards,
        excludedTargetNumbers,


        // Contanstes, estados y funciones relacionados con sonido y audio
        isPlaying,
        stopMusic,
        startMusic

    }
}
