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
  Card
} from '@mui/material';
// import './UpdateProfile.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FactoryIcon from '@mui/icons-material/Factory';
import ApartmentIcon from '@mui/icons-material/Apartment';
import InsertLinkIcon from '@mui/icons-material/InsertLink';




const VendorUpdateProfile = () => {

  const { authToken, setGetView, getView, logoutUser,image, setImage } = useContext(AuthContext)
  const [logo, setLogo] = useState(false)
  const inputRef = useRef()
  const bannerFileRef = useRef()
  const logoFileRef = useRef()
  console.log(image, 'dfgh');

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
              logo: bannerFileRef.current.logo?.value,
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
      if (response.status == 200 & !e) {
        setGetView([data])
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    UpdateProfile()
    console.log("success");
  }, [])


  return (
    <div>
      <Button onClick={(e) => logoutUser(e)} variant="contained" color="error" className='float-right'>
        Log out
      </Button>
      <form onSubmit={(e) => UpdateProfile(e)} ref={inputRef}>
        {getView &&
          getView.map((item) => (
            <div key={item.id} className="flex space-x-2 mx-40"> {/* Added space between elements */}
              <div className="flex flex-col my-8">
                <div className="mb-4 ">
                  <Avatar alt="User Avatar" src="https://avatars.githubusercontent.com/u/135816778?v=4" sx={{ width: 300, height: 300 }} />
                </div>
                <div className='mx-16'>
                  <Typography className='mb-5' variant="h5">{`${item.first_name} ${item.last_name}`}</Typography>
                  <Button className='w-52 mt-4' variant='contained'>Edit Profile</Button> {/* Adjusted margin */}
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

              {/* Right Side Form */}
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

                {/* Logo Upload */}
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
      </form>
    </div>

  )
}

export default VendorUpdateProfile