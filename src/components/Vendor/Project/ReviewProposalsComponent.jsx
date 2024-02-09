import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { Avatar, IconButton } from '@material-tailwind/react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import './proposal.css'

const ReviewProposalsComponent = () => {

  const { authToken, applicants, setApplicants } = useContext(AuthContext)
  console.log(applicants);
  const { projId } = useParams()
  const [selectedCoverLetter, setSelectedCoverLetter] = useState(null);

  const handleMoreClick = (coverLetter) => {
    setSelectedCoverLetter(coverLetter);
  };

  const handleLessClick = () => {
    setSelectedCoverLetter(null);
  };

  const ApplicationListView = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/vendor/applicationslist/${projId}/`, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      const data = response.data.data;
      setApplicants(data);
      console.log(data, '000000000000000');
    } catch (error) {
      console.error('Error fetching applicants:', error);
      console.error('Error fetching applicants:', error.response);
      console.error('Error fetching applicants:', error.message);
    }
  }

  useEffect(() => {
    ApplicationListView()
  }, [])

  function truncateCoverLetter(coverLetter, maxLength) {
    if (coverLetter.length <= maxLength) {
      return coverLetter;
    } else {
      // Find the last space within the maxLength
      let lastSpaceIndex = coverLetter.lastIndexOf(' ', maxLength);
      if (lastSpaceIndex === -1) {
        // If no space found within maxLength, just truncate the string
        return coverLetter.substring(0, maxLength) + '...';
      } else {
        // Truncate the string at the last space within maxLength
        return coverLetter.substring(0, lastSpaceIndex) + '...';
      }
    }
  }



  return (
    <div>
      <div>
        {/* {applicants.map((applicant) => (
            <div key={applicant.id}>
              {applicant.user?.profile_picture && (
                <Avatar src={applicant.developer.profile_picture} alt={`Profile Picture of ${applicant.user.username}`} />
              )}
              <Typography>{applicant.developer.user.username}</Typography>
            </div>
          ))} */}
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <Card key={applicant.id} className="position-relative">
              <Grid container className='p-5'>
                <Grid item xs={2}>
                  <Avatar
                    // alt="Remy Sharp"
                    src="https://imgs.search.brave.com/mJ4YrS_RrRoky0lIxzt6wAE397Ote5gviw2cYAt0WmU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMyMzU3/MS9zY3JlZW5zaG90/cy81NDEyNjExL21l/ZGlhL2I0OTc4YzZk/MjAwMTUxNDQxM2Iy/Y2QxZmIyOWNhY2I4/LmpwZz9yZXNpemU9/NDAweDMwMCZ2ZXJ0/aWNhbD1jZW50ZXI"
                    style={{ width: '100px', height: '100px' }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <div className='flex justify-between'>
                    <div className='flex flex-col mt-2'>
                      <p>{applicant.developer.user.username}</p>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <Button style={{ borderRadius: "15px", textTransform: "none" }} variant="outlined" color="success" className="gap-1">
                        Hire
                      </Button>
                    </div>
                  </div>
                  <h6 style={{ fontWeight: "700", fontSize: "1em", margin: 0 }}>{applicant.developer?.headline}</h6>
                  <p>{applicant.developer.user.country}</p>
                  <p>{applicant.developer?.description}</p>
                  {console.log(<p>Cover Letter - {applicant.cover_letter}</p>)}
                  {applicant.cover_letter && (
                    <div>
                      {selectedCoverLetter === applicant ? (
                        <div className="card">
                          <div className="card-content">
                            <p>Cover Letter - {applicant.cover_letter}</p>
                            <p style={{ color: "green", cursor: "pointer" }} onClick={handleLessClick}>Less</p>
                          </div>
                        </div>
                      ) : (
                        <div className="card">
                          <div className="card-content">
                            <p>Cover Letter - {truncateCoverLetter(applicant.cover_letter, 70)}</p>
                            {applicant.cover_letter.length > 70 && (
                              <p style={{ color: "green", cursor: "pointer" }} onClick={() => handleMoreClick(applicant)}>More</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </Grid>
              </Grid>
              {/* Buttons and Like Icon */}
              <Grid container justifyContent="flex-end" className="position-absolute top-0 end-0 p-2">

              </Grid>
            </Card>
          ))
        ) : (
          <Typography>No applicants yet</Typography>
        )}
      </div>
    </div>
  )
}

export default ReviewProposalsComponent