import axios from 'axios'
import { useEffect,useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const VerifyEmail = ({tokens}) => {

  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const {token} = useParams()

  useEffect(() => {
    
    const Verifyemail = async (token) => {
      console.log('h');
      // e.preventDefault()
      try {
        let response = await axios.get(`http://127.0.0.1:8000/email_verify/?token=${token}`)
        
        const data = response.data
        console.log(response.status);
        if (response.status === 200){
          localStorage.setItem('authtokens',JSON.stringify(data.token))
          const decodedToken = jwtDecode(data.token.access)
          setUser(decodedToken)
          navigate("/")
        }
      } catch (error) {
        console.error('Error verifying email:', error);
    }
  }
  Verifyemail(token);
},[])

}

export default VerifyEmail