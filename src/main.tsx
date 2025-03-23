import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { BingoProvider } from "./context/BingoContext.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  // ARBOL DE COMPONENTES: RUTAS, CONTEXTO, HOOK, ETC
  <StrictMode>
    <BrowserRouter>
      <BingoProvider>
        <App />
      </BingoProvider>
    </BrowserRouter>
  </StrictMode>
);
