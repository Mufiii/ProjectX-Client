import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Route } from "react-router-dom";

const PrivateRouter = ({children}) => {

  const {user} = useContext(AuthContext)

  return (

        <>
    {!user ? <Navigate to="/login" /> : children} 
    </>

  )
}

export default PrivateRouter