import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";

// Mejora el performance de la apliación web al momento de hacer un build
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
                    <Route path="/level_9" element={
                        <Suspense fallback="Cargando...">
                            <Level level={9} />
                        </Suspense>
                    } />
                    <Route path="/level_10" element={
                        <Suspense fallback="Cargando...">
                            <Level level={10} />
                        </Suspense>
                    } />
                    <Route path="/level_11" element={
                        <Suspense fallback="Cargando...">
                            <Level level={11} />
                        </Suspense>
                    } />
                    <Route path="/level_12" element={
                        <Suspense fallback="Cargando...">
                            <Level level={12} />
                        </Suspense>
                    } />
                    <Route path="/level_13" element={
                        <Suspense fallback="Cargando...">
                            <Level level={13} />
                        </Suspense>
                    } />
                    <Route path="/level_14" element={
                        <Suspense fallback="Cargando...">
                            <Level level={14} />
                        </Suspense>
                    } />
                    <Route path="/level_15" element={
                        <Suspense fallback="Cargando...">
                            <Level level={15} />
                        </Suspense>
                    } />
                    <Route path="/level_16" element={
                        <Suspense fallback="Cargando...">
                            <Level level={16} />
                        </Suspense>
                    } />
                    <Route path="/level_17" element={
                        <Suspense fallback="Cargando...">
                            <Level level={17} />
                        </Suspense>
                    } />
                    <Route path="/level_18" element={
                        <Suspense fallback="Cargando...">
                            <Level level={18} />
                        </Suspense>
                    } />
                    <Route path="/level_19" element={
                        <Suspense fallback="Cargando...">
                            <Level level={19} />
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