import { GoPerson } from "react-icons/go";
import { GoProjectSymlink } from "react-icons/go";
import { MdAttachMoney } from "react-icons/md";
import '../ProfileRows/Welcome.css'
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Welcome1 = () => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/profilesetup')
  }

  return (
    <div>

<div className="welcome-container">
  <div className="welcome-text">
    <h4 className="welcome-message">
        Welcome, <strong>Mufees</strong>! Are you ready to <span className="expressive-text">discover a world of endless opportunities</span>?
    </h4>
  <div>
    <h2 className="mb-5 text-lg"><GoPerson size={25}/> Answer a few questions and build your profile</h2>
    <hr />
    <h2 className="mt-10 mb-5 text-lg"><GoProjectSymlink size={25}/> Apply for open projects</h2>
    <hr />
    <h2 className="mt-10 mb-5 text-lg text-black"><MdAttachMoney size={25}/> Get paid safely – we're there to help</h2>
    <hr />
  </div>
  <div className="mt-10 flex justify-between">
    <Button onClick={handleClick} className="rounded-full w-60 h-12 " color="green">Get Started</Button>
    <p className="">It only take 5-10 minutes and you can edit it later. We&apos;ll <br /> save as you go</p>
  </div>
  </div>
</div>



    </div>
  )
}

export default Welcome1



