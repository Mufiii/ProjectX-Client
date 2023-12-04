import axios from "axios";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button
} from "@material-tailwind/react";
import { useContext,useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
// import { useParams } from "react-router-dom";


const ExperienceForm = () => {

  const {authToken} = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    country: "",
    currentlyWorking: false,
    startDateMonth: "",
    startDateYear: "",
    endDateMonth: "",
    endDateYear: "",
  });

  // console.log(formData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const ExperienceView = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        'http://127.0.0.1:8000/developer/experience/',
        {
          'title': e.target.title.value,
          'company': e.target.company.value,
          'location': e.target.location.value,
          headers: {
            'Authorization': `Bearer ${authToken.access}`
          }
        }
      );
  
      const data = response.data;
      console.log(data);
  
      if (response.status === 201) {
        console.log("The new experience added successfully");
      }
    } catch (error) {
      console.error('Error adding experience:', error);
  
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      }
    }
  };
  


  return (
    <div>
      
      <form onSubmit={ExperienceView} className="center-card w-full max-w-screen-md mx-auto">
        <Card className="w-full border-2 border-solid">
    
          <Typography className="mb-5 flex justify-start px-7" variant="h2" color="black">
            Add Work Experience
          </Typography>
        <CardBody className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input onChange={handleChange} value={formData.title} label="Title" size="lg" name="title" />
          </div>
          <div className="col-span-2">
            <Input onChange={handleChange} value={formData.company} label="Company" size="lg" name="company" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input onChange={handleChange} value={formData.location} label="Location" size="lg" name="location" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input onChange={handleChange} value={formData.country} label="Country" size="lg" name="country" />
          </div>
          <div className="flex justify-start">
            <Checkbox onChange={handleChange} name="currentlyWorking" value={formData.currentlyWorking} label="I&apos;m currently working in this role" />
          </div>
        </CardBody>

        <CardBody className="grid grid-cols-2 gap-4 justify-around">
          <div>
            <Typography variant="body" className="mb-2">
              Start Date
            </Typography>
            <div className="flex space-x-2">
              <Input onChange={handleChange} value={formData.start_month}  placeholder="Month" size="xs" name="start_month" />
              <Input onChange={handleChange} value={formData.start_year} placeholder="Year" size="xs" name="start_year" />
            </div>
          </div>
          <div>
            <Typography variant="body" className="mb-2">
              End Date
            </Typography>
            <div className="flex space-x-2">
              <Input onChange={handleChange} value={formData.end_month} placeholder="Month" size="xs" name="end_month" />
              <Input onChange={handleChange} value={formData.end_month} placeholder="Year" size="xs" name="end_year" />
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0 flex justify-end gap-3 rounded-md">
          <Button color="red" type="submit" variant="gradient">
            Cancel
          </Button>
          <Button color="green" type="submit" variant="gradient">
            Sign In
          </Button>
        </CardFooter>
      </Card>
      
      
    </form>

      
    </div>
  )
}

export default ExperienceForm