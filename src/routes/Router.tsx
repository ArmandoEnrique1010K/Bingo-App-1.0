import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

// Mejora el performance de la aplicación web al momento de hacer un build
const IndexPage = lazy(() => import('../pages/IndexPage'));
const LevelPage = lazy(() => import('../pages/LevelPage'));

// Escribe en consola "npm run preview" luego de hacer un build con "npm run build"
// Abre la consola de Chrome, ve a la pestaña Network y observa que se cargue el archivo
// "IndexPage..." al momento de ir a la pagina de inicio

// Componente de tipo router, define las rutas que tendrá la aplicación
export default function Router() {

    // Almacena los niveles desbloqueados en un arreglo utilizando la API LocalStorage
    const initialLevels = (): number[] => {
        const localStorageLevels = localStorage.getItem('unlockedLevels')
        // JSON.parse sirve para convertir de JSON a texto, se utiliza porque localStorage solamente 
        // almacena string en la memoria del navegador

        // Siempre el nivel 1 estara desbloqueado, por lo cual se asigna si no existe el key 
        // 'unlockedLevels'
        return localStorageLevels ? JSON.parse(localStorageLevels) : [1]
    }

    // Estado para los niveles desbloqueados
    const [unlockedLevels, setUnlockedLevels] = useState<number[]>(initialLevels)

    // Efecto para desbloquear los niveles
    useEffect(() => {
        // Establece el nivel desbloqueado, JSON.stringify convierte de texto a JSON
        localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels))
    }, [unlockedLevels])

    // Función para verificar que el nivel ya se encuentre desbloqueado
    const verifyUnlockedLevel = (level: number) => {
        // El metodo includes retorna true si en unlockedLevels se encuentra el elemento
        // numerico (nivel)
        return unlockedLevels.includes(level);
    };

    // Función para desbloquear un nivel
    const unlockLevel = (level: number) => {
        // Primero verifica que el nivel ya este desbloqueado
        if (!verifyUnlockedLevel(level)) {
            // Agrega el nivel desbloqueado en el state de unlockedLevels
            // Recordar que el operador Spread (...) devuelve una copia de los elementos de
            // un arreglo
            setUnlockedLevels([...unlockedLevels, level])
        }
    }

    // TODO: Investigar sobre Protected Routes

    return (
        // Habilita el sistema de rutas de React Router
        <BrowserRouter>

            {/* Define un grupo de rutas */}
            <Routes>

                {/* Un Route contiene el Layout, lo muestra en cada pagina web */}
                <Route element={<Layout />}>

                    {/* Ruta hacia la pagina de inicio */}
                    <Route path="/" element={
                        // Suspense lleva la propiedad fallback para mostrar un contenido mientras
                        // se carga la página web
                        <Suspense fallback="Cargando...">
                            {/* Muestra el contenido de IndexPage */}
                            <IndexPage unlockedLevels={unlockedLevels} />
                        </Suspense>
                    } />

                    {/*
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

                    {/* En lugar de definir las rutas, se utiliza una ruta dinamica para ir hacia 
                    un nivel desbloqueado */}
                    {
                        // Itera con unlockedLevels para definir las rutas dinamicas
                        unlockedLevels.map((level) => (
                            // No olvidar la propiedad key para definir el ID
                            <Route key={level} path={`/level_${level}`} element={
                                <Suspense fallback="Cargando...">
                                    {/* Pasale las propiedades level e unlockLevel (función) */}
                                    <LevelPage level={level} unlockLevel={unlockLevel}
                                    />
                                </Suspense>
                            } />
                        ))
                    }

                    {/* Si el usuario se va a cualquier otra pagina o INTENTA HACER TRAMPA SALTEANDO DE NIVEL en la barra
                    del navegador, se le va a redirigir hacia la pagina principal */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}