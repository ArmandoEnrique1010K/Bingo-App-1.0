import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react';

export default function Help() {

    const [showHelp, setShowHelp] = useState(false);

    // TODO: Esto debe ser una ventana modal
    return (
        <>
            {
                <button onClick={() => setShowHelp(!showHelp)}><QuestionMarkCircleIcon className='h-12 w-12 text-blue-300' aria-hidden="true" /></button>

            }
            {
                showHelp &&
                (
                    <>
                        <h1> Instrucciones</h1>

                        <p>Tu objetivo es ganarle a los bots en un juego de bingo</p>


                    </>
                )
            }

        </>


    )
}

