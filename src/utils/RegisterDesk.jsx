import {
  Card,
  CardHeader,
  // CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function RegisterDesk() {
  
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    if (option.target.value === "freelancer") {
      
      setSelectedOption(true);
      
    } else {
      // Otherwise, select the clicked option
      setSelectedOption(false);
      
    }
  };

  const handleSubmit = () =>{
      if (selectedOption == true){
        navigate("/register")
      }else{
        navigate("/hiretalent")
      }
  }

  
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-[50rem] flex-col h-[40rem] p-8">
        <div className="flex justify-center items-center">
          <Typography variant="h3" color="blue-gray" className="mb-4 text-center">
            Join as a client or freelancer
          </Typography>
        </div>

        <div className="flex justify-between items-center h-[25rem]">
          <CardHeader
            shadow={false}
            floated={false}
            className="w-2/5 rounded-r-none"
          >
            <label className="relative cursor-pointer text-green-500">
              <img
                src="https://img.freepik.com/free-vector/company-employees-use-web-search-find-ideas-doing-business-company_1150-43196.jpg?size=626&ext=jpg&ga=GA1.1.2058335388.1701320622&semt=ais"
                alt="card-image"
                className="w-full object-cover rounded-lg border-4 border-green-500 "
                />
              <input onChange={handleOptionSelect} type="radio" color="green" className="absolute top-3 right-3 w-6 h-6" name="userType" value="freelancer" />
            </label>
            <Typography variant="h6" color="blue-gray" className="mb-4 text-center"> 
                I’m a freelancer, looking for work
            </Typography>
          </CardHeader>

          <CardHeader
            shadow={false}
            floated={false}
            className="w-2/5 rounded-r-none"
          >
            <label className="relative cursor-pointer text-green-500">
              <img
                src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-businessman_516790-114.jpg?size=626&ext=jpg&ga=GA1.1.2058335388.1701320622&semt=ais"
                alt="card-image"
                className="w-full object-cover rounded-lg border-4 border-green-700 "
                />
                <input onChange={handleOptionSelect} type="radio" color="green" className="absolute top-3 right-3 w-6 h-6" name="userType" value="client" />
            </label>
            <Typography variant="h6" color="blue-gray" className="mb-4 text-center">   
               I’m a client, hiring for a project
            </Typography>
          </CardHeader>
        </div>
        <div>
          { selectedOption == null ? <Button size="xl" disabled className="rounded-full" color="green">Create Account</Button>
          :
          <Button onClick={handleSubmit}  className="rounded-full w-60 h-12" color="green">{selectedOption?"Apply as a Freelancer":"Join as a Client"}</Button>}
          <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                <a href="/login">Sign in</a>
            </Typography>
            </Typography>
        </div>
      </Card>
    </div>
  );
}
