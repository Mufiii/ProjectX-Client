import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { Button } from '@mui/material'
import ProjectCreate from './ProjectCreate'

export const ProjectList = () => {

  const { authToken } = useContext(AuthContext)
  const [projects, setProjects] = useState([]);
  
  useEffect(() =>{
  const ProjectView = async () => {
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/vendor/project/', {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
          'Content-Type': 'application/json',
        }
      })
      const data = response.data
      console.log(data);
      setProjects(data)

    }
    catch (error) {
      console.log(error.message);
    }
  }

    ProjectView()
  },[])

  return (
    <div>

      <form>
      <Button as="a" href='/Addprojects' variant="contained" color="success" className='float-right'>
        ADD PROJECT
      </Button>
        <div>
          <h1>Project List</h1>
          {projects.map(project => (
            <div key={project.id} className="project-container">
              <h2>Title: {project.title}</h2>
              <h2>description: {project.description}</h2>
              <h2>note: {project.note}</h2>
              <h2>Skills: {project.skills}</h2>
              <h2>project_type: {project.project_type}</h2>
              <h2>status: {project.status}</h2>
              <h2>price_type: {project.price_type}</h2>
              <h2>price: {project.price}</h2>
              <h2>Category: {project.category ? project.category.name : 'Unknown Category'}</h2>
              <h2>Level: {project.level ? project.level.name : 'Unknown Level'}</h2>
            </div>
          ))}
        </div>
      </form>


    </div>
  )
}
