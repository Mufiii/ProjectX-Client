import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button
} from "@material-tailwind/react";
import axios from "axios";
import { useContext , useState} from "react";
import { AuthContext } from "../../../context/AuthContext";
import {useDispatch} from 'react-redux'
import{ add_education } from "../../../Redux/slices/educationSlice";


const EducationForm = () => {

  const [data, setData] = useState({
    school: '',
    degree: '',
    field_of_study: '',
    from_year: '',
    to_year: '',
    description:''
    
  });


  const {authToken} = useContext(AuthContext)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const EducationEntry = async (e) => {
      e.preventDefault()
    try{
      let response = await axios.post(
        'http://127.0.0.1:8000/developer/education/',
        data,  
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
      
      <form onSubmit={EducationEntry} className="center-card max-w-screen-md mx-auto">
        <Card className="w-full">
    
          <Typography className="mb-5 flex justify-start px-7" variant="h2" color="black">
            Add Education History
          </Typography>
        <CardBody className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input onChange={handleChange} value={data.school} label="School" size="lg" name="school" />
          </div>
          <div className="col-span-2">
            <Input onChange={handleChange} value={data.degree} label="Degree" size="lg" name="degree" />
          </div>
          <div className="col-span-2">
            <Input onChange={handleChange} value={data.field_of_study} label="Field Of Study" size="lg" name="field_of_study" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input onChange={handleChange} value={data.from_year} label="From" size="lg" name="from_year" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <Input onChange={handleChange} value={data.to_year} label="To (or expected graduation year)" size="lg" name="to_year" />
          </div>
          <div className="col-span-2">
            <Input onChange={handleChange} value={data.description} label="Description" size="lg" name="description" />
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