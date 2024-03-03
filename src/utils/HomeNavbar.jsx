import React, { useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Button } from '@mui/material'
import { MdAccountCircle } from "react-icons/md";
import MessageIcon from '@mui/icons-material/Message';
// import { Switch } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import '../index.css'
import BottomBar from "./BottomBar";
import WorkspaceBar from '../Monitorization/Workspace/WorkspaceBar.jsx'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { DragDropContext } from 'react-beautiful-dnd'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
// import { useDispatch } from "react-redux";
// import { fetchAllDevelopers } from "../Redux/Actions/Actions.jsx";
// import DevelopersList from "../components/Vendor/Project/DevelopersList.jsx";
// import { useSelector } from "react-redux";
// import { selectDevelopers } from "../Redux/slices/FetchAlldevSlice.jsx";



const HomeNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useContext(AuthContext)
  // const dispatch = useDispatch();
  // const [searchQuery, setSearchQuery] = useState(''); 
  // const searchedDevelopers = useSelector(selectDevelopers);

  // Function to handle search query change
  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value); // Update search query state
  // };


  // const handleSearchSubmit = () => {
  //   dispatch(fetchAllDevelopers(searchQuery));
  //   navigate('dashboard/developers/');
  // };


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const UserProfile = () => {
    // Handle the click event, e.g., show a modal, navigate to a different page, etc.
    // console.log('Icon clicked!', e);
    // navigate("/profile")
    if (user && user.is_developer) {
      navigate('/devprofile')
    } else if (user && user.is_vendor) {
      navigate('/profile')
    }


  };

  return (
    <>
      <Navbar className="sticky bg-white  top-0 z-10 h-max max-w-full rounded-none bg py-2 px-4 lg:px-7 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center gap-2">
            <Typography
              as="a"
              href="/"
              color="green"
              className="text-3xl mr-4 cursor-pointer py-1.5 font-bold"
            >
              <span className="text-primary-purple">G</span>
              <span className="text-logo-yellow">o</span>
              {/* <span className="text-logo-orange">o</span> */}
              <span className="text-primary-purple">W</span>
              <span className="text-logo-rose">O</span>
              <span className="text-logo-green">R</span>
              <span className="text-logo-green">K</span>
            </Typography>
            {/* <div className="items-center">
              <Typography className="font-bold">
                Projects
              </Typography>
            </div> */}
          </div>
          <div className="flex items-center gap-8 px-6">
            <div className="flex w-96 border-2  border-gray-500 items-center bg-white rounded-lg p-1 shadow-md flex-1 md:flex-initial">
              <FaMagnifyingGlass className="h-4 w-6  text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 outline-none p-2 "
              // value={searchQuery} // Bind input value to search query state
              // onChange={handleSearchChange} // Call handleSearchChange on input change

              />
              {/* <Button onClick={handleSearchSubmit}
               variant="contained" color="success" type="submit"> Submit </Button> */}
            </div>


            {!user ? (
              // <Collapse open={openNav}>
              <div className="flex gap-3">
                <Button size="xl" className=" outline-none mb-2" onClick={()=> navigate('/login')}>
                  <span style={{textTransform:"none",color:"black", fontWeight:"bold"}}>Log in</span>
                </Button>

                <Button variant="contained" style={{borderRadius:"20px"}} color="success" size="sm"  className="mb-2 bg-primary-purple" onClick={()=> navigate('/desk')}>
                  <span style={{textTransform:"none"}}>Sign Up</span>
                </Button>
              </div>
              // </Collapse>
            ) : (
              <div className="flex items-center gap-8 px-6">
                <div className="hidden lg:inline-block text-primary-purple" onClick={() => navigate('/chat')}>
                  <MessageIcon />
                </div>
                <div className="hidden lg:inline-block text-primary-purple">
                  <IoMdNotificationsOutline size={28} />
                </div>
                <div className="hidden lg:inline-block text-primary-purple" onClick={() => UserProfile()}>
                  <MdAccountCircle size={28} />
                </div>
                <IconButton
                  variant="text"
                  className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                  ripple={false}
                  onClick={() => setOpenNav(!openNav)}
                >
                  {openNav ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      className="h-6 w-6"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </IconButton>
              </div>
            )}
          </div>
        </div>

        {/* <DevelopersList searchedDevelopers={searchedDevelopers} /> */}
        {location.pathname == '/profile' ? <BottomBar /> : null}
      </Navbar>

    </>
  );
}

export default HomeNavbar