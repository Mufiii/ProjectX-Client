import { Button } from "@material-tailwind/react";
import axios from 'axios';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import './auth.css'



const VendorRegister = () => {


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

    }catch(error) {
      console.error('Error registering vendor:', error);
    }

  }
  return (
    <div>

<form className="center-card w-full max-w-screen-md mx-auto" onSubmit={VendorRegisterView}>
  <Card className="w-full">
    
      <Typography className="mb-5 mt-5 flex justify-center" variant="h2" color="black">
        Sign up to hire talent
      </Typography>
    <CardBody className="grid grid-cols-2 gap-4">
      <div className="col-span-2 lg:col-span-1">
        <Input label="First Name" size="lg" name="first_name" />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <Input label="Last Name" size="lg" name="last_name" />
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

export default VendorRegister