import axios from 'axios'
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useEffect } from 'react'
import { Avatar, Button, Grid } from '@mui/material'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import ProjectDetailPage from './ProjectDetailPage'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const HireDevelopersComponent = () => {

  const { authToken, hiredDevelopers, setHiredDevelopers } = useContext(AuthContext)
  const { projId } = useParams()


  const HireDevelopers = async () => {

    try {
      const headers = {
        Authorization: `Bearer ${authToken.access}`,
        'Content-Type': 'application/json',
      };
      const response = await axios({
        url: `http://127.0.0.1:8000/hire/?project_id=${projId}`,
        method: 'GET',
        headers: headers
      })
      console.log(response.data, 'qqqqqqqqq');
      setHiredDevelopers(response.data);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  }
  console.log("hiredDevelopers", hiredDevelopers);

  useEffect(() => {
    HireDevelopers()
  }, [])

  return (

    <>
      <div className='mt-3'>
        <div className='mb-3'>
          <p className='font-bold'>Hired Developers</p>
        </div>
        {hiredDevelopers && hiredDevelopers.length > 0 ? (
          hiredDevelopers.map(({ applicant }) => (
            applicant && applicant.map((user) => (
              <Card key={user.id} className="position-relative">
                <Grid container className='p-5'>
                  <Grid item xs={2}>
                    <Avatar
                      alt="Remy Sharp"
                      // src={user.dev_profile?.profile_picture}
                      src="https://imgs.search.brave.com/mJ4YrS_RrRoky0lIxzt6wAE397Ote5gviw2cYAt0WmU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMyMzU3/MS9zY3JlZW5zaG90/cy81NDEyNjExL21l/ZGlhL2I0OTc4YzZk/MjAwMTUxNDQxM2Iy/Y2QxZmIyOWNhY2I4/LmpwZz9yZXNpemU9/NDAweDMwMCZ2ZXJ0/aWNhbD1jZW50ZXI"
                      style={{ width: '100px', height: '100px' }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <div className='flex flex-col'>
                      <div className='flex justify-between'>
                        <div>
                          <p style={{ color: "black" }}>{user.user.first_name} {user.user.last_name}</p>
                          <p style={{ color: "black", fontWeight: "bold", fontSize: "1.1em" }}>{user.headline} </p>
                        </div>
                        <div>
                          <Button
                            style={{
                              backgroundColor: "green", // Set your desired color here
                              textTransform: "none",
                              opacity: 0.65, // Adjust opacity to indicate it's disabled
                              pointerEvents: "none", // Disable pointer events to prevent click action
                            }}
                            className="gap-1" variant='contained' color='success' 
                          >
                            Hired
                            <CheckCircleOutlineIcon style={{color:'white'}}/>
                          </Button>
                        </div>
                      </div>
                      <p style={{ color: "black" }}>{user.description} </p>
                      <p style={{ color: "black" }}>{user.city}, {user.state}, {user.user.country}</p>
                    </div>
                  </Grid>
                </Grid>
                <Grid container justifyContent="flex-end" className="position-absolute top-0 end-0 p-2">

                </Grid>
              </Card>
            ))
          ))
        ) : (
          <p style={{ color: "gray", fontWeight: "bold", fontSize: "1.1em" }} className='flex justify-center mb-3'>
            No developers have been hired yet.
          </p>
        )}
      </div>
    </>
  )
}

export default HireDevelopersComponent