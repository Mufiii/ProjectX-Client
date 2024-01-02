import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import './ProjectList.css'


const ProjectSkills = ({project_id}) => {
  const [skills,setSkills] = useState([])

  const {authToken} = useContext(AuthContext)

  useEffect(() => {
    const GetAllSkills = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/vendor/skills/project_id/?project_id=${project_id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
              'Content-Type': 'application/json',
            },
          }
        );
        const data = response.data;
        setSkills(data)
        console.log(data, '222222222222');
      } catch (error) {
        console.log(error.message);
      }
    };
  
    GetAllSkills();
  }, []);
  console.log(skills,'lllllllllll');


  return (
    <div style={{display:'flex',gap:'10px',margin:'10px'}}>  
      {
        skills.map(skill => (
          <div key={skill.id}>
            <div style={{background:' #DCDCDC',color:'black',padding:'10px 10px',borderRadius:'10px'}}>
            <h1 >{skill.name}</h1>
            </div>
          </div>
        ))
      }
    </div>
  );
  
}

export default ProjectSkills