import { lazy, Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import { BingoContext } from "../context/BingoContext";

// Carga diferida de páginas para mejorar el rendimiento
const IndexPage = lazy(() => import("../pages/IndexPage"));
const LevelPage = lazy(() => import("../pages/LevelPage"));

export default function Router() {
  const { unlockedLevels } = useContext(BingoContext);

  return (
    <Routes>
      {/* El Layout se muestra en la pagina */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback="Cargando...">
              <IndexPage />
            </Suspense>
          }
        />
        {
          // Define las rutas dinamicas por cada nivel
          unlockedLevels.map((level) => (
            <Route
              key={level}
              path={`/level_${level}`}
              element={
                <Suspense fallback="Cargando...">
                  <LevelPage />
                </Suspense>
              }
            />
          ))
        }

        {/* Si el usuario se saltea de ruta, se redirige a la pagina principal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
