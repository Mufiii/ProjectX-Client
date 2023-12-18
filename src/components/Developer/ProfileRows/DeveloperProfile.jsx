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
        <h2>1/10</h2>
        <h2>Got it. Now, add a title to tell the world what <br /> you do.</h2>
        <h5>It&apos;s very first thing that client see, so make it count. stand out by describing your expertise in your <br />
          own words</h5>

        <h3>Your professionol role</h3>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              id="title"
              placeholder="Software Engineer | Javascript | iOS"
              size="lg"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </>
    )}



  
const ExperienceForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <h2>2/10</h2>
      <h2>If you have relevant experience, add it here.</h2>
      <h2>
        Freelancers who add their experience are twice as likely to win work. But if you're just starting out, you can
        still create a great profile. Just head to the next page.
      </h2>
      <div className="max-w-sm mx-auto bg-grey border border-dashed shadow-md rounded-md overflow-hidden">
        <div className="p-4">

          <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
            <Box>
              <ExperienceFormModal />
            </Box>
        </div>
      </div>

    </>
  );
};

  const EducationForm = () => {
      const {control} = useFormContext()

      return (
        <>
            <h2>2/10</h2>
        <h2>If you have relevant experience, add it here.</h2>
        <h2>
          Freelancers who add their experience are twice as likely to win work. But if you're just starting out, you can
          still create a great profile. Just head on to the next page.
        </h2>
        <div className="max-w-sm mx-auto bg-grey border border-dashed shadow-md rounded-md overflow-hidden">
        <div className="p-4">
    
          <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
            <Box>
              <EducationFormModal />
            </Box>
        
        </div>
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
        <h2>4/10</h2>
        <h2>Nearly there! What work are you here to do?</h2>
        <h2>Your skills show clients what you can offer, and help us choose which jobs to recommend to you. Start typing to pick more. It's up to you.</h2>
        <h3>Your Skills</h3>
        <Controller
          control={control}
          name="skills" // Specify the name for the control
          render={({ field }) => (
            <>
             <Input
                  {...field}
                  fullWidth
                  placeholder="Add skills here"
                  onChange={(e) => skillschecking(e.target.value)}
                />
              <p>Max 15 skills</p>
            </>
          )}
        />
      </>
    );
  };

  const DeveloperBioForm = () => {
    const { control } = useFormContext();
  
    return (
      <>
        <h2>5/10</h2>
        <h2>Great. Now write a bio to tell the world about yourself.</h2>
        <h2>Help people get to know you at a glance. What work do you do best? Tell them clearly, using paragraphs or bullet points.
          You can always edit later; just make sure you proofread now.
        </h2>
        <div>
          <h3>Your Bio</h3>
          <Controller
            control={control}
            name="bio" // Specify the name for the control
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Enter your top skills, experience, and interests. This is one of the first things clients will see on your profile"
                  size="lg"
                  fullWidth
                />
                <p>At least 100 Characters</p>
              </>
            )}
          />
        </div>
      </>
    );
  };
  
  const PersonalDetailsForm = () => {
    const { control } = useFormContext();
  
    return (
      <>
        <Typography variant="h2">Update Your Personal Details</Typography>
        <Avatar
          alt="Profile Image"
          src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
          sx={{ width: 150, height: 150 }}
        />
        
        <Controller
          control={control}
          name="dateOfBirth" 
          render={({ field }) => (
            <TextField
              {...field}
              label="Date of Birth"
              type="birth"
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























