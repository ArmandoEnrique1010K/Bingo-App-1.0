import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { BingoContext } from "../../context/BingoContext";

// Ventana modal que muestra las instrucciones del juego
export default function HelpModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { color } = useContext(BingoContext);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={open} className={`sm:py-4 py-2 px-3 text-${color}-500`}>
        <QuestionMarkCircleIcon className="sm:w-8 w-6" aria-hidden="true" />
      </button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        {/* Aplica el color de fondo con opacidad */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-50">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-xl transform transition-all duration-300 ease-in-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h2"
                className="text-4xl font-semibold text-center  mb-10"
              >
                Instrucciones
              </DialogTitle>
              <div className="text-lg space-y-4">
                <h3 className="text-2xl font-bold">¡Bienvenido a BingoApp!</h3>
                <p>
                  Tu objetivo es derrotar a los bots en un juego de Bingo. Sé el
                  primero en completar el patrón ganador antes que ellos.
                </p>
                <h3 className="text-2xl pt-2 font-bold">Menú principal</h3>
                <p>
                  En el menú principal encontrarás varias opciones para
                  interactuar con el juego:
                </p>
                <ul className="list-disc list-inside pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Niveles: </span>Accede a los
                    distintos niveles del juego. A medida que avances, podrás
                    desbloquear nuevos desafíos.
                  </li>
                  <li>
                    <span className="font-semibold">Música: </span> Activa o
                    desactiva la música de fondo.
                  </li>
                  <li>
                    <span className="font-semibold">Créditos: </span>Consulta la
                    información sobre los creadores del juego.
                  </li>
                </ul>
                <h3 className="text-2xl pt-2 font-bold ">Cómo jugar</h3>
                <ul className="list-decimal list-inside pl-5 space-y-2">
                  <li>
                    <span className="font-semibold">Iniciar partida: </span>
                    Presiona el botón "Iniciar partida" para comenzar el juego.
                  </li>
                  <li>
                    <span className="font-semibold">Números aleatorios: </span>
                    Se generarán números al azar, y deberás buscarlos en tu
                    tablero para marcarlos.
                  </li>
                  <li>
                    <span className="font-semibold">
                      Competencia con los bots :
                    </span>
                    Los bots también marcarán números en sus tableros al mismo
                    tiempo.
                  </li>
                  <li>
                    <span className="font-semibold">Tableros múltiples: </span>
                    Algunos niveles pueden requerir que juegues con dos tableros
                    en simultáneo.
                  </li>
                  <li>
                    <span className="font-semibold">Fin del juego: </span> La
                    partida termina cuando uno de los jugadores (tú o un bot)
                    completa el patrón ganador en al menos un tablero.
                  </li>
                </ul>
                <h3 className="text-2xl pt-2 font-bold">¿Como ganar?</h3>
                <p>
                  Marca los números correctamente en tu tablero. Cuando creas
                  haber completado el patrón, presiona el botón {""}
                  <span className="font-semibold">"Comprobar patrón"</span>. Si
                  el patrón es correcto, ganas la partida. Si un bot completa el
                  patrón antes que tú, perderás y deberás intentarlo de nuevo.
                </p>
              </div>
              <div className="mt-10">
                <Button
                  onClick={close}
                  className="w-full py-2 px-4 bg-gray-700 text-white rounded-lg text-lg hover:bg-gray-600 focus:outline-none "
                >
                  Cerrar
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
