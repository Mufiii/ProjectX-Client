import axios from "axios"
import './auth.css'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";


const DeveloperRegister = () => {

  const otpverify = "verifyotp"
  const navigate = useNavigate()

  const DevRegister = async (e) => {
      e.preventDefault()
    try{

      let response = await axios.post('http://127.0.0.1:8000/register/',{
        'email':e.target.email.value,
        'username':e.target.username.value,
        'first_name':e.target.first_name.value,
        'last_name':e.target.last_name.value,
        'country':e.target.country.value
      })
      const data = response.data
      console.log("dcscedcwdwd",data);
      if (response.status === 201){
          const email = e.target.email.value;
          console.log(email,"dfgh");
          navigate(`/${otpverify}/${email}`);
      }
    }catch(error){
      console.log((error));
    }
  } 



  return (
    <div>
      
  <form className="center-card w-full max-w-screen-md mx-auto" onSubmit={DevRegister}>
    <Card className="w-full">
      <Typography className="mb-5" variant="h2" color="black">
        Sign up to find work you love
      </Typography>
    <CardBody className="grid grid-cols-2 gap-4">
      <div className="col-span-2 lg:col-span-1">
        <Input label="First Name" size="lg" name="first_name" />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Input label="Last Name" size="lg" name="last_name" />
      </div>
      <div className="col-span-2">
        <Input label="Username" size="lg" name="username" />
      </div>
      <div className="col-span-2">
        <Input label="Email" size="lg" name="email" />
      </div>
      <div className="col-span-2">
        <Input label="Country" size="lg" name="country" />
      </div>
      <div className="flex justify-start">
        <Checkbox label="Remember Me" />
      </div>
    </CardBody>
    <CardFooter className="pt-0">
      <Button type="submit" variant="gradient" fullWidth>
        Sign In
      </Button>
      <Typography variant="small" className="mt-6 flex justify-center">
        Already have an account?
        <Typography as="a" href="/login" variant="small" color="blue-gray" className="ml-1 font-bold">
          Sign in
        </Typography>
      </Typography>
    </CardFooter>
  </Card>
</form>


    </div>
  )
}

export default DeveloperRegister