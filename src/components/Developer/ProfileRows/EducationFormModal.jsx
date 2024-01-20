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
import Select from 'react-select';
import { Modal, Backdrop, Fade } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Controller, useForm } from "react-hook-form";

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 40 }, (_, index) => currentYear - index);
  return years.map((year) => ({ label: year.toString(), value: year }));
};

const EducationFormModal = ({ control }) => {
  const { authToken, setEducations } = useContext(AuthContext);
  const inputRef = useRef();
  const [open, setOpen] = React.useState(false);
  const { handleSubmit } = useForm({ control });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data, 'Data from EducationFormModal');
    EducationEntry(data);
  };

  const EducationEntry = async (data) => {
    data.preventDefault();

    try {
      let response = await axios.post(
        'http://127.0.0.1:8000/developer/education/',
        {
          school: inputRef.current.school.value,
          degree: inputRef.current.degree.value,
          field_of_study: inputRef.current.field_of_study.value,
          from_year: inputRef.current.from_year.value,
          to_year: inputRef.current.to_year.value,
          note: inputRef.current.note.value,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        }
      );

      const educationData = response.data;
      setEducations([educationData])
      if (response.status === 201) {
        console.log("Education added successfully");
      }
    } catch (error) {
      console.error('Error adding education:', error);
    } finally {
      handleClose(); // Close the modal regardless of success or failure
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen} color="primary">
        <AddCircleIcon style={{ color: "green", height: "40px", width: "40px" }} />
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
              <form ref={inputRef} onSubmit={handleSubmit(onSubmit)}>
                <CardBody className="grid grid-cols-2 gap-2 min-h-36">
                  <label htmlFor="" className="flex justify-start">School</label>
                  <div className="col-span-2">
                    {/* <Input label="Ex: Northwestern University " size="lg" name="school" /> */}
                    <Controller
                      control={control}
                      name="school"
                      size="small"
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="School"
                          type="text"
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </div>
                  <label htmlFor="" className="flex justify-start">Degree</label>
                  <div className="col-span-2">
                    {/* <Input label="Ex: Bachelors" size="lg" name="degree" /> */}
                    <Controller
                      control={control}
                      name="degree"
                      size="small"
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Degree"
                          type="text"
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </div>
                  <label htmlFor="" className="flex justify-start">Field of study</label>
                  <div className="col-span-2">
                    {/* <Input label="Ex: Computer Science" size="lg" name="field_of_study" /> */}
                    <Controller
                      control={control}
                      name="field_of_study"
                      size="small"
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Field of study"
                          type="text"
                          fullWidth
                          margin="normal"
                        />
                      )}
                    />
                  </div>
                  <label htmlFor="" className="flex justify-start">Date Started</label>
                  <div className="flex justify-between items-center">
                    <div className="col-span-2 lg:col-span-1">
                      <Controller
                        control={control}
                        id="from"
                        name="from_year"
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={getYearOptions()}
                            placeholder="From"
                          />
                        )}
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Controller
                        control={control}
                        id="from"
                        name="to_year"
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={getYearOptions()}
                            placeholder="To (or expected graduation year)"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <Controller
                      control={control}
                      className="h-20 mb-5"
                      size="lg"
                      name="note"
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          options={getYearOptions()}
                          label="Describe your studies, Awards, etc.."
                        />
                      )}
                    />
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button type="submit" variant="gradient" fullWidth onClick={EducationEntry}>
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
