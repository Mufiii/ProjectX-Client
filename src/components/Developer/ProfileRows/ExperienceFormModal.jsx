import { useContext, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Checkbox,
  Button,
  Modal,
  Backdrop,
  Fade,
  IconButton
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { monthOptions } from "../../../utils/MonthOptions";
import { getYearOptions } from "./EducationFormModal";
import Select from 'react-select';
import AddCircleIcon from '@mui/icons-material/AddCircle';


const ExperienceFormModal = () => {
  const { authToken } = useContext(AuthContext);
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ExperienceView = async (e) => {
    e.preventDefault();

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
          is_working: show
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
    } finally {
      handleClose(); // Close the modal regardless of success or failure
    }
  };

  const checkboxHandler = () => {
    console.log(document.getElementById('check').checked);
    setShow(document.getElementById('check').checked);
  }

  return (
    <div>
      <IconButton  onClick={handleOpen} color="primary">
        <AddCircleIcon style={{color:"green" , height:"40px",width:"40px"}} />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="center-card w-full max-w-screen-md mx-auto">
            <Card className="w-full border-2 border-solid">
              <CardContent>
                <Typography className="mb-5 flex justify-start px-7" variant="h2" color="black">
                  Add Work Experience
                </Typography>
                <form ref={inputRef} onSubmit={ExperienceView}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <TextField label="Title" size="small" fullWidth name="title" />
                    </div>
                    <div className="col-span-2">
                      <TextField label="Company" size="small" fullWidth name="company" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <TextField label="Location" size="small" fullWidth name="location" />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <TextField label="Country" size="small" fullWidth name="country" />
                    </div>
                    <div className="flex justify-start">
                      <Checkbox id="check" name="currentlyWorking" onChange={checkboxHandler} label="I&apos;m currently working in this role" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-around">
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
                    {!show && <div>
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
                  </div>
                </form>
              </CardContent>
              <CardActions className="flex justify-end gap-3 rounded-md">
                <Button color="error" onClick={handleClose}>
                  Cancel
                </Button>
                <Button color="success" type="submit" onClick={ExperienceView}>
                  Sign In
                </Button>
              </CardActions>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ExperienceFormModal;




// import axios from "axios";
// import { getYearOptions } from "./EducationFormModal";
// import {
//   Card,
//   CardBody,
//   CardFooter,
//   Typography,
//   Input,
//   Checkbox,
//   Button,
// } from "@material-tailwind/react";
// import { useContext, useRef, useState } from "react";
// import { AuthContext } from "../../../context/AuthContext";
// import { monthOptions } from "../../../utils/MonthOptions";
// import Select from 'react-select'


// const ExperienceFormModal = () => {

//   const { authToken } = useContext(AuthContext)
//   const inputRef = useRef()
//   const [show, setShow] = useState(false)
 

//   const ExperienceView = async (e) => {
//     e.preventDefault();

//     try {
//       let response = await axios.post(
//         'http://127.0.0.1:8000/developer/experience/',
//         {
//           title: inputRef.current.title.value,
//           company: inputRef.current.company.value,
//           location: inputRef.current.location.value,
//           country: inputRef.current.country.value,
//           start_date: `year:${inputRef.current.start_year.value}-month:${inputRef.current.start_month.value}`,
//           end_date: !show
//             ? `year:${inputRef.current.end_year.value}-month:${inputRef.current.end_month.value}`
//             : null,
//           is_working:show
//         },
        
//         {
//           headers: {
//             'Authorization': `Bearer ${authToken.access}`
//           }
//         }
//       );

//       const data = response.data;
//       console.log(data);

//       if (response.status === 201) {
//         console.log("The new experience added successfully");
//       }
//     } catch (error) {
//       console.error('Error adding experience:', error);

//       if (error.response) {
//         console.log('Response data:', error.response.data);
//         console.log('Response status:', error.response.status);
//         console.log('Response headers:', error.response.headers);
//       }
//     }
//   };
   
  
//   const checkboxHandler = ()=>{
//   console.log(document.getElementById('check').checked);
//   if (document.getElementById('check').checked) {
//     setShow(true);

//   } else {
//     setShow(false);
//   }}

//   return (
//     <div>
      
//       <form ref={inputRef} onSubmit={ExperienceView} className="center-card w-full max-w-screen-md mx-auto">
//         <Card className="w-full border-2 border-solid">

//           <Typography className="mb-5 flex justify-start px-7" variant="h2" color="black">
//             Add Work Experience
//           </Typography>
//           <CardBody className="grid grid-cols-2 gap-4">
//             <div className="col-span-2">
//               <Input label="Title" size="lg" name="title" />
//             </div>
//             <div className="col-span-2">
//               <Input label="Company" size="lg" name="company" />
//             </div>
//             <div className="col-span-2 lg:col-span-1">
//               <Input label="Location" size="lg" name="location" />
//             </div>
//             <div className="col-span-2 lg:col-span-1">
//               <Input label="Country" size="lg" name="country" />
//             </div>
//             <div className="flex justify-start">
//               <Checkbox id="check" name="currentlyWorking" onChange={checkboxHandler} label="I&apos;m currently working in this role" />
//             </div>
//           </CardBody>

//           <CardBody className="grid grid-cols-2 gap-4 justify-around">
//             <div>
//               <Typography variant="small" className="mb-2">
//                 Start Date
//               </Typography>
//               <div className="flex space-x-2">
//                   <Select
//                   options={monthOptions}
//                   name="start_month"
//                   placeholder="Month"
//                 />
//                   <Select
//                   options={getYearOptions()}
//                   name="start_year"
//                   placeholder="Year"
//                 />
//               </div>
//             </div>
//             {!show &&<div>
//               <Typography variant="small" className="mb-2">
//                 End Date
//               </Typography>
//                <div className="flex space-x-2">
//                <Select
//                   options={monthOptions}
//                   name="end_month"
//                   placeholder="Month"
//                   />
//                   <Select
//                   options={getYearOptions()}
//                   name="end_year"
//                   placeholder="Year"
//                   />
//               </div>
//             </div>}
//           </CardBody>
//           <CardFooter className="pt-0 flex justify-end gap-3 rounded-md">
//             <Button color="red" type="submit" variant="gradient">
//               Cancel
//             </Button>
//             <Button color="green" type="submit" variant="gradient">
//               Sign In
//             </Button>
//           </CardFooter>
//         </Card>

//       </form>

//     </div>
//   )
// }

// export default ExperienceFormModal