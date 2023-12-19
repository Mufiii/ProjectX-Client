import React, { useContext, useRef } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Textarea,
  IconButton
} from "@material-tailwind/react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import { useDispatch } from 'react-redux';
import { add_education } from "../../../Redux/slices/educationSlice";
import Select from 'react-select';
import { Modal, Backdrop, Fade } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, index) => currentYear - index);
  return years.map((year) => ({ label: year.toString(), value: year }));
};

const EducationFormModal = () => {
  const { authToken } = useContext(AuthContext);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const EducationEntry = async (e) => {
    e.preventDefault();

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

      const educationData = response.data;
      dispatch(add_education(educationData));
      console.log(educationData);
      if (response.status === 201) {
        console.log("Education added successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose(); // Close the modal regardless of success or failure
    }
  };

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
          <div className="center-card max-w-screen-md mx-auto">
            <Card className="w-full">
              <Typography className="mb-5 mt-5 flex justify-start px-7" variant="h2" color="black">
                Add Education History
              </Typography>
              <form ref={inputRef} onSubmit={EducationEntry}>
                <CardBody className="grid grid-cols-2 gap-2 min-h-36">
                  <label htmlFor="" className="flex justify-start">School</label>
                  <div className="col-span-2">
                    <Input label="Ex: Northwestern University " size="lg" name="school" />
                  </div>
                  <label htmlFor="" className="flex justify-start">Degree</label>
                  <div className="col-span-2">
                    <Input label="Ex: Bachelors" size="lg" name="degree" />
                  </div>
                  <label htmlFor="" className="flex justify-start">Field of study</label>
                  <div className="col-span-2">
                    <Input label="Ex: Computer Science" size="lg" name="field_of_study" />
                  </div>
                  <label htmlFor="" className="flex justify-start">Date Started</label>
                  <div className="flex justify-between items-center">
                    <div className="col-span-2 lg:col-span-1">
                      <Select
                        id="from"
                        options={getYearOptions()}
                        name="from_year"
                        placeholder="From"
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Select
                        options={getYearOptions()}
                        name="to_year"
                        placeholder="To (or expected graduation year)"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Textarea className="h-20 mb-5" label="Describe your studies, Awards, etc.." size="lg" name="description" />
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button type="submit" variant="gradient" fullWidth>
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default EducationFormModal;
