import { Button } from "@material-tailwind/react";
import axios from 'axios';
import { useState } from "react";
// import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom';
import VerifyEmail from "./VerifyEmail";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import './auth.css'


const VendorRegister = () => {

  const [cookie,setCookie] = useCookies()
  console.log(cookie,"jjjjjjjjjjj");

  const [tokens,setToken] = useState([])
  let VendorRegisterView = async(e ) => {
    e.preventDefault()
    try{    
        let response = await axios.post('http://127.0.0.1:8000/hire_talent/', {
            'email': e.target.email.value,
            'first_name': e.target.first_name.value,
            'last_name': e.target.last_name.value,
            'country': e.target.country.value
        })
        
        let data = response.data.data
        console.log(data);
        if (response.status == 201){
          setToken(data.token)
          print("111111111111111111111111111111111",data.token)
          Navigate("/")
          
        }else{
          console.log("gggggggggggggg");
        }
    }catch(error) {
      console.log(error);
    }

  }
  return (
    <div>

    <form onSubmit={VendorRegisterView}>

      <Card className="card">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center">
          <Typography variant="h3" color="white">
            Sign Up
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Email" size="lg" name="email"/>
          <Input label="First Name" size="lg" name="first_name" />
          <Input label="Last Name" size="lg" name="last_name" />
          <Input label="Country" size="lg" name="country" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
              >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  {tokens&&<VerifyEmail token={tokens} />}
      
    </div>
  )
}

export default VendorRegister