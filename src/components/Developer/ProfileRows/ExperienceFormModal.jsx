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
  IconButton,
  FormControlLabel
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { monthOptions } from "../../../utils/MonthOptions";
import { getYearOptions } from "./EducationFormModal";
import Select from 'react-select';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Controller, useForm } from "react-hook-form";


const ExperienceFormModal = ({control}) => {
  const { authToken } = useContext(AuthContext);
  const inputRef = useRef();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const {  setExperiences } = useContext(AuthContext)
  const { handleSubmit, reset } = useForm({ control });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      // Handle form submission logic here (e.g., send data to server)
      console.log('Submitting form data:', data);
  
      // Optionally, perform additional actions here
  
      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error (e.g., display an error message to the user)
    }
  };
   

  const ExperienceView = async (e) => {
    e.preventDefault();

    try {
      
      let response = await axios.post(
        'http://127.0.0.1:8000/developer/experience/',
        {
          designation_title: inputRef.current.designation_title.value,
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
      setExperiences([data])

      if (response.status === 201) {
        console.log("The new experience added successfully");
      }
    } catch (error) {
      console.error('Error adding experience:', error);

      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
        console.log('Response message:', error.message);
      }
    } finally {
      handleClose(); // Close the modal regardless of success or failure
    }
  };

  const checkboxHandler = (e) => {
    console.log(document.getElementById('check').checked);
    setShow(document.getElementById('check').checked);
    // setShow(value);
    setShow(e.target.checked);
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
                <form ref={inputRef} onSubmit={handleSubmit(onSubmit)} >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                    <Controller
                      control={control}
                      name="designation_title"
                      size="small"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Title"
                          type="text"
                          fullWidth
                          margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                    <Controller
                      control={control}
                      name="company"
                      size="small"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Company"
                          type="text"
                          fullWidth
                          margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      {/* <TextField label="Location" size="small" fullWidth name="location" control={control}/> */}
                      <Controller
                      control={control}
                      name="location"
                      size="small"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Location"
                          type="text"
                          fullWidth
                          margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      {/* <TextField label="Country" size="small" fullWidth name="country" control={control}/> */}
                      <Controller
                      control={control}
                      name="country"
                      size="small"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Country"
                          type="text"
                          fullWidth
                          margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className="flex justify-start">
                      <Checkbox id="check" name="currentlyWorking" onChange={checkboxHandler} label="I&apos;m currently working in this role" control={control}/>
                      <Controller
                        control={control}
                        id="check"
                        name="currentlyWorking"
                        onChange={(e) => checkboxHandler(e)}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} size="small" />}
                            label="I'm currently working in this role"
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-around">
                    <div>
                      <Typography variant="small" className="mb-2">
                        Start Date
                      </Typography>
                      <div className="flex space-x-2">
                        <Controller
                          control={control}
                          name="start_month"
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={monthOptions}
                              placeholder="Month"
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name="start_year"
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={getYearOptions()}
                              placeholder="Year"
                            />
                          )}
                        />
                      </div>
                    </div>
                    {!show && (
                      <div>
                        <Typography variant="small" className="mb-2">
                          End Date
                        </Typography>
                        <div className="flex space-x-2">
                          <Controller
                            control={control}
                            name="end_month"
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={monthOptions}
                                placeholder="Month"
                              />
                            )}
                          />  
                          <Controller
                            control={control}
                            name="end_year"
                            render={({ field }) => (
                              <Select
                                {...field}
                                options={getYearOptions()}
                                placeholder="Year"
                              />
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </CardContent>
              <CardActions className="flex justify-end gap-3 mb-4 rounded-md">
                  <Button style={{backgroundColor:"black",color:"white",fontWeight:"bold"}} type="submit" variant="gradient" fullWidth onClick={ExperienceView}>
                    Submit
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


