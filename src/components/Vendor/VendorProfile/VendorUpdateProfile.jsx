import { useRef, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BannerUpload from '../../cloudinary/BannerCloudinary';
import LogoUpload from '../../cloudinary/LogoCloudinary';
import {
  Avatar,
  Typography,
  Input,
  Button,
  Card,
  Box
} from '@mui/material';
// import './UpdateProfile.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Label } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';



const VendorUpdateProfile = () => {

  const { authToken, setGetView, getView, logoutUser, image, setImage } = useContext(AuthContext)
  const [logo, setLogo] = useState(false)
  const inputRef = useRef()
  const bannerFileRef = useRef()
  const logoFileRef = useRef()
  // console.log(image, 'dfgh');
  const [activeSection, setActiveSection] = useState('Home');
  const [submitButton, setSubmitButton] = useState(false)

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleUpload = async () => {
    const banner = bannerFileRef.current.files[0]
    try {
      const url = await BannerUpload(banner);
      setImage(url)


    } catch (error) {
      console.log("Error from upload", error.message);
    }
    console.log(image, '11111111');

  };

  const handleLogos = async () => {
    const logo = logoFileRef.current.files[0]
    try {
      const url = await LogoUpload(logo)
      setLogo(url)
    } catch (error) {
      console.log("Error from Logo upload", error.message);
    }
    console.log(image, '222222222');
  }

  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setEditMode(false);
    UpdateProfile(e);
  };




  const UpdateProfile = async (e) => {
    // e?.preventDefault()
    console.log(inputRef.current.industry?.value);

    try {
      const headers = {
        Authorization: `Bearer ${authToken.access}`,
        'Content-Type': 'application/json',
      };
      const response = await axios({
        method: !e ? 'GET' : 'PUT',
        url: 'http://127.0.0.1:8000/vendor/vendorprofile/',
        headers: headers,
        data:
          e ? {
            first_name: inputRef.current.first_name?.value,
            last_name: inputRef.current.last_name?.value,
            country: inputRef.current.country?.value,
            vendor_profile: {
              // logo: bannerFileRef.current.logo?.value,
              // banner: image,
              about: inputRef.current.about?.value,
              description: inputRef.current.description?.value,
              industry: inputRef.current.industry?.value,
              headquaters: inputRef.current.headquaters?.value,
              website: inputRef.current.website?.value,
            }
          } : null,
      })
      const data = response.data
      console.log(data, '11111111111111111');
      if (response.status == 200 & !e) {
        setGetView([data])
      }
    } catch (error) {
      if (error.response) {

        console.error('Server responded with an error:', error.response.status);
        console.error('Error details:', error.response.data);

        if (error.response.status === 400) {
          console.error('Bad Request: ', error.response.data.vendor_profile.industry);
        }

      } else if (error.request) {
        console.error('No response received from the server:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  }

  useEffect(() => {
    UpdateProfile()
    console.log("success");
  }, [])



  const renderContent = () => {
    switch (activeSection) {
      case 'Home':
        return (

          <Card style={{ maxWidth: 800 }} className='h-full mt-7 ml-10 border-2 border-gray-900'>
            <form onSubmit={(e) => UpdateProfile(e)} ref={inputRef} onChange={() => setSubmitButton(true)}>
              {getView.map((item) => (
                <div key={item.id} className='flex flex-col p-5 '>
                  <label style={{ color: "black", fontWeight: "600", fontSize: "1.5em" }} className='' htmlFor="">
                    About
                  </label>
                  <div className='mt-3'>
                    <Typography >{item.vendor_profile.description}</Typography>
                  </div>
                </div>
              ))}
            </form>
          </Card>
        );
      case 'About':
        return (
          <Card style={{ maxWidth: 800 }} className='h-full mt-7 ml-10 border-2 border-gray-900'>
            <div className='p-5 '>
              <div className='flex justify-between'>
                <label style={{ color: "black", fontWeight: "600", fontSize: "1.5em" }} className='' htmlFor="">Overview</label>
                {!editMode ? (
                  <EditIcon onClick={handleEditClick} />
                ) : (
                  <Button variant='contained' onClick={handleSaveClick}>Save</Button>
                )}
              </div>
              <div className='mt-5 '>
                <form onSubmit={(e) => UpdateProfile(e)} ref={inputRef} onChange={() => setSubmitButton(true)}>
                  {getView.map((item) => (
                    <div key={item.id} className='flex flex-col '>
                      <Typography>{item.vendor_profile.description}</Typography>
                      <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} className='mt-2 mb-1' htmlFor="">
                        Email Address
                      </label>
                      <input style={{ border: "black" }} type='text' placeholder='Email Address' name='email' defaultValue={item && item.email} />
                      <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} className='mt-2 mb-1' htmlFor="">Website</label>
                      <input style={{ border: "black" }} type='text' placeholder='Website' name='website' defaultValue={item && item.vendor_profile.website} />
                      <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} className='mt-2 mb-1' htmlFor="">Industry</label>
                      <input style={{ border: "black" }} type='text' placeholder='Industry' name='industry' defaultValue={item && item.vendor_profile.industry} />
                      <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} className='mt-2 mb-1' htmlFor="">Headquarters</label>
                      <input style={{ border: "black" }} type='text' placeholder='Industry' name='industry' defaultValue={item && item.vendor_profile.headquaters} />
                    </div>
                  ))}
                </form>
              </div>
            </div>
          </Card>
        );
      // Add more cases for additional sections if needed
      default:
        return null;
    }
  };


  return (
    <div>
      <Card sx={{ maxWidth: 800, display: 'flex', flexDirection: 'column' }} className='h-full border-2 border-gray-500 mt-5 ml-10'>
        <form onSubmit={(e) => UpdateProfile(e)} ref={inputRef}>
          {getView &&
            getView.map((item) => (
              <div key={item.id}>
                <Box
                  sx={{
                    height: "20em", // Adjust the height here to match the Card height
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex', // Added to make it a flex container
                    flexDirection: 'column', // Arrange children in a column
                  }}
                >
                  {/* Cover Image */}
                  <div style={{
                    width: '100%',
                    height: '100%',
                  }}>

                    <img
                      src="https://imgs.search.brave.com/CvRq1uGlpV1Hrz5XUzu4POpmJarnr7Op3d0Hx5IkVjI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9saDYu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL2xh/ZlNaT3lzMmU2UE1Q/UDhNVzZNREhmQzQt/WUVxOExWM0YzZExr/Wm9jZ1NReWhsMTl5/amplYUw2dWZYWVZo/ZkdYX1VMM0QwbFJG/a0V6bGJidXpBQWVF/cHduNVBuYlloeThU/TU1UTTE3SDZLa1lY/SnFUU2x0Z3RzU0ZV/bjF1Y3ZkclZEX0VF/eDI"
                      alt="Cover"
                      style={{
                        width: '100%',
                        height: '60%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                  </div>
                  {/* Logo  */}
                  <div>
                    <Avatar
                      variant="square"
                      alt="Remy Sharp"
                      src="https://imgs.search.brave.com/3lxaXK_pmldMTTO3nG0ufLVMSAYYdPCfjhPnJnQdJZ8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Y29taW5nc29vbi5u/ZXQvd3AtY29udGVu/dC91cGxvYWRzL3Np/dGVzLzMvZ2FsbGVy/eS90aGUtYmF0bWFu/LTIwMjEvdGIxLmpw/Zw"
                      sx={{
                        width: 140,
                        height: 140,
                        position: "relative",
                        top: 50,
                        left: 30,
                      }}
                    />
                  </div>
                  {/* Text and paragraphs */}
                  <Box sx={{ marginTop: '2em', padding: '2em', color: 'white' }}>
                    <div>
                      <Typography style={{ color: "black" }} variant="h5">{item.first_name}{item.last_name}</Typography>
                      <Typography style={{ color: "black" }} variant="body1">
                        {item.vendor_profile.about} &nbsp;
                        {item.vendor_profile.headquaters} &nbsp;
                        {item.country}
                      </Typography>
                      {/* <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} /> */}
                    </div>
                  </Box>
                </Box>
                <div>
                  {/* Navigation */}
                  <Card className='border-2 border-x-blue-gray-50 flex'>
                    <Typography
                      className={`p-3 ${activeSection === 'Home' ? 'bg-gray-300' : ''}`}
                      style={{ color: "black", fontWeight: "700" }}
                      variant="body1"
                      onClick={() => setActiveSection('Home')}
                    >
                      Home
                    </Typography>
                    <Typography
                      className={`p-3 ${activeSection === 'About' ? 'bg-gray-300' : ''}`}
                      style={{ color: "black", fontWeight: "700" }}
                      variant="body1"
                      onClick={() => setActiveSection('About')}
                    >
                      About
                    </Typography>
                  </Card>
                </div>
              </div>
            ))}
        </form>
      </Card>
      <div>
        {renderContent()}

      </div>

    </div>
  )
}

export default VendorUpdateProfile



{/* <Button onClick={(e) => logoutUser(e)} variant="contained" color="error" className='float-right'>
        Log out
      </Button>
      <form onSubmit={(e) => UpdateProfile(e)} ref={inputRef}>
        {getView &&
          getView.map((item) => (
            <div key={item.id} className="flex space-x-2 mx-40">
              <div className="flex flex-col my-8">
                <div className="mb-4 ">
                  <Avatar alt="User Avatar" src="https://avatars.githubusercontent.com/u/135816778?v=4" sx={{ width: 300, height: 300 }} />
                </div>
                <div className='mx-16'>
                  <Typography className='mb-5' variant="h5">{`${item.first_name} ${item.last_name}`}</Typography>
                  <Button className='w-52 mt-4' variant='contained'>Edit Profile</Button> 
                  <Typography variant="body1">{item.vendor_profile?.about}</Typography>
                  <Typography variant="body1">
                    <LocationOnIcon /> {item.country}
                  </Typography>
                  <Typography variant="body1 flex">
                    <FactoryIcon /> {item.vendor_profile?.industry}
                  </Typography>
                  <Typography variant="body1 flex">
                    <ApartmentIcon /> {item.vendor_profile?.headquaters}
                  </Typography>
                  <Typography variant="body1 flex">
                    <InsertLinkIcon /> {item.vendor_profile?.website}
                  </Typography>
                </div>
              </div>

              <div>
                <Card className='border-4 border-gray-600' style={{ width: "1000px", height: "700px", margin: "10px",marginTop:"30px"}}>
                <Card className='border-4 border-gray-500' style={{ width: "100%", height: "30%", margin: "auto" }}>
                  <div>
                      <img src={image} alt="Banner Preview" />
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                      Upload Banner
                      <Input type="file" name="banner" ref={bannerFileRef} />
                    </Button>
                    <Button onClick={handleUpload}>Upload</Button>
                  </div>
                </Card>
                </Card>

                <Typography variant="body1">{item.vendor_profile?.description}</Typography>

                <img src={logo} alt="Logo Preview" />
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload Logos
                  <Input type="file" name="logo" ref={logoFileRef} />
                </Button>
                <Button onClick={handleLogos}>Upload</Button>

               

                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </div>
          ))}
      </form> */}