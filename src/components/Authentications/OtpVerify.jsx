import { useContext, useState, useRef } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { AuthContext } from "../../context/AuthContext"
import './OtpVerify.css'
import { Modal, Box, Button, Typography } from '@mui/material';
import { display } from "@mui/system"

const OtpVerify = () => {

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([0, 0, 0, 0, 0, 0]);
  const [open, setOpen] = useState(true);
  const { user, setUser, setAuthToken } = useContext(AuthContext)
  console.log(user, "hhhhhhhhhhhhhhhhh");
  const { email, otpverify } = useParams()
  const navigate = useNavigate()

  const handleInputChange = (event, index) => {
    if (event.target.value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = event.target.value
      setOtp(newOtp)

      if (index < 5 && event.target.value !== '') {
        inputRefs.current[index + 1].focus()
      }
      if (index > 0 && event.target.value === '') {
        inputRefs.current[index - 1].focus();
      }
    }
  }

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' & index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  }

  const OtpVerify = async (e) => {
    e.preventDefault()
    const enteredOtp = otp.join('');
    try {

      let response = await axios.post(`http://127.0.0.1:8000/${otpverify}/`, {
        "email": email,
        "entered_otp": enteredOtp
      })
      console.log(response, 'dfgh');
      const data = response.data
      console.log(data, "nuhnuihduiwhdhd");
      console.log(data.token);
      if (response.status === 200) {
        localStorage.setItem('authtokens', JSON.stringify(data.token))
        setAuthToken(data.token)
        const decodedToken = jwtDecode(data.token.access)
        console.log(decodedToken);
        setUser(decodedToken)
        if (user && user.is_vendor) {
          navigate('/dashboard');
        } else if (user && user.is_developer) {
          navigate('/home');
        } else {
          null
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  const handleResendOTP = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/resendotp/', {
        email: email
      });
      console.log(response.data); 
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }
  


  const modalstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center',
    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={modalstyle}
        className='modal-otp-verify'
      >
        <Box>

          <form onSubmit={OtpVerify}>
            <div className="otp-verify-Form flex flex-col justify-center ">
              <span className="mainHeading">Enter OTP</span>
              <p className="otpSubheading">We have sent a verification code to your Email Address</p>
              <div className="inputContainer">
                {otp.map((digit, index) => (
                  <input
                    name="otp"
                    key={index}
                    required
                    maxLength="1"
                    type="text"
                    className="otp-input"
                    value={digit}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              {/* <div> */}

              <Button
                variant="contained"
                style={{ backgroundColor: "black", width: "100%", marginTop: "1em" }}
                className="verifyButton"
                type="submit"
              >
                Verify
              </Button>

              <div className="flex justify-between">
                <div style={{ alignSelf: "flex-start" }}> {/* Adjusted alignment */}
                  <Typography onClick={handleResendOTP} style={{cursor:"pointer",fontWeight:"bold",color:"gray"}}>
                    Resend OTP
                  </Typography>
                </div>
                {/* <div>
                  <Typography>
                    time
                  </Typography>
                </div> */}
              </div>


            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default OtpVerify