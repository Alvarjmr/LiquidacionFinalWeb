import {createContext,useState } from "react";
export const InformacionCuenta = createContext()
export const ProveedorInformacion = ({children}) =>{
    const [usuariogeneral, setusuariogeneral] = useState({})   

return(
    <InformacionCuenta.Provider value={{
        usuariogeneral,
       
        setusuariogeneral,       
    }}>
        {children}
    </InformacionCuenta.Provider>
)

}