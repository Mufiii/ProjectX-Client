import axios from "axios"
import { useForm } from 'react-hook-form'
import { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
  Input,
  Button,
} from "@material-tailwind/react"
import ExperienceFormModal from "./ExperienceFormModal"



const STEPS = {
  TITLE: 0,
  EXPERIENCE: 1,
  EDUCATION: 2,
  SKILLS: 3,
  BIO: 4,
};



export const DeveloperProfile = () => {

  const [step, setStep] = useState(STEPS.TITLE);
  const [isLoading, setIsLoading] = useState(false);
  // const [ismodal, setIsModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { authToken } = useContext(AuthContext)
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [select,setSelect] = useState(false)
  const handleModalClose = () => setSelect(false)

  const {
    register, // it can track the changes for the input field value
    handleSubmit,
    setValue,
    watch, // is used to watch the value of one or more input fields in the form
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      experience: "",
      education: 2,
      skills: null,
      bio: "",
    }
  })

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const title = watch("title");
  const experience = watch("experience");
  const education = watch("education");
  const skills = watch("skills");
  const bio = watch("bio");

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const SubmitHandler = (data) => {
    if (step !== STEPS.BIO) {
      return onNext();
    }

    const DeveloperProfile = async (e) => {
      e.preventDefault()

      let response = await axios.post('http://127.0.0.1:8000/profile/', data, {
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
        },
      })
    }

  }


  let bodyContent = (
    <div>
      <div>
        <h2>1/10</h2>
        <h2>Got it. Now, add a title to tell the world what <br /> you do.</h2>
        <h5>It&apos;s very first thing that client see, so make it count. stand out by describing your expertise in your <br />
          own words</h5>

        <h3>Your professionol role</h3>
        <div className="col-span-2 lg:col-span-1">
          <Input
            placeholder="Software Engineer | Javascript | iOS"
            size="lg"
            onChange={(val) => setCustomValue("title", val)} />
        </div>
      </div>
    </div>
  );


  if (step == STEPS.EXPERIENCE) {
    bodyContent = (
      <div>
        <h2>2/10</h2>
        <h2>If you have relevent experience add it here.</h2>
        <h2>Freelancers who add their experience are twice as likely to win work. But if You&apos;re just starting out,
          you can still create a great profile.just head on the next page.
        </h2>
        <div className="max-w-sm mx-auto bg-grey border border-dashed shadow-md rounded-md overflow-hidden">
          <div className="p-4">
            <Button color="green" size="sm">
              <span className="text-white" > + </span>
            </Button>
            <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
            {select&&<Modal
              open={select}
              onClose={handleModalClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              style={{display:'flex',justifyContent:'center',alignItems:'center',background:'rgba(255, 255, 255,0.2)',backdropFilter: 'blur(2px)'}}  
              >
          <Box style={{width:'100%',height:'50%',background:'whitesmoke',border:'none',borderRadius:'10px',padding:'10px'}}>
          <ExperienceFormModal/>
          </Box>

      </Modal>}
          </div>
        </div>
      </div>
    );
  } else if (step == STEPS.EDUCATION) {
    bodyContent = (
      <div>
        <h2>3/10</h2>
        <h2>Clients like to know what you know - add your education here</h2>
        <h2>You don&apos;t have to have a degree. Adding any relevent education hellps make your profile more visible.
        </h2>
        <div className="max-w-sm mx-auto bg-grey border border-dashed shadow-md rounded-md overflow-hidden">
          <div className="p-4">
            <Button color="green" ripple="light" size="sm">
              <span className="text-white">+</span>
            </Button>
            <h2 className="text-xl font-semibold mb-4">Add Education</h2>
          </div>
        </div>
      </div>
    );
  } else if (step == STEPS.SKILLS) {
    bodyContent = (
      <div>
        <h2>4/10</h2>
        <h2>Nearly there! What work are you here to do?</h2>
        <h2>Your skills show clients what you can offer, and help us choose which jobs to recommend to you. Starttyping to pick more. its up to you
        </h2>
        <div>
          <h3>Your Skills</h3>
          <Input
            placeholder="Enter skills here"
            size="lg"
            name="skills" />
          <p>max 15 skills</p>
        </div>
      </div>
    )
  } else if (step == STEPS.BIO) {
    bodyContent = (
      <div>
        <h2>5/10</h2>
        <h2>Great. Now write a bio to tell the world about yourself.</h2>
        <h2>Help people get know you at a glance. What work do you best? tell them clearly, using paragraphs or bullet points.
          You can always edit later; just make sure you proofread now.
        </h2>
        <div>
          <h3>Your Skills</h3>
          <Input
            placeholder="Enter your top skills, experience, and interests. This is one of the first thingsclients
             will see on your profile"
            size="lg"
            name="skills" />
          <p>Atleast 100 Characters</p>
        </div>
      </div>
    )
  }


  return (
    <div>
      <div>{bodyContent}</div>
      <Button onClick={onBack}>Back</Button>
      {/* {step == STEPS.EXPERIENCE && (<Button>Skip For Now</Button>)} */}
      <Button onClick={onNext}>Next</Button>
    </div>
  )
}

