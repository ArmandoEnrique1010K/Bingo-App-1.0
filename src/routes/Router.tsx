import { lazy, Suspense, useContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import { BingoContext } from "../context/BingoContext";

// Mejora el performance de la aplicación web al momento de hacer un build
// Comprueba el resultado pulsando F12 en el navegador, muestra 2 archivos JS
const IndexPage = lazy(() => import('../pages/IndexPage'));
const LevelPage = lazy(() => import('../pages/LevelPage'));

// Componente de tipo router, define las rutas que tendrá la aplicación
export default function Router() {

    const {unlockedLevels} = useContext(BingoContext)

    // Almacena los niveles desbloqueados en un arreglo utilizando la API LocalStorage
            // El nivel 1 siempre estara desbloqueado)
    // const initialLevels = (): number[] => {
    //     const localStorageLevels = localStorage.getItem('unlockedLevels')
    //     return localStorageLevels ? JSON.parse(localStorageLevels) : [1]
    // }

    // // Niveles desbloqueados (arreglo de números)
    // const [unlockedLevels, setUnlockedLevels] = useState<number[]>(initialLevels)

    // // Efecto para almacenar los niveles desbloqueados en el navegador
    // useEffect(() => {
    //     localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels))
    // }, [unlockedLevels])

    // // Verifica que el nivel ya se encuentre desbloqueado
    // // El metodo includes retorna true si se encuentra el elemento
    // const verifyUnlockedLevel = (level: number) => {
    //     return unlockedLevels.includes(level);
    // };

    // // Desbloquea un nuevo nivel y lo agrega en unlockedLevels
    // const unlockLevel = (level: number) => {
    //     if (!verifyUnlockedLevel(level)) {
    //         setUnlockedLevels([...unlockedLevels, level])
    //     }
    // }

    return (
        // Habilita el sistema de rutas de React Router
        <BrowserRouter>
            <Routes>
                {/* Un Route contiene el Layout, se muestra en cada ruta contenida */}
                <Route element={<Layout />}>

                    {/* Ruta hacia la pagina de inicio
                    // Suspense lleva la propiedad fallback para mostrar un contenido mientras
                        // se carga la página web
                    */}
                    <Route path="/" element={
                        <Suspense fallback="Cargando...">
                            <IndexPage unlockedLevels={unlockedLevels} />
                        </Suspense>
                    } />

                    {/* En lugar de definir las rutas para los niveles, se utiliza una ruta dinamica para ir hacia 
                    un nivel desbloqueado 
                    // Itera con unlockedLevels para definir las rutas dinamicas */}
                    {
                        unlockedLevels.map((level) => (
                            <Route key={level} path={`/level_${level}`} element={
                                <Suspense fallback="Cargando...">

                                    {/* TODO: PASAR ESTO unlockLevel={unlockLevel} */}
                                    <LevelPage level={level} 
                                    />
                                </Suspense>
                            } />
                        ))
                    }

                    {/* Evita que el usuario se saltee de niveles o acceda a una pagina no definida */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}