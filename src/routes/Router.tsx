import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

// Mejora el performance de la aplicación web al momento de hacer un build
const IndexPage = lazy(() => import('../pages/IndexPage'));
const Level = lazy(() => import('../pages/LevelPage'));

export default function Router() {

    // Estado para los niveles desbloqueados
    const initialLevels = (): number[] => {
        const localStorageLevels = localStorage.getItem('unlockedLevels')
        // Siempre el nivel 1 estara desbloqueado
        return localStorageLevels ? JSON.parse(localStorageLevels) : [1]
    }

    const initialPowerUps = (): number[] => {
        const localStoragePowerUps = localStorage.getItem('unlockedPowerUps')
        // Siempre el nivel 1 estara desbloqueado
        return localStoragePowerUps ? JSON.parse(localStoragePowerUps) : []
    }

    const [unlockedLevels, setUnlockedLevels] = useState<number[]>(initialLevels)

    // Estado para los powerups
    const [unlockedPowerUps, setUnlockedPowerUps] = useState<number[]>(initialPowerUps)

    useEffect(() => {
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels))
    }, [unlockedLevels])


    // FALTA
    useEffect(() => {
        localStorage.setItem('unlockedPowerUps', JSON.stringify(unlockedPowerUps))
    }, [unlockedPowerUps])

    const unlockLevel = (level: number) => {
        if (!verifyUnlockedLevel(level)) {
            setUnlockedLevels([...unlockedLevels, level])
        }
    }

    // Función para verificar que el nivel ya se encuentre desbloqueado
    const verifyUnlockedLevel = (level: number) => {
        return unlockedLevels.includes(level);
    };

    // DESBLOQUEAR POWERUPS
    const unlockPowerUp = (powerUpId: number) => {
        if (!verifyUnlockedPowerUp(powerUpId)) {
            setUnlockedPowerUps([...unlockedPowerUps, powerUpId])
        }
    }

    // Verificar que el powerup ya se encuentre desbloqueado
    const verifyUnlockedPowerUp = (powerUpId: number) => {
        return unlockedPowerUps.includes(powerUpId)
    }

    // TODO: Investigar sobre Protected Routes

    return (
        <BrowserRouter>
            <Routes>
                {/* Un Route contiene el Layout, lo muestra en cada pagina web */}
                <Route element={<Layout />}>
                    <Route path="/" element={
                        <Suspense fallback="Cargando...">
                            <IndexPage unlockedLevels={unlockedLevels} />
                        </Suspense>
                    } />

                    {/* Esto debe ser dinamico
                    <Route path="/level_1" element={
                        <Suspense fallback="Cargando...">
                            <Level level={1} unlockLevel={unlockLevel} />
                        </Suspense>
                    } />
                    <Route path="/level_2" element={
                        <Suspense fallback="Cargando...">
                            <Level level={2} unlockLevel={unlockLevel} />
                        </Suspense>
                    } />
                    <Route path="/level_3" element={
                        <Suspense fallback="Cargando...">
                            <Level level={3} unlockLevel={unlockLevel} />
                        </Suspense>
                    } />
 */}

                    {/* // READY: Esto debe ser dinamico (Ruta dinamica hacia los niveles desbloqueados) */}
                    {
                        unlockedLevels.map((level) => (
                            <Route key={level} path={`/level_${level}`} element={
                                <Suspense fallback="Cargando...">
                                    <Level level={level} unlockLevel={unlockLevel} unlockPowerUp={unlockPowerUp} unlockedPowerUps={unlockedPowerUps} />
                                </Suspense>
                            } />
                        ))
                    }

                    {/* Algo no funciona aqui */}
                    {/* <Route path="/**" element={<Navigate to={'/'} />}></Route> */}

                    {/* Ahora si funciona, si se va a cualquier otra pagina o INTENTA HACER TRAMPA SALTEANDO DE NIVEL, se le va a redirigir hacia la pagina principal */}
                    <Route path="*" element={<Navigate to="/" />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}