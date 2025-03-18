import Router from "./routes/Router"
import { BrowserRouter } from "react-router"

function App() {

  // LLAMAR AL CONTEXTO DE REACT
  // const {text} = useContext(BingoContext)

  // console.log(text)
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  )
}

export default App
