import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { useParams } from "react-router-dom"



const ApplicantsList = () => {

  const {authToken,applicants,setApplicants} = useContext(AuthContext)
  const {projectId} = useParams()


  const ApplicationListView = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/vendor/applicationslist/${projectId}`, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      const data = response.data.data;
      setApplicants(data);
      console.log(data, '000000000000000');
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  }

  useEffect(()=>{
    ApplicationListView()
  },[])

  return (
    <div>
        {applicants.map((applicant) => (
          <div key={applicant.id}>
            {applicant.user?.profile_picture && (
              <Avatar src={applicant.developer.profile_picture} alt={`Profile Picture of ${applicant.user.username}`} />
            )}
            <Typography>{applicant.developer.user.username}</Typography>
          </div>
        ))}
    </div>
  )
}

export default ApplicantsList