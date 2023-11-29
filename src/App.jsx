import AuthProvider from "./context/AuthContext"
import VendorRegister from "./components/Authentications/VendorRegister"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from './components/Authentications/Login.jsx';
import LoginOtpVerify from "./components/Authentications/LoginOtpVerify.jsx";
import VerifyEmail from "./components/Authentications/VerifyEmail.jsx"
import { Navbar } from "@material-tailwind/react";
import { HomeNavbar } from "./utils/HomeNavbar.jsx";


function App() {

  return (
    <>
      <AuthProvider>
        <HomeNavbar/>
        <Routes>
          <Route element={<VendorRegister />} path="/hiretalent" />
          <Route element={<VerifyEmail />} path="/email_verify/:token" />
          <Route element={<Login />} path="/login/" />
          <Route element={<LoginOtpVerify />} path="/otpverify/:email" />
          <Route element={<Home />} path="/" />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
