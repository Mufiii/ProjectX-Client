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


const inputStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '100%',
  boxSizing: 'border-box',
  fontSize: '16px',
  marginTop: '10px',
  marginBottom: '10px',
};



const VendorUpdateProfile = () => {

  const { authToken, setGetView, getView, logoutUser, image, setImage } = useContext(AuthContext)
  const [value, setValue] = useState([])
  console.log(value, '--------------------');
  const [logo, setLogo] = useState(false)
  const inputRef = useRef()
  const bannerFileRef = useRef()
  const logoFileRef = useRef()
  // console.log(image, 'dfgh');
  const [editMode, setEditMode] = useState(false);
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
    const banner = bannerFileRef.current.files[0];
    try {
      const url = await BannerUpload(banner);
      setImage(url);

      // Update the state with the new banner URL
      setValue(prevValue => ({
        ...prevValue,
        vendor_profile: {
          ...prevValue.vendor_profile,
          banner: url
        }
      }));
    } catch (error) {
      console.log("Error from upload", error.message);
    }
    console.log(image, '11111111');
  };

  const handleLogos = async () => {
    const logo = logoFileRef.current.files[0];
    try {
      const url = await LogoUpload(logo);
      setLogo(url);

      // Update the state with the new logo URL
      setValue(prevValue => ({
        ...prevValue,
        vendor_profile: {
          ...prevValue.vendor_profile,
          logo: url
        }
      }));
    } catch (error) {
      console.log("Error from Logo upload", error.message);
    }
    console.log(image, '222222222');
  };



  const handleEditClick = () => {
    setEditMode(true);
    bannerFileRef.current.click()
  };

  const handleSaveClick = (e) => {

    setEditMode(false);
    UpdateProfile(e);
  };




  const UpdateProfile = async (e) => {
    e?.preventDefault()


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
              logo: logo,
              banner: image,
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
        setEditMode(false);
      }
      setValue(data)
    } catch (error) {
      if (error.response) {

        console.error('Server responded with an error:', error.response.status);
        console.error('Error details:', error.response.data);

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
          <Card style={{ maxWidth: 800 }} className='h-full mb-5 mt-7 ml-10 border-2 border-gray-900'>
            <div className='p-5 '>
              <div className='flex justify-between'>
                <label style={{ color: "black", fontWeight: "600", fontSize: "1.5em" }} className='' htmlFor="">Overview</label>
                <div>
                  <EditIcon onClick={handleEditClick} />
                </div>
              </div>
              <div className='mt-5 flex flex-col '>
                {editMode ? (
                  <form onSubmit={handleSaveClick} ref={inputRef}>
                    {getView.map((item) => (
                      <div key={item.id} className=' flex flex-col '>
                        <textarea
                          type="text"
                          name='description'
                          style={{ minHeight: "7em" }}
                          placeholder='Description'
                          defaultValue={value && value.vendor_profile && value.vendor_profile.description}
                        />
                        {/* <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Email Address
                        </label>
                        <input
                          type='text'
                          placeholder='Email Address'
                          name='email'
                          defaultValue={value && value.email}
                        /> */}
                        <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Website
                        </label>
                        <input
                          type='text'
                          placeholder='Website'
                          name='website'
                          defaultValue={value && value.vendor_profile && value.vendor_profile.website}
                          style={inputStyle}
                        />
                        <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Industry
                        </label>

                        <input
                          type='text'
                          placeholder='Industry'
                          name='industry'
                          defaultValue={value && value.vendor_profile && value.vendor_profile.industry}
                          style={inputStyle}
                        />
                        <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Headquaters
                        </label>
                        <input
                          type='text'
                          placeholder='Headquaters'
                          name='headquaters'
                          defaultValue={value && value.vendor_profile && value.vendor_profile.headquaters}
                          style={inputStyle}
                        />
                      </div>
                    ))}
                    <div className='flex justify-end gap-3 mt-3'>
                      <Button onClick={() => setEditMode(false)}>Cancel</Button>
                      <Button variant='contained' color='success' onClick={handleSaveClick}>Save</Button>
                    </div>
                  </form>
                ) : (
                  <div>
                    {getView.map((item) => (
                      <div key={item.id}>
                        <div className='mb-4'>
                          <Typography>{item.vendor_profile.description}</Typography>
                        </div>
                        <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Email Address
                        </label>
                        <p className='mt-2 mb-1'>{item.email}</p>
                        <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Website
                        </label>
                        <p className='mt-2 mb-1'>{item.vendor_profile.website}</p>
                        <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Industry
                        </label>
                        <p className='mt-2 mb-1'>{item.vendor_profile.industry}</p>
                        <label style={{ color: "black", fontWeight: "bold", fontSize: "1em" }} >
                          Headquaters
                        </label>
                        <p className='mt-2 mb-1'>{item.vendor_profile.headquaters}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      default:
        return null;

    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 800, display: 'flex', flexDirection: 'column' }} className='h-full border-2 border-gray-500 mt-5 ml-10'>
        <div onSubmit={(e) => UpdateProfile(e)} ref={inputRef}>
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
                  <div>
                    {/* Cover Image */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                    }}>

                      <img
                        src={value && value.vendor_profile && value.vendor_profile.banner}
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
                      {!editMode && (
                        <EditIcon
                          style={{ cursor: 'pointer', position: 'absolute', top: 15, right: 15 }}
                          onClick={handleEditClick}
                        />
                      )}
                      {editMode && (
                        <Button type="submit" variant="contained" color="success"
                          style={{ position: 'absolute', top: 15, right: 15 }}
                          onClick={UpdateProfile}>
                          Submit
                        </Button>
                      )}
                      {/* Hidden file input */}
                      <input
                        type="file"
                        name="banner"
                        ref={bannerFileRef}
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                      />
                    </div>
                    {/* </div> */}
                  </div>
                  {/* Logo */}
                  <div>
                    <Avatar
                      variant="square"
                      alt="Remy Sharp"
                      src={value && value.vendor_profile && value.vendor_profile.logo}
                      sx={{
                        width: 140,
                        height: 140,
                        position: "relative",
                        top: 50,
                        left: 30,
                      }}
                    />
                    <div style={{ position: 'relative' }}>
                      <input
                        type="file"
                        name="logo"
                        ref={logoFileRef}
                        style={{ display: 'none' }}
                        onChange={handleLogos}
                      />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <EditIcon
                        style={{ cursor: 'pointer', position: 'absolute', top: 15, left: 135, color: "white" }}
                        onClick={() => logoFileRef.current.click()}
                      />
                    </div>
                    {/* Text and paragraphs */}
                    <Box sx={{ marginTop: '2em', padding: '2em', color: 'white' }}>
                      <div>
                        <Typography style={{ color: "black" }} variant="h5">{item.first_name}{item.last_name}</Typography>
                        <Typography style={{ color: "black" }} variant="body1">
                        {item.vendor_profile.industry} &nbsp;
                          {item.vendor_profile.headquaters} &nbsp;
                          {item.country}
                        </Typography>
                        {/* <hr style={{ borderTop: "2px solid #ddd", margin: "12px 0", marginTop: "1em" }} /> */}
                      </div>
                    </Box>
                  </div>
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
        </div>

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