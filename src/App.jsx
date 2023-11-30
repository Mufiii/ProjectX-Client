import AuthProvider from "./context/AuthContext"
import VendorRegister from "./components/Authentications/VendorRegister"
import DevRegister from "./components/Authentications/DeveloperRegister.jsx"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from './components/Authentications/Login.jsx';
import LoginOtpVerify from "./components/Authentications/LoginOtpVerify.jsx";
import VerifyEmail from "./components/Authentications/VerifyEmail.jsx"
// import { HomeNavbar } from "./utils/HomeNavbar.jsx";
import { RegisterDesk } from "./utils/RegisterDesk.jsx";


function App() {

  return (
    <>
      <AuthProvider>
        {/* <HomeNavbar/> */}
        <Routes>
          <Route element={<VendorRegister />} path="/hiretalent" />
          <Route element={<DevRegister />} path="/register" />
          <Route element={<VerifyEmail />} path="/email_verify/:token" />
          <Route element={<Login />} path="/login/" />
          <Route element={<LoginOtpVerify />} path="/:otpverify/:email" />
          <Route element={<Home />} path="/" />
          <Route element={<RegisterDesk />} path="/desk" />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
