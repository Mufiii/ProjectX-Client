import axios from "axios";
import { getYearOptions } from "./EducationForm";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { monthOptions } from "../../../utils/MonthOptions";
import Select from 'react-select'


const ExperienceFormModal = () => {

  const { authToken } = useContext(AuthContext)
  const inputRef = useRef()
  const [show, setShow] = useState(false)
  // const [isOpen, setIsOpen] = useState(false);

  // const openModal = () => setIsOpen(true);
  // const closeModal = () => setIsOpen(false);
 

  const ExperienceView = async (e) => {
    e.preventDefault();
    if (document.getElementById('check').checked) {
      setShow(true);

    } else {
      setShow(false);
    }

    try {
      let response = await axios.post(
        'http://127.0.0.1:8000/developer/experience/',
        {
          title: inputRef.current.title.value,
          company: inputRef.current.company.value,
          location: inputRef.current.location.value,
          country: inputRef.current.country.value,
          start_date: `year:${inputRef.current.start_year.value}-month:${inputRef.current.start_month.value}`,
          end_date: !show
            ? `year:${inputRef.current.end_year.value}-month:${inputRef.current.end_month.value}`
            : null,
          is_working:show
        },
        
        {
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
   
  
  const checkboxHandler = ()=>{
  console.log(document.getElementById('check').checked);
  if (document.getElementById('check').checked) {
    setShow(true);

  } else {
    setShow(false);
  }}

  return (
    <div>
      
      <form ref={inputRef} onSubmit={ExperienceView} className="center-card w-full max-w-screen-md mx-auto">
        <Card className="w-full border-2 border-solid">

          <Typography className="mb-5 flex justify-start px-7" variant="h2" color="black">
            Add Work Experience
          </Typography>
          <CardBody className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input label="Title" size="lg" name="title" />
            </div>
            <div className="col-span-2">
              <Input label="Company" size="lg" name="company" />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input label="Location" size="lg" name="location" />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input label="Country" size="lg" name="country" />
            </div>
            <div className="flex justify-start">
              <Checkbox id="check" name="currentlyWorking" onChange={checkboxHandler} label="I&apos;m currently working in this role" />
            </div>
          </CardBody>

          <CardBody className="grid grid-cols-2 gap-4 justify-around">
            <div>
              <Typography variant="small" className="mb-2">
                Start Date
              </Typography>
              <div className="flex space-x-2">
                  <Select
                  options={monthOptions}
                  name="start_month"
                  placeholder="Month"
                />
                  <Select
                  options={getYearOptions()}
                  name="start_year"
                  placeholder="Year"
                />
              </div>
            </div>
            {!show &&<div>
              <Typography variant="small" className="mb-2">
                End Date
              </Typography>
               <div className="flex space-x-2">
               <Select
                  options={monthOptions}
                  name="end_month"
                  placeholder="Month"
                  />
                  <Select
                  options={getYearOptions()}
                  name="end_year"
                  placeholder="Year"
                  />
              </div>
            </div>}
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

export default ExperienceFormModal