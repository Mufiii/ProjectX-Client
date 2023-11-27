import AuthProvider from "./context/AuthContext"
import VendorRegister from "./components/Authentications/VendorRegister"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from './components/Authentications/Login.jsx';


function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<VendorRegister />} path="/register" />
          <Route element={<Login />} path="/login" />
          <Route element={<Home />} path="/" />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
