import { useContext } from "react";
import TargetsNumbers from "../components/Target/TargetNumbers";
import BoardNumbers from "../components/Player/BoardNumbers";
import TargetPattern from "../components/Target/TargetPattern";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { DEFEAT_MODAL, EXIT_MODAL, FINAL_LEVEL, FINAL_LEVEL_VICTORY_MODAL, MAX_TURNS, NO_MORE_ROUNDS_MODAL, VICTORY_MODAL } from "../constants";
import ModalWithButton from "../components/Modal/ModalWithButton";
import { BingoContext } from "../context/BingoContext";


// Pagina de un nivel

// PROBLEMA: COMO PASAR UNA PROP level POR MEDIO DEL CONTEXTO
export default function LevelPage() {

    const { color,
        round,
        targetsNumbers,
        winnerPatters,
        level,
        targetText,
        boards,
        playerBoards,
        handleChangeTargets,
        handleChangeViewPlayerBoard,
        viewPlayerBoard,
        isAtFirstBoard,
        handleChangeBoard,
        isAtLastBoard,
        currentBoard,
        winner

    } = useContext(BingoContext)

    // // Obtiene los datos del nivel actual usando el metodo find.
    // // Se utiliza levels[0], en el caso de que sea undefined (probabilidad casi 
    // // nula de que suceda eso)
    // const currentLevel = levels.find(l => l.level === level) || levels[0];

    // // Variables de estado
    // // const musicLevel = currentLevel.music;

    // // Color del nivel actual
    // const color = currentLevel.color;

    // // Tableros del jugador
    // const [board, setBoard] = useState<BoardID>([]);

    // // Numeros objetivos
    // const [targets, setTargets] = useState<number[]>([]);

    // // Patrones ganadores
    // const [patterns, setPatterns] = useState<Pattern[]>([]);


    // // Posiciones de los numeros seleccionados (se utiliza el type SelectedPositions)
    // // Coloca el cursor sobre el type para ver el tipo de dato que espera
    // const [selectedPositions, setSelectedPositions] = useState<SelectedPositions>([]);

    // // Números seleccionados
    // const [selectedNumbers, setSelectedNumbers] = useState<SelectedNumbers>([]);

    // // Fin del juego si el jugador gano
    // const [victory, setVictory] = useState(false)

    // // Fin del juego si el bot gana
    // const [defeat, setDefeat] = useState(false);

    // // Turno o ronda (NO DEBE PASAR DE 25 RONDAS)
    // const [round, setRound] = useState(0)

    // // NUMEROS EXCLUIDOS (YA QUE MOSTRARON EN LOS NUMEROS OBJETIVOS)
    // const [excludedNumbers, setExcludedNumbers] = useState<number[]>([]);

    // // Efecto para cargar los posibles patrones y almacenarlo en el state de patterns
    // useEffect(() => {
    //     const patterns = currentLevel.patterns;
    //     setPatterns(patterns);
    //     console.log('SE CARGO LOS PATRONES DE ESTE NIVEL')
    // }, [currentLevel])


    // // Usar useMemo de esta manera asegura que newBoards se recalculará solo cuando currentLevel.boards 
    // // cambie, lo cual es una buena práctica para evitar renders innecesarios y mejorar el rendimiento.

    // // Genera los tableros de acuerdo a la cantidad asignada en la propiedad boards del nivel actual

    // const location = useLocation();

    // // IMPRIME EL ENDPOINT ACTUAL
    // // console.log(location.pathname)
    // // console.log(location.pathname === `level_${level + 1}`)

    // const newBoards = useMemo(() => {

    //     // SI NO HAY DERROTA O SI HAY VICTORIA Y PASO DE NIVEL

    //     // TODO: CORREGIR ESTO
    //     if (defeat === false){
    //     // Array sirve para crear un nuevo arreglo y from especifica la cantidad de elementos del arreglo
    //     // El metodo map, el primer argumento "_", representa cada elemento, el segundo "index" es el orden
    //     // del elemento
    //     console.log('SE GENERARON LOS NUEVOS TABLEROS: ' + currentLevel.boards)
    //     return Array.from({ length: currentLevel.boards }).map((_, index) => ({
    //         // Se evita el id igual a 0
    //         id: index + 1,
    //         board: generateBoard()
    //     }));    

    //     } else {
    //         return []
    //     }

    //     // TODO: ¿CONVIENE COLOCAR defeat y victory EN EL ARREGLO DE DEPENDENCIAS?
    // }, [defeat, victory])

    // // EFECTO SECUNDARIO

    // // Función para establecer los valores iniciales al empezar o reiniciar el nivel
    // const resetLevel = () => {
    //     // Genera los tableros y los números objetivos se establecen en 0
    //     setBoard(newBoards)
    //     setTargets([]);

    //     // Por defecto se asigna el número del centro del tablero como un número seleccionado
    //     // tanto para las posiciones y los numeros seleccionados de cada uno de los tableros
    //     setSelectedPositions(Array.from({ length: currentLevel.boards }).map((_, index) => ({
    //         idBoard: index,
    //         positions: [13]
    //     })))

    //     setSelectedNumbers(Array.from({ length: currentLevel.boards }).map((_, index) => ({
    //         idBoard: index,
    //         numbers: [0]
    //     })))

    //     // Ronda 0
    //     setRound(0);
    //     // Aun no hay victoria ni derrota
    //     setVictory(false);
    //     setDefeat(false);
    //     // Eliminar los numeros excluidos
    //     setExcludedNumbers([])

    //     console.log('SE REESTABLECIO LOS DATOS INICIALES DEL NIVEL (RESETLEVEL)')
    // }


    // // Cuando el jugador pierde, se tiene que volver a reiniciar el nivel
    // // Nota: El state de defeat debe volver a ser false
    // useEffect(() => {
    //     if (defeat === false) {
    //         console.log('AUN NO HAY DERROTA')
    //         resetLevel()
    //     } else {
    //     console.log('HUBO DERROTA')
    //     }

    // }, [defeat]);


    // // Función para cambiar los numeros objetivos
    // useEffect(() => {
    //     if (victory === false){
    //         console.log('EL JUGADOR GANO')
    //         resetLevel()
    //     } else {
    //         console.log('EL JUGADOR AUN NO HA GANADO')
    //     }
    // }, [victory])

    // const handleChangeTargets = () => {

    //     // Si llega al turno maximo, se acaba la partida
    //     if (round === MAX_TURNS) {
    //         setTargets([])
    //         setDefeat(true);
    //         console.log('SOBREPASO LA CANTIDAD DE TURNOS')
    //     } else {

    //         console.log('ESPERE 1 SEG. PARA MOSTRAR LOS NUMEROS OBJETIVOS')
    //         setRound(round + 1) // Incrementa la ronda en 1
    //         setTargets([]); // Limpia los numeros objetivos

    //         // Espera 1 seg. para generar los numeros objetivos
    //         // Recordar que la función generateTargets necesita la cantidad de números que se generaran y los numeros excluidos
    //         setTimeout(() => {
    //             setTargets(generateTargets(DEFAULT_TARGETS, excludedNumbers));
    //             setExcludedNumbers([...excludedNumbers, ...targets])
    //         }, 1000)

    //     }
    // }

    // // Efecto secundario para pruebas
    // useEffect(() => {
    //     console.log("Numeros que ya fuerón utilizados previamente (excepto en este turno): " + excludedNumbers)
    // }, [excludedNumbers])

    // // Función para verificar que el numero ya se encuentre marcado en el tablero (devuelve un valor booleano)
    // // TODO: MODIFICARLO
    // const isSelectedNumber = (idBoard: number, number: number): boolean => {
    //     // La diferencia entre el metodo some e includes

    //     // El método some() verifica si al menos un elemento en el array cumple con una condición proporcionada 
    //     // por una función.Retorna true si encuentra un elemento que cumple con la condición, y false si no 
    //     // encuentra ninguno.

    //     // El método includes() verifica si un array contiene un valor específico. Retorna true si el array 
    //     // contiene el valor y false si no lo contiene.

    //     // Si en el state de selectedNumbers, algun elemento, segun el id recibido del tablero y si en 
    //     // el arreglo numbers se encuentra el número recibido
    //     if (selectedNumbers.some(board => board.idBoard === idBoard && board.numbers.includes(number))) {
    //         // console.log("Este número ya ha sido seleccionado")
    //         return true;
    //     }
    //     return false;
    // }

    // // Función para marcar un número seleccionado en el tablero, requiere el id, number y position
    // const handleClickButton = (idBoard: number, number: number, position: number) => {
    //     // Si uno de los números seleccionados es igual al número objetivo, y si ese numero 
    //     // no se encuentra marcado en el tablero
    //     if (targets.includes(number) && !isSelectedNumber(idBoard, number)) {
    //         // Se agrega la posición y el numero en los state de selectedPositions y selectedNumbers
    //         // Para aquello es necesario crear una copia superficial del estado para agregar el nuevo
    //         // elemento, se itera sobre los tableros, se busca el tablero por su id y se añade al state
    //         setSelectedPositions(prevState =>
    //             prevState.map(board =>
    //                 board.idBoard === idBoard
    //                     ? { ...board, positions: [...board.positions, position] }
    //                     : board
    //             )
    //         );
    //         setSelectedNumbers(prevState =>
    //             prevState.map(board =>
    //                 board.idBoard === idBoard
    //                     ? { ...board, numbers: [...board.numbers, number] }
    //                     : board
    //             )
    //         );
    //         // console.log("El usuario selecciono el numero: " + number + "en el tablero " + idBoard)
    //     }
    // }


    // // TODO: MEJORAR EL PERFORMANCE DE ESTA FUNCIÓN
    // const handleIsSelectedNumber = (idBoard: number, position: number) => {
    //     if (selectedPositions.some(board => board.idBoard === idBoard && board.positions.some(pos => pos === position))) {
    //         // console.log("TRUE");
    //         return true;
    //     }
    //     // console.log("FALSE");
    //     return false;
    // }

    // useEffect(() => {
    //     console.log("Selected positions have changed:", selectedPositions);
    // }, [selectedPositions]);



    // // Función para verificar si es un número seleccionado según el tablero y su posición del número

    // // Función para verificar si el usuario ha completado un patrón ganador
    // const handleCheckWinnerPattern = () => {

    //     // Itera sobre las posiciones seleccionadas de cada uno de los tableros
    //     for (const board of selectedPositions) {
    //         // Verifica si al menos uno de los elementos en patterns cumple la condición especificada en la función flecha.
    //         // Dentro de some, se utiliza every para verificar si todos los elementos en el array p cumplen la condición 
    //         // especificada en la función flecha.
    //         // Dentro de la función de every se utiliza some para verificar si al menos uno de los elementos en 
    //         // board.positions es igual a n.
    //         if (patterns?.some(p => p.every(n => board.positions.some(
    //             position => position === n
    //         )))) {

    //             // Se establece victory en true
    //             setVictory(true);
    //             setDefeat(false);

    //             // console.log("El jugador ha ganado el nivel " + level);

    //             // Es necesario limpiar los numeros objetivos para evitar que el bot siga marcando
    //             setTargets([]);

    //             // Desbloquea el siguiente nivel
    //             // 20 es el nivel final
    //             if (level !== 20) {
    //                 unlockLevel(level + 1);
    //             }

    //             // Retorna un true para confirmar el patrón ganador
    //             return true;
    //         }
    //     }

    //     // De lo contrario false
    //     // console.log("Sigue intentando");
    //     return false;
    // };

    // // Funciones para establecer los states de defeat y victory
    // const handleSetDefeat = (boolean: boolean) => {
    //     setDefeat(boolean)
    // }

    // const handleSetVictory = (boolean: boolean) => {
    //     setVictory(boolean)
    // }

    // // Función para limpiar los numeros objetivos
    // const handleCleanTargets = () => {
    //     setTargets([])
    // }

    // // READY: ESTADO PARA MOSTRAR SOLAMENTE UN TABLERO
    // // const actualBoard = newBoards.find(b => b.id === 1)?.id || 5;

    // const [currentBoard, setCurrentBoard] = useState(() =>
    //     newBoards.find(b => b.id === 1)?.id || 5
    // );

    // const verifyExistBoard = (id: number) => newBoards.some(b => b.id === id);

    // const handleChangeBoard = (direction: "prev" | "next") => {
    //     const newBoardId = direction === "prev" ? currentBoard - 1 : currentBoard + 1;
    //     if (verifyExistBoard(newBoardId)) {
    //         setCurrentBoard(newBoardId);
    //         // console.log("Se muestra el tablero " + newBoardId)
    //     }
    //     // else {
    //     //     console.log("No existe otro tablero");
    //     // }
    // };

    // const isAtFirstBoard = currentBoard === Math.min(...newBoards.map(b => b.id));
    // const isAtLastBoard = currentBoard === Math.max(...newBoards.map(b => b.id));
    // // Contenido HTML devuelto por el componente
    // // Efecto de gradiente en tailwindcss
    // // bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-700

    // // TODO: ESTADO PARA MOSTRAR EL TABLERO O LOS TABLEROS DE LOS BOTS (SOLAMENTE EN DISEÑO RESPONSIVE)

    // const [viewPlayerBoard, setViewPlayerBoard] = useState(true);

    // // useEffect(() => {
    // //     if (viewPlayerBoard === false) {
    // //         console.log("Mostrando los tableros de los bots")
    // //     } else {
    // //         console.log("Mostrando el tablero del jugador")
    // //     }
    // // }, [viewPlayerBoard])

    // const handleChangeViewPlayerBoard = () => {
    //     setViewPlayerBoard(!viewPlayerBoard)
    // }


    // // READY: AÑADIR BOTONES PARA CAMBIAR DE TABLERO
    // // TODO: SEPARAR LOS BOTS EN OTRO COMPONENTE PARA QUE EL USUARIO PUEDA VER EL TABLERO Y LOS BOTS POR SEPARADO EN UN DISPOSITIVO MOVIL
    return (
        <>
            <div className="text-white m-auto">
                <div className="container mx-auto py-4 flex sm:flex-row flex-col items-start sm:gap-6 gap-4 justify-center">
                    <div className="flex flex-row sm:flex-col sm:w-96 w-full justify-center sm:m-0 sm:gap-0 gap-3 mx-auto">
                        <div className=" flex flex-col min-w-20 sm:ml-0 ml-2 sm:w-auto w-full">
                            <div className="mb-4 text-center bg-gray-700 rounded-xl p-1">
                                <h1 className={`sm:text-2xl text-xl font-bold mb-2 text-${color}-500`}>Nivel {level}</h1>
                                <p className="sm:text-lg text-sm">Ronda: <span className={`font-semibold text-${color}-500`}>{round}</span> / {MAX_TURNS}</p>
                            </div>

                            {/* Componente de los numeros objetivos */}
                            {/* TODO: MEJORAR LA LOGICA DE TARGETS, POR UN MILISEGUNDO SE VE QUE SE MUESTRA UN BOTON??? */}
                            <TargetsNumbers round={round} targets={targetsNumbers} handleChangeTargets={handleChangeTargets} color={color} />
                        </div>

                        {/* Componente del patrón ganador */}
                        <TargetPattern patterns={winnerPatters} color={color} level={level} text={targetText} />

                    </div>

                    {/* Botones para comprobar el patron ganador y salir del juego */}

                    {
                        viewPlayerBoard === true && (
                            <div className="flex flex-col gap-4 sm:mx-0 mx-auto">
                                <div className="flex flex-row mx-auto border-4 border-gray-700 rounded-xl">
                                    {
                                        // Renderiza BoardNumbers por la cantidad de boards en currentLevel
                                        Array.from({ length: boards }).map((_, index) => (

                                            // TODO: BUSCAR EL TABLERO POR EL INDEX
                                            // index + 1 <-- obtiene el id


                                            currentBoard === index + 1 && (
                                                <BoardNumbers
                                                    key={index}
                                                    idBoard={index}
                                                    // Busca el tablero por su id y lo pasa como propiedad
                                                    board={playerBoards.find(b => b.id === index + 1)?.board || []}
                                                // handleIsSelectedNumber={handleIsSelectedNumber}
                                                // handleClickButton={handleClickButton}
                                                // selectedNumbers={selectedNumbersInBoards}
                                                // color={color}
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
            ${isAtFirstBoard ? "bg-gray-500 text-white cursor-not-allowed" : `bg-${color}-500 text-white `} 
            `}
                                            onClick={() => handleChangeBoard("prev")}
                                            disabled={isAtFirstBoard}
                                        >
                                            <ArrowLeftIcon className='
                                    h-6 mx-auto' />
                                        </button>

                                        <button
                                            className={`px-4 sm:py-3 py-2 font-semibold rounded-lg shadow-md transition duration-300 w-full  sm:text-base text-sm shadow-black 
            ${isAtLastBoard ? "bg-gray-500 text-white cursor-not-allowed" : `bg-${color}-500 text-white `}`}
                                            onClick={() => handleChangeBoard("next")}
                                            disabled={isAtLastBoard}
                                        >
                                            <ArrowRightIcon className='h-6 mx-auto' />

                                        </button>

                                    </div>
                                    <div className="flex flex-row justify-between gap-4">

                                        <ModalWithButton modal={level !== FINAL_LEVEL ? VICTORY_MODAL : FINAL_LEVEL_VICTORY_MODAL} initialState={false} />

                                        <ModalWithButton modal={EXIT_MODAL} initialState={false} />
                                    </div>
                                </div>

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
                                // bots.map((bot, index) => (
                                //     <Bot key={bot.name} currentLevel={dataLevel} targets={targetsNumbers} interval={bot.interval} name={bot.name}
                                //         patterns={winnerPatters} boards={bot.boards}
                                //         nextBoards={
                                //             bot.boards
                                //                 ? currentLevel.bots[index + 1]?.boards
                                //                 : 0
                                //         } defeat={defeat} handleSetDefeat={handleSetDefeat} victory={victory}
                                //         handleSetVictory={handleSetVictory} handleCleanTargets={handleCleanTargets}
                                //         color={color}
                                //     />
                                // ))
                            }
                        </div>
                    )
                }

                {
                    // Si el jugador ha perdido
                    winner === 'bot' && (
                        // Muestra la ventana modal que se muestra automaticamente
                        <ModalWithButton modal={DEFEAT_MODAL} initialState={true} />

                    )


                }

                {
                    /// Si el numero de turnos llega a 3 (limite)
                    round === MAX_TURNS && winner === 'end' && (
                        <ModalWithButton modal={NO_MORE_ROUNDS_MODAL} initialState={true} />

                    )
                }
            </div>
            {
                // TODO: ESTE BOTON DEBE ESTAR ABAJO DE LA PANTALLA
            }
            <div className="fixed bottom-4 right-4 text-right sm:hidden">
                <button
                    className={`bg-${color}-500 p-3 rounded-full shadow-lg `}
                    onClick={handleChangeViewPlayerBoard}>
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
