import { createContext, useState } from "react";

export const ResultContext = createContext();

export function ResultProvider({children}){
    const initialAuthUser = localStorage.getItem("Users");
    const [resultAck, setResultAck] = useState(
        initialAuthUser ? JSON.parse(initialAuthUser): undefined
    );

    return(
        <ResultContext.Provider value={{resultAck, setResultAck}}>
            {children}
        </ResultContext.Provider>
    )
}