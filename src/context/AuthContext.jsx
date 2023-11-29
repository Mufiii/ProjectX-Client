import { createContext, useState } from "react";
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authtokens')?
    JSON.parse(localStorage.getItem('authtokens')):null)

  const [user, setUser] = useState(() => localStorage.getItem('authtokens')?
    jwtDecode(JSON.parse(localStorage.getItem('authtokens'))):null)

  const state = {
    authToken: authToken,
    setAuthToken: setAuthToken,
    user: user,
    setUser: setUser
  }


  return (
    <AuthContext.Provider value={state}>
        {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;