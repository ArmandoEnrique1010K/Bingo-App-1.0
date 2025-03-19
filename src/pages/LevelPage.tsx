import { useContext, useState } from "react";
import TargetsNumbers from "../components/Target/TargetNumbers";
import BoardNumbers from "../components/Player/BoardNumbers";
import TargetPattern from "../components/Target/TargetPattern";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { DEFEAT_MODAL, EXIT_MODAL, FINAL_LEVEL, FINAL_LEVEL_VICTORY_MODAL, MAX_TURNS, NO_MORE_ROUNDS_MODAL, START_LEVEL_MODAL, VICTORY_MODAL } from "../constants";
import ModalWithButton from "../components/Modal/ModalWithButton";
import { BingoContext } from "../context/BingoContext";
import Bots from "../components/Bot/Bots";



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
        winner,
        bots,
        dataLevel,
        // currentLevel
    } = useContext(BingoContext)


    const [startModal, setStartModal] = useState<boolean>(true)

    // useEffect(() => {
    //     if (winner === 'none') {
    //         console.log('NO HAY NINGUN GANADOR EN EL MODAL')
    //         setStartModal(true)
    //     }
    // }, [winner])


    // const location = useLocation();
    // const component = {
    //     modal: <></>
    // }
    // useEffect(() => {
    //     // Logic to handle the change in route or endpoint
    //     // For example, you can check if the pathname has changed
    //     // and then trigger the re-render of ModalWithButton
    //     // This is a placeholder logic, you can customize it as per your requirement
    //     const handleRouteChange = () => {
    //         // si path es: /level_2 (el siguiente nivel del actual con currentLevel (niverl actual) )
    //         const path = location.pathname.match(/level_(\d+) + 1/);
    //         if (path) {
    //             component.modal = <ModalWithButton modal={START_LEVEL_MODAL} initialState={true} />
    //         }

    //         // Your logic to re-render ModalWithButton
    //     };

    //     handleRouteChange();
    // }, [location.pathname]);

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
                                bots.map((bot, index) => (
                                    <Bots
                                        key={bot.name}
                                        currentLevel={dataLevel!}
                                        targets={targetsNumbers}
                                        interval={bot.interval}
                                        name={bot.name}
                                        patterns={winnerPatters}
                                        boards={bot.boards}
                                        nextBoards={bot.boards ? dataLevel!.bots[index + 1]?.boards : 0}

                                    //  defeat={defeat} 
                                    //  handleSetDefeat={handleSetDefeat} 
                                    //  victory={victory}
                                    //  handleSetVictory={handleSetVictory} 
                                    //  handleCleanTargets={handleCleanTargets}
                                    //  color={color}
                                    />
                                ))
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

                {/* TODO: ESTO SE DEBE MOSTRAR CADA VEZ QUE CAMBIA DE NIVEL */}
                <ModalWithButton modal={START_LEVEL_MODAL} initialState={startModal} setStartModal={setStartModal} />


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
