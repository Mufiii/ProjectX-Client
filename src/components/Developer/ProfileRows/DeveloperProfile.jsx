import { Input } from "@mui/material";
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import ExperienceFormModal from "./ExperienceFormModal"
import EducationFormModal from "./EducationFormModal";
import Avatar from '@mui/material/Avatar';
import {
  TextField,
  Button,
  Card,
  Autocomplete,
  IconButton,
  Chip
} from '@mui/material';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import DevProfileUpload from "../../cloudinary/DevProfileImageCloudinary";



function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Personal Information",
    "Payment",
    "Payment",
    "",
  ];
}


const TitleForm = () => {
  const { control } = useFormContext();


  return (
    <>
      <div className="flex flex-col justify-center items-start mx-32 my-64">

        <div className="flex flex-col items-start">
          <h6 className="mb-2 mx-3">2/10</h6>
          <p className="text-4xl font-bold mb-5">Got it. Now, add a title to tell the world what <br /> you do.</p>
          <h5 className="mx-3">It&apos;s very first thing that client see, so make it count. stand out by describing your expertise in your <br />
            own words</h5>
        </div>
        <h3 className="mb-3 mt-5 mx-3 font-bold">Your professionol role</h3>
        <Controller
          control={control}
          name="headline" // Make sure this matches the backend field name
          render={({ field }) => (
            <input
              className="mx-3 form-control border border-gray-500 p-2 md:p-3 lg:w-96 rounded-md"
              id="headline"
              placeholder="Software Engineer | Javascript | iOS"
              style={{ width: "820px" }}
              {...field}
            />
          )}
        />
      </div>
    </>
  )
}


