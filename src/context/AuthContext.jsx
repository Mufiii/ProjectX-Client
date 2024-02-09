import { createContext, useState } from "react";
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()


const AuthProvider = ({ children }) => {

  const navigate = useNavigate()
  const [getView,setGetView] = useState([])
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [educations,setEducations] = useState([])
  const [allSkills, setAllSkills] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [image, setImage] = useState([]);
  const [applicants,setApplicants] = useState([])
  const [store,setStore] = useState([])
  const [formData , setFormData] = useState({ skills: [] })
  const [ profile,setProfile] = useState([])
  const [workspaceData, setWorkspaceData] = useState(null);
  const [developers, setDevelopers] = useState([]);


  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authtokens')?
    JSON.parse(localStorage.getItem('authtokens')):null)

  const [user, setUser] = useState(() => localStorage.getItem('authtokens')?
    jwtDecode(localStorage.getItem('authtokens')):null)


    
    let logoutUser = () => {
      setAuthToken(null)
      setUser(null)
      localStorage.removeItem('authtokens')
      navigate('/login')
  }


  const state = {
    authToken: authToken,
    setAuthToken: setAuthToken,
    user: user,
    setUser: setUser,
    logoutUser:logoutUser,
    getView:getView,
    setGetView:setGetView,
    projects:projects,
    setProjects:setProjects,
    experiences:experiences,
    setExperiences:setExperiences,
    educations:educations,
    setEducations:setEducations,
    allSkills:allSkills,
    setAllSkills:setAllSkills,
    applicants:applicants,
    setApplicants:setApplicants,
    workspaces:workspaces,
    setWorkspaces:setWorkspaces,
    store:store,
    setStore:setStore,
    formData:formData,
    setFormData:setFormData,
    profile:profile,
    setProfile:setProfile,
    image:image,
    setImage: setImage,
    setWorkspaceData:setWorkspaceData,
    workspaceData:workspaceData,
    developers:developers,
    setDevelopers:setDevelopers
  }


  return (
    <AuthContext.Provider value={state}>
        {children}
    </AuthContext.Provider>
  )

}

export default AuthProvider;