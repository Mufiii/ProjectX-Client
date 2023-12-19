import { Input } from "@mui/material";
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import ExperienceFormModal from "./ExperienceFormModal"
import EducationFormModal from "./EducationFormModal";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { 
  Typography,
  TextField,
  Button,
  Card,
  IconButton,
} from '@mui/material';
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";









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


const TitleForm = () =>{
    const { control } = useFormContext();
    return (
      <>
      <div className="flex flex-col justify-center items-start mx-32 my-48">

        <div className="flex flex-col items-start">
          <h6 className="mb-2 mx-3">2/10</h6>
          <p className="text-4xl font-bold mb-5">Got it. Now, add a title to tell the world what <br /> you do.</p>
          <h5 className="mx-3">It&apos;s very first thing that client see, so make it count. stand out by describing your expertise in your <br />
            own words</h5>
        </div>
          <h3 className="mb-3 mt-5 mx-3 font-bold">Your professionol role</h3>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <input
                  className="mx-3 form-control border border-gray-500 p-2 md:p-3 lg:w-96 rounded-md"
                  id="title"
                  placeholder="Software Engineer | Javascript | iOS"
                  style={{width:"820px"}}
                  {...field}
                />
                )}
                />
        </div>
      </>
    )}

  
const ExperienceForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <div className="flex flex-col justify-center items-start mx-32 my-48">
        <h6 className="mb-2 mx-3">3/10</h6>
        <p className="text-4xl font-bold mb-1">If you have relevant experience, add it <br /> here.</p>
        <p className="mb-4">
          Freelancers who add their experience are twice as likely to win work. But if you're just starting out, <br /> you can
          still create a great profile. Just head to the next page.
        </p>
        <Card className="w-96 h-60 border-2 mx-3 border-dashed rounded-lg bg-green-900">
          <IconButton sx={{
            position: 'absolute',
            top: 10, // Adjust position based on desired placement
            right: 10, // Adjust position based on desired placement
            color: 'primary.main', // Customize icon color
          }}>
          </IconButton>
          <div className="flex flex-col  justify-start mx-5 my-32 ">
              <ExperienceFormModal />
            <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
          </div>
        </Card>

      </div>
    </>
  );
};

  const EducationForm = () => {
      const {control} = useFormContext()

      return (
      <>
        <div className="flex flex-col justify-center items-start mx-32 my-48">

          <h6 className="mb-2 mx-3">4/10</h6>
          <p className="text-4xl font-bold mb-1">Clients likes to know what you know - add <br /> your education here.</p>
          <p className="mb-4">
              You don't have to have a degree. Adding any relevent education helps you to get more work.
          </p>
          <Card className="w-96 h-60 mx-3 border-2 border-dashed rounded-lg bg-green-900">
            <IconButton sx={{
              position: 'absolute',
              top: 10, // Adjust position based on desired placement
              right: 10, // Adjust position based on desired placement
              color: 'primary.main', // Customize icon color
            }}>
            </IconButton>
            <div className="flex flex-col  justify-start mx-5 my-32 ">
                <EducationFormModal />
              <h2 className="text-xl font-semibold mb-4 mt-3">Add education</h2>
            </div>
      </Card>
    </div>
        </>
      )
  }
  const SkillsForm = () => {
    const { control } = useFormContext();
    const [selectedSkills, setSelectedSkills] = useState([]);
    const {authToken} = useContext(AuthContext)
    const [allSkills, setAllSkills] = useState([]);

    
    const skillschecking = async (e) => {
        console.log(e);
        let response = await axios.get(`http://127.0.0.1:8000/developer/profile/?q=${e}`, {
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
        },
      }) 
      console.log(response,"1111111111111");
        const result = response.data.skills
        console.log(result);
        if (response.status==200){
          let data = result.map((item)=>item.name)
          console.log("data",data);
          setSelectedSkills(data)
          console.log("selectedSkills",selectedSkills);
        }
        console.log(result,'lllllllllll');
      }
    useEffect(()=>{
      skillschecking()
    },[])
  
    return (
      <>
      <div className="flex flex-col justify-center items-start mx-32 my-48">
        <h6 className="mb-2 mx-3">5/10</h6>
        <p className="text-4xl font-bold mb-1">Nearly there! What work are you here to do?</p>
        <p className="mb-4">Your skills show clients what you can offer, and help us choose which jobs to recommend to you. Start typing to <br /> pick more. It's up to you.</p>
        <p className="mb-3 mt-5 mx-3 font-bold">Your Skills</p>
        <Controller
          control={control}
          name="skills" // Specify the name for the control
          render={({ field }) => (
            <>
            <TextField
                className="mx-6 form-control border border-gray-500 p-2 md:p-3 lg:w-96 rounded-md"
                id="title"
                placeholder="Add skills here"
                style={{width:"820px"}}
                onChange={(e) => skillschecking(e.target.value)}
                {...field}
                />
              <p>Max 15 skills</p>
            </>
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
            name="bio" // Specify the name for the control
            render={({ field }) => (
              <>
               <TextField
                className="mx-6 form-control border border-gray-500 p-2 md:p-3 lg:w-96 rounded-md"
                id="bio"
                placeholder="Enter your top skills, experience, and interests. This is one of the first things clients will see on your profile"
                style={{width:"820px"}}
                {...field}
                /> <br />
                <p>At least 100 Characters</p>
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
            </div>
          <div className="flex flex-col mx-10 mt-7">
  
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <TextField
                {...field}
                label="Date of Birth"
                type="date"
                style={{"width":"900px"}}
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
            name="mediaLinks"
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
          return <TitleForm/>
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

  const { authToken } = useContext(AuthContext)
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const methods = useForm({
    defaultValues: {
      title: "",
      designation_title: "",
      company: "",
      location: "",
      country: "",
      is_working:"",
      start_month: "",
      start_year: "",
      end_month: "",
      end_year: "",
      school: "",
      degree: "",
      field_of_study: "",
      from_year: "",
      to_year: "",
      skills: "",
      bio: "",
      birth: "",
      city: "",
      state: "",
      mediaLinks: "",
    },
  });

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
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
    // const data = methods.getValues();
    console.log(data);
    if (activeStep == steps.length - 1) {
      let response = await axios.post('http://127.0.0.1:8000/developer/profile/', data, {
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
        },
      })
        const result = response.data
        console.log(result);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  return (
    <div>

      {activeStep === steps.length ? (
        navigate('/')
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                // className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  // className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )}
              <Button
                // className={classes.button}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  )
}

export default DeveloperProfile