const ExperienceForm = () => {
  const { control } = useFormContext();
  const { experiences } = useContext(AuthContext)
  console.log(experiences, '123456798');

  return (

    <>
      <div style={{ display: "flex" }}>
        <div className="flex flex-col justify-center items-start mx-32 my-32">
          <h6 className="mb-2 mx-3">3/10</h6>
          <p className="text-4xl font-bold mb-1">If you have relevant experience, add it <br /> here.</p>
          <p className="mb-7">
            Freelancers who add their experience are twice as likely to win work. But if you're just starting out, <br /> you can
            still create a great profile. Just head to the next page.
          </p>
          <div className="gap-6" style={{ display: 'flex', borderRadius: "14px" }}>
            <div>
              {experiences.map((experience, index) => (
                <div key={index}>
                  <Card style={{ backgroundColor: "#ced4da", borderRadius: "14px" }} className="w-96 h-60 border-2 border-dashed ">
                    <div className="p-10">
                      <Typography className="font-bold">Title : <span>{experience.title}</span> </Typography>
                      <Typography className="font-bold">Company : <span>{experience.company}</span> </Typography>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            <Card style={{ backgroundColor: "#ced4da", borderRadius: "14px" }}
              className="w-96 h-60 border-2  border-dashed bg-green-900"
            >
              <IconButton sx={{
                position: 'absolute',
                top: 10, // Adjust position based on desired placement
                right: 10, // Adjust position based on desired placement
                color: 'primary.main', // Customize icon color
              }}>
              </IconButton>
              <div className="flex flex-col justify-start mx-5 py-32 ">
                <ExperienceFormModal control={control} />
                <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
              </div>
            </Card>


          </div>

        </div>
      </div>
    </>
  );
};

const EducationForm = () => {
  const { control } = useFormContext()
  const { educations } = useContext(AuthContext)
  console.log(educations, "dcfvgbh");

  // const handleAddEducation = (newEducations) => {
  //     setEducations([...educations,newEducations])
  // }

  return (
    <>
      <div className="flex flex-col justify-center items-start mx-32 my-32">

        <h6 className="mb-2 mx-3">4/10</h6>
        <p className="text-4xl font-bold mb-1">Clients likes to know what you know - add <br /> your education here.</p>
        <p className="mb-4">
          You don't have to have a degree. Adding any relevent education helps you to get more work.
        </p>
        <div className="gap-6" style={{ display: 'flex', borderRadius: "14px" }}>
          <div>
            {educations.map((education, index) => (
              <div key={index}>
                <Card style={{ backgroundColor: "#ced4da", borderRadius: "14px" }} className="w-96 h-60 border-2 border-dashed ">
                  <div className="p-10">
                    <Typography className="font-bold">School : <span>{education.school}</span> </Typography>
                    <Typography className="font-bold">Degree : <span>{education.degree}</span> </Typography>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <Card style={{ backgroundColor: "#ced4da", borderRadius: "14px" }} className="w-96 h-60 border-2 border-dashed rounded-lg bg-green-900">
            <IconButton sx={{
              position: 'absolute',
              top: 10, // Adjust position based on desired placement
              right: 10, // Adjust position based on desired placement
              color: 'primary.main', // Customize icon color
            }}>
            </IconButton>
            <div className="flex flex-col  justify-start mx-5 my-32 ">
              <EducationFormModal control={control} />
              <h2 className="text-xl font-semibold mb-4 mt-3">Add education</h2>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}


const SkillsForm = () => {
  const { control } = useFormContext();
  const { authToken, allSkills, setAllSkills } = useContext(AuthContext);
  const { setFormData } = useContext(AuthContext)

  const getAllSkills = async (e) => {
    console.log(e);
    if (e && e.trim().length > 0) {
      console.log("dfghjk");
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/developer/skills/?q=${e}`,
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        );
        const skills = response.data;
        console.log(skills, "55555555555555555");
        setAllSkills(skills);
        console.log(allSkills, '1111111111111');
        console.log(response, '9999999999');
      } catch (error) {
        console.log(error);
      }
    } else {
      setAllSkills([]);
    }
  };

  const handleDelete = (skillToDelete) => () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill.name !== skillToDelete.name),
    }));
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-start mx-32 my-64">
        <h6 className="mb-2 mx-3">5/10</h6>
        <p className="text-4xl font-bold mb-1">Nearly there! What work are you here to do?</p>
        <p className="mb-4">Your skills show clients what you can offer, and help us choose which jobs to recommend to you. Start typing to <br /> pick more. It's up to you.</p>
        <p className="mb-3 mt-5 mx-3 font-bold">Your Skills</p>

        <Controller
          name="skills" // Specify the name for React Hook Form
          control={control} // Pass the control prop from React Hook Form
          render={({ field }) => (
            <Autocomplete
              multiple
              options={allSkills}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => setFormData((prevData) => ({ ...prevData, skills: value }))}
              onInputChange={(event, newInputValue) => getAllSkills(newInputValue)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    label={option.name}
                    onDelete={() => handleDelete(option)}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  style={{ width: "820px" }}
                  placeholder="Add Skills"
                  fullWidth
                  {...field}
                />
              )}
            />
          )}
        />
      </div>
    </>
  );
};


const DeveloperBioForm = () => {
  const { control } = useFormContext();

  return (
    <>

      <div className="flex flex-col justify-center items-start mx-32 my-48">
        <h6 className="mb-2 mx-3">6/10</h6>
        <p className="text-4xl font-bold mb-1">Great. Now write a bio to tell the world <br /> about yourself.</p>
        <p>Help people get to know you at a glance. What work do you do best? Tell them clearly, <br /> using paragraphs or bullet points.
          You <br /> can always edit later; just make sure you proofread now.
        </p>
        <div>
          <p className=" flex flex-col mb-3 mt-5 mx-3 font-bold">Your Bio</p>
          <Controller
            control={control}
            name="description" // Specify the name for the control
            render={({ field }) => (
              <>
                <TextField
                  className="mx-6 form-control border border-gray-500 p-2 md:p-3 lg:w-96 rounded-md"
                  id="description"
                  placeholder="Enter your top skills, experience, and interests. This is one of the first things clients will see on your profile"
                  style={{ width: "820px" }}
                  {...field}
                /> <br />
                <p style={{ marginLeft: '650px' }}>At least 100 Characters</p>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

const PersonalDetailsForm = () => {
  const { control } = useFormContext();
  // const profileRef = useRef()
  // const {image,setImage} = useContext(AuthContext)



  // const handleUpload = async () => {
  //   const profileImage = profileRef.current.files[0]
  //   try {
  //     const url = await DevProfileUpload(profileImage);
  //     setImage(url)

  //   } catch (error) {
  //     console.log("Error from upload", error.message);
  //   }
  //   console.log(image, '11111111');

  // };


  return (
    <>
      <div className="flex flex-col justify-center items-start mx-32 my-24">
        <div>
          <h6 className="mb-2 mx-3">7/10</h6>
          <p className="text-4xl font-bold mb-1">Now you have to update your personal details.</p>
          <p>
            Now you have reached at  the Last step! Let's complete your profile by adding more details.
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-col ">
            <Avatar
              className="mt-7"
              alt="Profile Image"
              src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
              sx={{ width: 300, height: 300 }}
            />
            <p className="text-center">Profile Picture</p>
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
            />
            <UnsignedUpload
              cloudName="your-cloud-name"
              uploadPreset="your-upload-preset"
              folder="profile_pictures"
              onStart={() => console.log('Upload started')}
              onSuccess={(result) => {
                console.log('Upload success', result);
                // Extract the URL from the Cloudinary response and set it to state
                setImage(result.info.secure_url);
              }}
              onProgress={(progress) => console.log('Upload progress', progress)}
            >
              <Avatar
                className="mt-7"
                alt="Profile Image"
                src={profilePicture || 'https://via.placeholder.com/150'}
                sx={{ width: 300, height: 300 }}
              />
            </UnsignedUpload> */}
          </div>
          <div className="flex flex-col mx-10 mt-7">

            <Controller
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Date of Birth"
                  type="date"
                  style={{ "width": "900px" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State"
                  fullWidth
                  margin="normal"
                />
              )}
            />

            <Controller
              control={control}
              name="media_links"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Media Links"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};


function getStepContent(step) {
  switch (step) {
    case 0:
      return <TitleForm />
    case 1:
      return <ExperienceForm />;
    case 2:
      return <EducationForm />;
    case 3:
      return <SkillsForm />;
    case 4:
      return <DeveloperBioForm />;
    case 5:
      return <PersonalDetailsForm />;
    default:
      return "unknown step";
  }
}

const DeveloperProfile = () => {

  const { authToken, formData } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();


  const methods = useForm({
    defaultValues: {
      headline: "",
      designation_title: "",
      company: "",
      location: "",
      country: "",
      is_working: "",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      school: "",
      degree: "",
      field_of_study: "",
      note: "",
      from_year: "",
      to_year: "",
      skills: "",
      profile_picture: "",
      description: "",
      date_of_birth: "",
      city: "",
      state: "",
      media_links: "",
    },
  });

  const isStepOptional = (step) => {
    return step === 1
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  const handleNext = async (data) => {
  

    console.log("data to send", data);
    if (activeStep == steps.length - 1) {
      try {
        let response = await axios.put('http://127.0.0.1:8000/developer/profile/', data,{
            headers: {
              'Authorization': `Bearer ${authToken.access}`,
            },
          });
        const result = response.data;
        console.log("response:", response);
        console.log(result, '555555555555');
        navigate('/devprofile');
      } catch (error) {
        console.error('Error during Axios request:', error);
        console.error('response:', error.response);
        console.error(error.message);
      }

    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '20px', backgroundColor: 'white' }}>
      {activeStep === steps.length ? (
        navigate('/')
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <div style={{ backgroundColor: "green", height: "2px" }}></div>
              <div className="mt-3">
                <Button
                  disabled={activeStep === 0}
                  variant="contained"
                  onClick={handleBack}
                  className="w-28"
                >
                  back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className="w-28"
                  >
                    skip
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  className="w-28 float-right"
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>

  )
}

export default DeveloperProfile


