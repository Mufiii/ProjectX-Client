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
import EducationFormModal from "./EducationFormModal";



const STEPS = {
  TITLE: 0,
  EXPERIENCE: 1,
  EDUCATION: 2,
  SKILLS: 3,
  BIO: 4,
};



export const DeveloperProfile = () => {

  const [step, setStep] = useState(STEPS.TITLE);
  const { authToken } = useContext(AuthContext)

  const [select, setSelect] = useState(false);

  const handleModalOpen = () => {
    setSelect(true);
  };

  const handleModalClose = () => {
    setSelect(false);
  };



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
      education: "",
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


  const SubmitHandler = async (data) => {
    console.log(data);
    if (step !== STEPS.BIO) {
      return onNext();
    }

      let response = await axios.post('http://127.0.0.1:8000/profile/', data, {
      headers: {
        'Authorization': `Bearer ${authToken.access}`,
      },
      
      })
      const result = response.data
      console.log(result);
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
          <Button color="green" size="sm" onClick={handleModalOpen}>
              <span className="text-white">+</span>
            </Button>
            <h2 className="text-xl font-semibold mb-4">Add Experience</h2>
            {select && (
              <Modal
                open={select}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255,0.2)',
                  backdropFilter: 'blur(2px)',
                }}>
                <Box>
                  <ExperienceFormModal handleModalOpen={handleModalOpen}/>
                </Box>
              </Modal>
            )}
          </div>
        </div>
      </div>
    );
  } else if (step == STEPS.EDUCATION) {
    bodyContent = (
      <div>
        <h2>2/10</h2>
        <h2>If you have relevant experience, add it here.</h2>
        <h2>
          Freelancers who add their experience are twice as likely to win work. But if you're just starting out, you can
          still create a great profile. Just head on to the next page.
        </h2>
        <div className="max-w-sm mx-auto bg-grey border border-dashed shadow-md rounded-md overflow-hidden">
          <div className="p-4">
            <Button color="green" size="sm" onClick={handleModalOpen}>
              <span className="text-white">+</span>
            </Button>
            <h2 className="text-xl font-semibold mb-4">Add Education</h2>
            {select && (
              <Modal
                open={select}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255,0.2)',
                  backdropFilter: 'blur(2px)',
                }}>
                <Box>
                  <EducationFormModal handleModalOpen={handleModalOpen}/>
                </Box>
              </Modal>
            )}
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

