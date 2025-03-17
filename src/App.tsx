import { useContext } from "react"
import Router from "./routes/Router"
import { BingoContext } from "./context/BingoContext"

function App() {

  // LLAMAR AL CONTEXTO DE REACT
  // const {text} = useContext(BingoContext)

  // console.log(text)
  return (
    <>
      <Router />
    </>
  )
}

export default App
