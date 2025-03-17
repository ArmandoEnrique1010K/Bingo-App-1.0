import { createContext, ReactNode } from "react";

type BingoContextProps = {
    text: string
}

type BingoProviderProps = {
    children: ReactNode
}

export const BingoContext = createContext<BingoContextProps>(null!)
export const BingoProvider = ({children}: BingoProviderProps) => {
    const text = 'CONTEXTO DE REACT'
    return (
        <BingoContext.Provider value={{text}}>
            {children}
        </BingoContext.Provider>
    )
}