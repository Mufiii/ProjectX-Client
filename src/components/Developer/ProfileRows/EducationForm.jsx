import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { useContext , useRef} from "react";
import { AuthContext } from "../../../context/AuthContext";
import {useDispatch} from 'react-redux'
import{ add_education } from "../../../Redux/slices/educationSlice";
import Select from 'react-select'
// import { useNavigate } from "react-router-dom";

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, index) => currentYear - index);
  return years.map((year) => ({ label: year.toString(), value: year }));
};

const EducationForm = () => {

  const {authToken} = useContext(AuthContext)
  const inputRef = useRef()
  const dispatch = useDispatch()


 

  const EducationEntry = async (e) => {
      e.preventDefault()
    
try {
  let response = await axios.post(
    'http://127.0.0.1:8000/developer/education/',
    {
      school: inputRef.current.school.value,
      degree: inputRef.current.degree.value,
      field_of_study: inputRef.current.field_of_study.value,
      start_date: inputRef.current.from_year.value,
      end_date: inputRef.current.to_year.value,
      description: inputRef.current.description.value,
    },
    {
      headers: {
        Authorization: `Bearer ${authToken.access}`,
      },
    }
  );

      const educationData = response.data
      dispatch(add_education(educationData))
      console.log(educationData);
      if (response.status == 201) {
          console.log("Education added successfully");
      }
    }catch(error){
      console.log((error));
    }
  }


  return (
    <div>
      
      <form ref={inputRef} onSubmit={EducationEntry} className="center-card max-w-screen-md mx-auto">
        <Card className="w-full">
    
          <Typography className="mb-5 mt-5 flex justify-start px-7" variant="h2" color="black">
            Add Education History
          </Typography>
        <CardBody className="grid grid-cols-2 gap-2 min-h-36">
          <label htmlFor="" className="flex justify-start">School</label>
          <div className="col-span-2">
            <Input  label="Ex: Northwestern University " size="lg" name="school" />
          </div>
          <label htmlFor="" className="flex justify-start">Degree</label>
          <div className="col-span-2">
            <Input label="Ex: Bachelors" size="lg" name="degree" />
          </div>
          <label htmlFor="" className="flex justify-start">Field of study</label>
          <div className="col-span-2">
            <Input val label="Ex: Computer Science" size="lg" name="field_of_study" />
          </div>
          {/* <label htmlFor="" className="flex justify-start">Date Started</label> */}
          <div className="col-span-2 lg:col-span-1">
            <Select
              id="from"
              options={getYearOptions()}
              name="from_year"
            />
          </div>
          <div className="col-span-2 lg:col-span-1">
            {/* <label htmlFor="" className="flex justify-start">To (or expected graduation year)</label> */}
            <Select
              options={getYearOptions()}
              name="to_year"
            />
            </div>
          <div className="col-span-2">
            <Textarea  className="h-20 mb-5" label="Describe your studies,Awards etc.." size="lg" name="description" />
          </div>
        </CardBody>
        
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>

      
    </div>
  )
}



export default EducationForm