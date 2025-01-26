import { useEffect, useMemo, useState } from "react";
import { levels } from "../data/levels";
import { generateTargets } from "../utils/generateTargets";
import { generateBoard } from "../utils/generateBoard";
import { BoardID, Pattern, SelectedNumbers, SelectedPositions } from "../types";
import TargetsNumbers from "../components/Target/TargetNumbers";
import BoardNumbers from "../components/Player/BoardNumbers";
import TargetPattern from "../components/Target/TargetPattern";
import Bot from "../components/Bot/Bot";
import LeaveModal from "../components/Modal/LeaveModal";
import DefeatModal from "../components/Modal/DefeatModal";
import VictoryModal from "../components/Modal/VictoryModal";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

type LevelPageProps = {
    level: number
    unlockLevel: (number: number) => void
}

export default function LevelPage({ level, unlockLevel }: LevelPageProps) {

    // Obtiene los datos del nivel actual usando el metodo find.
    // Se utiliza levels[0], en el caso de que sea undefined (probabilidad casi 
    // nula de que suceda eso)
    const currentLevel = levels.find(l => l.level === level) || levels[0];

    // Variables de estado

    // Tableros del jugador
    // Recuerda que el type Board es:
    // type Board = {
    //     position: number;
    //     number: number;
    // }[]
    const [board, setBoard] = useState<BoardID>([]);

    // Numeros objetivos
    const [targets, setTargets] = useState<number[]>([]);

    // Patrones ganadores
    const [patterns, setPatterns] = useState<Pattern[]>([]);


    // Posiciones de los numeros seleccionados (se utiliza el type SelectedPositions)
    // Coloca el cursor sobre el type para ver el tipo de dato que espera
    const [selectedPositions, setSelectedPositions] = useState<SelectedPositions>([]);

    // Números seleccionados
    const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumbers>([]);

    // Fin del juego si el jugador gano
    const [victory, setVictory] = useState(false)

    // Fin del juego si el bot gana
    const [defeat, setDefeat] = useState(false);

    // Turno o ronda
    const [round, setRound] = useState(0)


    // Efecto para cargar los posibles patrones y almacenarlo en el state de patterns
    useEffect(() => {
        const patterns = currentLevel.patterns;
        setPatterns(patterns);
    }, [currentLevel])


    // Usar useMemo de esta manera asegura que newBoards se recalculará solo cuando currentLevel.boards 
    // cambie, lo cual es una buena práctica para evitar renders innecesarios y mejorar el rendimiento.

    // Genera los tableros de acuerdo a la cantidad asignada en la propiedad boards del nivel actual
    const newBoards = useMemo(() => {
        // Array sirve para crear un nuevo arreglo y from especifica la cantidad de elementos del arreglo
        // El metodo map, el primer argumento "_", representa cada elemento, el segundo "index" es el orden
        // del elemento
        return Array.from({ length: currentLevel.boards }).map((_, index) => ({
            // Se evita el id igual a 0
            id: index + 1,
            board: generateBoard()
        }));
    }, [currentLevel.boards])


    // Previamente se ha utilizado el siguiente codigo
    // const newBoards = Array.from({ length: currentLevel.boards }).map((_, index) => ({
    //     // Se evita el id igual a 0
    //     id: index + 1,
    //     board: generateBoard()
    // }));

    // console.log((newBoards))

    // Función para establecer los valores iniciales al empezar o reiniciar el nivel
    const resetLevel = () => {
        // Genera los tableros y los números objetivos se establecen en 0
        setBoard(newBoards)
        setTargets([]);

        // Por defecto se asigna el número del centro del tablero como un número seleccionado
        // tanto para las posiciones y los numeros seleccionados de cada uno de los tableros
        setSelectedPositions(Array.from({ length: currentLevel.boards }).map((_, index) => ({
            idBoard: index,
            positions: [13]
        })))

        setSelectedNumbers(Array.from({ length: currentLevel.boards }).map((_, index) => ({
            idBoard: index,
            numbers: [0]
        })))

        // Ronda 0
        setRound(0);
        // Aun no hay victoria ni derrota
        setVictory(false);
        setDefeat(false)
    }

    // Efecto secundario para cargar el nivel
    useEffect(() => {
        resetLevel()
    }, [level]);

    // Cuando el jugador pierde, se tiene que volver a reiniciar el nivel
    // Nota: El state de defeat debe volver a ser false
    useEffect(() => {
        if (defeat === false) {
            resetLevel()
        }
    }, [defeat]);

    // Función para cambiar los numeros objetivos
    const handleChangeTargets = () => {
        setRound(round + 1) // Incrementa la ronda en 1
        setTargets([]); // Limpia los numeros objetivos

        // Espera 1 seg. para generar los numeros objetivos
        // Recordar que la función generateTargets necesita la cantidad de números que se generaran
        setTimeout(() => {
            setTargets(generateTargets(currentLevel.targetQuantity));
        }, 1000)
    }

    // Función para verificar que el numero ya se encuentre marcado en el tablero (devuelve un valor booleano)
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
            setSelectedNumbers(prevState =>
                prevState.map(board =>
                    board.idBoard === idBoard
                        ? { ...board, numbers: [...board.numbers, number] }
                        : board
                )
            );
            // console.log("El usuario selecciono el numero: " + number + "en el tablero " + idBoard)
        }
    }

    // Función para verificar si es un número seleccionado según el tablero y su posición del número
    const handleIsSelectedNumber = (idBoard: number, position: number) => {
        // Si en algun tablero por el id recibido y si en algunas de las posiciones, se encuentra la posición recibida
        if (selectedPositions.some(board => board.idBoard === idBoard && board.positions.some(pos => pos === position))) {
            // Devuelve true
            return true;
        }
        // De lo contrario, false
        return false;
    }

    // Función para verificar si el usuario ha completado un patrón ganador
    const handleCheckWinnerPattern = () => {

        // Itera sobre las posiciones seleccionadas de cada uno de los tableros
        for (const board of selectedPositions) {
            // Verifica si al menos uno de los elementos en patterns cumple la condición especificada en la función flecha.
            // Dentro de some, se utiliza every para verificar si todos los elementos en el array p cumplen la condición 
            // especificada en la función flecha.
            // Dentro de la función de every se utiliza some para verificar si al menos uno de los elementos en 
            // board.positions es igual a n.
            if (patterns?.some(p => p.every(n => board.positions.some(
                position => position === n
            )))) {

                // Se establece victory en true
                setVictory(true);
                setDefeat(false);

                // console.log("El jugador ha ganado el nivel " + level);

                // Es necesario limpiar los numeros objetivos para evitar que el bot siga marcando
                setTargets([]);

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
    const handleSetDefeat = (boolean: boolean) => {
        setDefeat(boolean)
    }

    const handleSetVictory = (boolean: boolean) => {
        setVictory(boolean)
    }

    // Función para limpiar los numeros objetivos
    const handleCleanTargets = () => {
        setTargets([])
    }

    // READY: ESTADO PARA MOSTRAR SOLAMENTE UN TABLERO
    // const actualBoard = newBoards.find(b => b.id === 1)?.id || 5;

    const [currentBoard, setCurrentBoard] = useState(() =>
        newBoards.find(b => b.id === 1)?.id || 5
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

    // READY: AÑADIR BOTONES PARA CAMBIAR DE TABLERO
    // TODO: SEPARAR LOS BOTS EN OTRO COMPONENTE PARA QUE EL USUARIO PUEDA VER EL TABLERO Y LOS BOTS POR SEPARADO EN UN DISPOSITIVO MOVIL
    return (
        <>
            <div className="text-white m-auto">
                <div className="container mx-auto py-4 flex sm:flex-row flex-col items-start sm:gap-6 gap-4 justify-center">
                    <div className="flex flex-row sm:flex-col sm:w-96 w-full justify-center sm:m-0 sm:gap-0 gap-3 mx-auto">
                        <div className=" flex flex-col min-w-20 sm:ml-0 ml-2 sm:w-auto w-full">
                            <div className="mb-4 text-center bg-gray-700 rounded-xl p-1">
                                <h1 className="sm:text-2xl text-xl font-bold mb-2">Nivel {level}</h1>
                                <p className="sm:text-lg text-sm">Ronda: <span className="font-semibold text-cyan-400">{round}</span></p>
                            </div>

                            {/* Componente de los numeros objetivos */}
                            {/* TODO: MEJORAR LA LOGICA DE TARGETS, POR UN MILISEGUNDO SE VE QUE SE MUESTRA UN BOTON??? */}
                            <TargetsNumbers round={round} targets={targets} handleChangeTargets={handleChangeTargets} />
                        </div>

                        {/* Componente del patrón ganador */}
                        <TargetPattern level={currentLevel.level} text={currentLevel.targetText} />

                    </div>

                    {/* Botones para comprobar el patron ganador y salir del juego */}

                    {
                        viewPlayerBoard === true && (
                            <div className="flex flex-col gap-4 sm:mx-0 mx-auto">
                                <div className="flex flex-row mx-auto border-4 border-gray-700 rounded-xl">
                                    {
                                        // Renderiza BoardNumbers por la cantidad de boards en currentLevel
                                        Array.from({ length: currentLevel.boards }).map((_, index) => (

                                            // TODO: BUSCAR EL TABLERO POR EL INDEX
                                            // index + 1 <-- obtiene el id


                                            currentBoard === index + 1 && (
                                                <BoardNumbers
                                                    key={index}
                                                    idBoard={index}
                                                    // Busca el tablero por su id y lo pasa como propiedad
                                                    board={board.find(b => b.id === index + 1)?.board || []}
                                                    handleIsSelectedNumber={handleIsSelectedNumber}
                                                    handleClickButton={handleClickButton}
                                                />

                                            )

                                        ))
                                    }
                                </div>
                                <div className="bg-gray-700 flex flex-col px-3 sm:mx-0 mx-3 gap-3 rounded-xl py-4">
                                    <div className="flex flex-row justify-between gap-4">
                                        <button
                                            className={`
                                                
                                                px-4 sm:py-3 py-2 font-semibold rounded-lg shadow-md 
            transition duration-300  w-full  shadow-black 
            ${isAtFirstBoard ? "bg-gray-500 text-white cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
                                            onClick={() => handleChangeBoard("prev")}
                                            disabled={isAtFirstBoard}
                                        >
                                            <ArrowLeftIcon className='
                                    h-6 mx-auto' />
                                        </button>

                                        <button
                                            className={`px-4 
                                             sm:py-3 py-2 font-semibold rounded-lg shadow-md 
            transition duration-300 w-full  sm:text-base text-sm shadow-black 
            ${isAtLastBoard ? "bg-gray-500 text-white cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
                                            onClick={() => handleChangeBoard("next")}
                                            disabled={isAtLastBoard}
                                        >
                                            <ArrowRightIcon className='h-6 mx-auto' />

                                        </button>

                                    </div>
                                    <div className="flex flex-row justify-center gap-4">
                                        <VictoryModal level={level} handleCheckWinnerPattern={handleCheckWinnerPattern} />
                                        <LeaveModal />

                                    </div>
                                </div>

                                {/* <div className="flex flex-row justify-center gap-4">
                    </div> */}
                                {/* <div className="bg-gray-700 flex flex-row px-3 justify-between gap-3 items-center rounded-xl py-4">



                    </div>
 */}
                            </div>

                        )
                    }


                </div>

                {/* Boton para alternar entre la vista del tablero del jugador y los bots */}
                {/* Diseño de cuadricula en tailwind: grid grid-cols-4 grid-rows-2 */}

                {/* TODO: UTILIZAR LA CLASE hidden PODRIA SER UNA OPCION VIABLE??? */}
                {
                    (
                        <div className={`sm:flex sm:flex-row grid  grid-cols-2 items-center justify-center  sm:mx-auto sm:mt-4 mt-0 mx-2 gap-3 mb-4 ${viewPlayerBoard === false ? "" : "hidden"}`}>
                            {
                                // SECCION PARA AGRUPAR TODOS LOS BOTS
                                currentLevel.bots.map((bot, index) => (
                                    <Bot key={bot.name} currentLevel={currentLevel} targets={targets} interval={bot.interval} name={bot.name}
                                        patterns={patterns} boards={bot.boards}
                                        // Obten los tableros del siguiente bot en la lista, de lo contrario un undefined

                                        nextBoards={
                                            bot.boards
                                                ? currentLevel.bots[index + 1]?.boards
                                                : 0
                                        } defeat={defeat} handleSetDefeat={handleSetDefeat} victory={victory}
                                        handleSetVictory={handleSetVictory} handleCleanTargets={handleCleanTargets}
                                    />
                                ))
                            }
                        </div>
                    )
                }

                {
                    // Si el jugador ha perdido
                    defeat === true && (
                        // Muestra la ventana modal que se muestra automaticamente
                        <DefeatModal level={currentLevel.level} handleSetDefeat={handleSetDefeat} />
                    )
                }

            </div>
            {
                // TODO: ESTE BOTON DEBE ESTAR ABAJO DE LA PANTALLA
            }
            <div className="fixed bottom-4 right-4 text-right sm:hidden">
                <button className="bg-cyan-500 p-3 rounded-full shadow-lg hover:bg-cyan-600 active:bg-cyan-700" onClick={handleChangeViewPlayerBoard}>
                    {viewPlayerBoard === true ? (
                        <img src="images/bot.svg" alt="Bot" className="w-8 h-8" />
                    ) : (
                        <img src="images/board.svg" alt="Jugador" className="w-8 h-8" />
                    )}
                </button>
            </div>
        </>
    )
}
