import React from 'react';
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button
} from "@material-tailwind/react";
import './auth.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';


const Login = () => {

  const navigate = useNavigate()
  const { authToken, user, setAuthToken, setUser } = useContext(AuthContext)
  console.log("111111111111111",authToken);
  console.log("222222222222222",user);

  const LoginPage = async (e) => {
    e.preventDefault()
    try {

      let response = await axios.post('http://127.0.0.1:8000/login/', {
        'email': e.target.email.value,
      })
      const data = response.data
      console.log(data);
      if (response.status == 200) {
        setAuthToken(data); // Set authentication tokens in state
        setUser(jwtDecode(data.access));
        localStorage.setItem('authToken', data.access);
        navigate("/")
      }
    } catch (error) {
      console.log((error));
    }
  }




  return (
    <div>

      <form className="center-card " onSubmit={LoginPage} >

        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" name="email" />
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

    </div>
  )
}

export default Login;