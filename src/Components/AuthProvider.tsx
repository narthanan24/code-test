import React, {createContext, useState} from "react";

export const AuthProvider = createContext(null);

// type authContextType = {
//     auth: boolean;
//     setAuth: () => void;
// };
//
// const authContextDefaultValues: authContextType = {
//     auth: false,
//     setAuth: () => {
//     }
// };
//
// const AuthContext = createContext<authContextType>(authContextDefaultValues);
//
// function useAuth() {
//     return useContext(AuthContext)
// }
//
// type Props = {
//     children: ReactNode
// }
//
// export function AuthProvider({children}: Props) {
//     const [auth,setAuth] = useState<boolean>(null);
//
//     const setAuthValue=()=>{
//         setAuth(false)
//     }
//
//     const value={
//         auth,
//         setAuthValue
//     }
//
//     return (
//         <>
//             <AuthContext.Provider value={value}>
//                 {children}
//             </AuthContext.Provider>
//         </>
//     )
// }
