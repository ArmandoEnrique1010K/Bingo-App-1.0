import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

const Index = lazy(() => import('../pages/IndexPage'));
const Level = lazy(() => import('../pages/LevelPage'));

// TODO: Agregar rutas dinamicas para los niveles 1 y 2

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Un Route contiene el Layout, lo muestra en cada pagina web */}
                <Route element={<Layout />}>
                    <Route path="/" element={
                        <Suspense fallback="Cargando...">
                            <Index />
                        </Suspense>
                    } />

                    // TODO: Esto debe ser dinamico
                    <Route path="/level_1" element={
                        <Suspense fallback="Cargando...">
                            <Level level={1} />
                        </Suspense>
                    } />

                    <Route path="/level_2" element={
                        <Suspense fallback="Cargando...">
                            <Level level={2} />
                        </Suspense>
                    } />

                    <Route path="/level_3" element={
                        <Suspense fallback="Cargando...">
                            <Level level={3} />
                        </Suspense>
                    } />

                    <Route path="/level_4" element={
                        <Suspense fallback="Cargando...">
                            <Level level={4} />
                        </Suspense>
                    } />

                    <Route path="/level_5" element={
                        <Suspense fallback="Cargando...">
                            <Level level={5} />
                        </Suspense>
                    } />
                    <Route path="/level_6" element={
                        <Suspense fallback="Cargando...">
                            <Level level={6} />
                        </Suspense>
                    } />
                    <Route path="/level_7" element={
                        <Suspense fallback="Cargando...">
                            <Level level={7} />
                        </Suspense>
                    } />
                    <Route path="/level_8" element={
                        <Suspense fallback="Cargando...">
                            <Level level={8} />
                        </Suspense>
                    } />
                    <Route path="/level_20" element={
                        <Suspense fallback="Cargando...">
                            <Level level={20} />
                        </Suspense>
                    } />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}