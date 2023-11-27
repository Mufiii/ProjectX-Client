import { createContext, useState } from "react";
export const AuthContext = createContext()
import { jwtDecode } from 'jwt-decode'


const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken')?
    JSON.parse(localStorage.getItem('authToken')):null)

  const [user, setUser] = useState(() => localStorage.getItem('authToken')?
    jwtDecode(localStorage.getItem('authToken')):null)


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