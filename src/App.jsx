import AuthProvider from "./context/AuthContext"
import VendorRegister from "./components/Authentications/VendorRegister"
import DevRegister from "./components/Authentications/DeveloperRegister.jsx"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from './components/Authentications/Login.jsx';
import OtpVerify from "./components/Authentications/OtpVerify.jsx";
import VerifyEmail from "./components/Authentications/VerifyEmail.jsx"
import { HomeNavbar } from "./utils/HomeNavbar.jsx";
import { RegisterDesk } from "./utils/RegisterDesk.jsx";
import Welcome1 from "./components/Developer/ProfileRows/Welcome1.jsx"
import { DeveloperProfile } from "./components/Developer/ProfileRows/DeveloperProfile.jsx"
import ExperienceFormModal from "./components/Developer/ProfileRows/ExperienceFormModal.jsx"
import EducationForm from "./components/Developer/ProfileRows/EducationForm.jsx"


function App() {

  return (
    <>
      <AuthProvider>
        <HomeNavbar />
        <Routes>
          <Route element={<VendorRegister />} path="/hiretalent" />
          <Route element={<DevRegister />} path="/register" />
          <Route element={<VerifyEmail />} path="/email_verify/:token" />
          <Route element={<Login />} path="/login/" /><Route element={<OtpVerify />} path="/:otpverify/:email" />
          <Route element={<Home />} path="/" />
          <Route element={<RegisterDesk />} path="/desk" />
          <Route element={<Welcome1 />} path="/welcome" />
          <Route element={<DeveloperProfile />} path="/profilesetup" />
          <Route element={<ExperienceFormModal />} path="/test" />
          <Route element={<EducationForm />} path="/test1" />

        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
