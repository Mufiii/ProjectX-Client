import AuthProvider from "./context/AuthContext"
import VendorRegister from "./components/Authentications/VendorRegister"
import DevRegister from "./components/Authentications/DeveloperRegister.jsx"
import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./components/HomePage/Home.jsx"
import Login from './components/Authentications/Login.jsx';
import OtpVerify from "./components/Authentications/OtpVerify.jsx";
import VerifyEmail from "./components/Authentications/VerifyEmail.jsx"
import HomeNavbar from './utils/HomeNavbar.jsx';
import { RegisterDesk } from "./utils/RegisterDesk.jsx";
import Welcome1 from "./components/Developer/ProfileRows/Welcome1.jsx"
import VendorUpdateProfile from "./components/Vendor/VendorProfile/VendorUpdateProfile.jsx"
import DeveloperProfile from "./components/Developer/ProfileRows/DeveloperProfile.jsx"
import PrivateRouter from "./private/PrivateRouter.jsx"
import { ProjectList } from "./components/Vendor/Project/ProjectList.jsx"
import ProjectCreate from "./components/Vendor/Project/ProjectCreate.jsx"
import ProjectSkills from "./components/Vendor/Project/ProjectSkills.jsx"
import ProjectDetail from "./components/Developer/DeveloperProject/ProjectDetail.jsx"
// import ApplicantsList from "./components/Vendor/Applicants/ApplicantsList.jsx"
import VendorProjectDetailPage from "./components/Vendor/Project/VendorProjectDetailPage.jsx"
import Workspace from "./Monitorization/Workspace/Workspace.jsx"
import CreateWorkSpace from "./Monitorization/Workspace/CreateWorkSpace.jsx"
import GetWorkspace from "./Monitorization/Workspace/GetWorkspace.jsx"
import Secondbar from "./utils/Secondbar.jsx"
import CreateBoard from "./Monitorization/Board/CreateBoard.jsx"
import Footer from "./utils/Footer.jsx"
import DevProfile from "./components/Developer/ProfileRows/DevProfile.jsx"
import HeroSection from "./components/Landing Pages/HeroSection.jsx"
import Dashboard from "./components/Vendor/Dashboard/Dashboard.jsx"
import ProjectDetailPage from './components/Vendor/Project/ProjectDetailPage.jsx'
import InviteFreelancersComponent from "./components/Vendor/Project/InviteFreelancersComponent.jsx"
import ReviewProposalsComponent from "./components/Vendor/Project/ReviewProposalsComponent.jsx"
// import DevelopersList from "./components/Vendor/Project/DevelopersList.jsx"
// import Card from "./Monitorization/Board/Card.jsx"
import VendorRouter from "./private/VendorRouter.jsx"
import DeveloperRouter from "./private/DeveloperRouter.jsx"
import HomeScreen from "./components/Chatroom/HomeScreen.jsx"
// import ApplySuccessModal from './utils/ApplySuccessModal.jsx'
import ApplySuccessModal from "./utils/ApplySuccessModal.jsx"


function App() {


  const location = useLocation(null)

  const isLoginPageOrIsRegisterPage = location.pathname.includes('login')|| location.pathname.includes('register') ||
                                      location.pathname.includes('desk') || location.pathname.includes('hiretalent') ||
                                      location.pathname.includes('otpverify')

  return (
    <>
      <AuthProvider >
        {!isLoginPageOrIsRegisterPage && <HomeNavbar />}
        <Routes>
          <Route element={<VendorRegister />} path="/hiretalent" />
          <Route element={<DevRegister />} path="/register" />
          <Route element={<VerifyEmail />} path="/email_verify/:token" />
          <Route element={<Login />} path="/login/" />

          <Route element={<Workspace />} path="/workspace" >
            <Route index element={<Secondbar />} />
            <Route element={<GetWorkspace />} path="/workspace/:workspace_id" />
            {/* <Route element={<Card/>}/> */}
          </Route>

          <Route element={<VendorRouter><Dashboard/></VendorRouter>} path="/dashboard" />
          <Route element={<VendorRouter><ProjectDetailPage/></VendorRouter>} path="/dashboard/:projId" />
          <Route element={<VendorRouter><VendorUpdateProfile /></VendorRouter>} path="/profile" />
          {/* <Route element={<DevelopersList />} path="/dashboard/developers" /> */}


          <Route element={<OtpVerify />} path="/:otpverify/:email" />
          <Route element={<PrivateRouter><Home /></PrivateRouter>} path="/home" />
          <Route element={<RegisterDesk />} path="/desk" />
          <Route element={<Welcome1 />} path="/welcome" />
          <Route element={<DeveloperRouter><DeveloperProfile /></DeveloperRouter>} path="/profilesetup" />
          <Route element={<ProjectList />} path="/projects" />
          <Route element={<ProjectDetail />} path="/projects/:project_id" />
          <Route element={<ProjectCreate />} path="/addprojects/" />
          <Route element={<ProjectSkills />} path="/skills/" />
          <Route element={<ReviewProposalsComponent />} path="/dashboard/:projectId" />
          <Route element={<VendorProjectDetailPage />} path="/projects/detail/:id" />
          {/* <Route element={<CreateWorkSpace />} path="/create" /> */}
          <Route element={<CreateBoard />} path="/boards/:id" />
          <Route element={<Footer />} path="/footer" />
          <Route element={<DeveloperRouter><DevProfile /></DeveloperRouter>} path="/devprofile" />
          <Route element={<CreateBoard />} path="/boards" />
          <Route element={<HeroSection />} path="/" />
          <Route element={<ApplySuccessModal/>} path="appp"/>

          <Route path="chat/" exact element={<HomeScreen/>} />
          <Route path="chat/:chatId" exact element={<HomeScreen/>} />

        </Routes>
        {/* <Footer/> */}
      </AuthProvider>
    </>
  )
}


export default App
