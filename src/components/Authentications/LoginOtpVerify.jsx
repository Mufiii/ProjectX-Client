import {useContext} from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { AuthContext } from "../../context/AuthContext"

const LoginOtpVerify = () => {


  const {user,setUser} = useContext(AuthContext)
  console.log(user,"hhhhhhhhhhhhhhhhh");
  const {email,otpverify} = useParams()
  const navigate = useNavigate()

  const OtpVerify = async (e) => {
      e.preventDefault()
    try{

      let response = await axios.post(`http://127.0.0.1:8000/${otpverify}/`,{
        "email" :email,
        "entered_otp":e.target.otp.value
      })
      const data = response.data
      console.log(data,"nuhnuihduiwhdhd");
      console.log(data.token);
      if (response.status === 200){
        localStorage.setItem('authtokens',JSON.stringify(data.token))
        const decodedToken = jwtDecode(data.token.access)
        console.log(decodedToken);
        setUser(decodedToken)
        navigate("/")
      }
    }catch(error){
        console.log(error);
    }
  }



  return (
    <div>
      <form onSubmit={OtpVerify}>
      <label>
          OTP:
          <input type="text" name="otp" />
        </label>
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  )
}

export default LoginOtpVerify