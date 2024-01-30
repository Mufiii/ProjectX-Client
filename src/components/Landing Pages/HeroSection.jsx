import { useContext, useRef } from 'react'
import './HomePage.css'
import { Button, Card, CardContent, CardMedia, Grid, IconButton, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system';
import { Fullscreen } from '@mui/icons-material';
// import { AuthContext } from '../../context/AuthContext'
// import HeroSectionUpload from '../cloudinary/HeroSectionClodinary'

const HeroSection = () => {

  // const heroFileRef = useRef()
  // const {image, setImage} = useContext(AuthContext)

  // const handleHeroImage = async () => {
  //    const hero = heroFileRef.current.files[0];
  //    try {
  //       const url = await HeroSectionUpload(hero)
  //       setImage(url)
  //    } catch (error) {
  //     console.log("Error from upload", error.message);
  //    }
  //    console.log(image, '11111111');
  // }
  const theme = useTheme();


  return (
    <div style={{ padding: " 10px 110px" }}>
      <div className="container">
        <div className="text-container">
          <h2 className='hero-head'>Step into a world without limits</h2>
          <p style={{ color: "#333", fontSize: "1.3em" }} className='mb-5'>Forget what you know. The finest opportunities are at your fingertips</p>
          <Button
            style={{ backgroundColor: "green", borderRadius: "19px" }}
            className='mt-5'
            variant='contained'
          >Get started
          </Button>
        </div>
        <div className="image-container">
          <img className='hero-image' src="https://img.freepik.com/premium-vector/agile-development-project-business-management-brainstorm-task-board-company-scrum-working-methodology-office-team-utter-vector-concept_53562-16661.jpg?size=626&ext=jpg&ga=GA1.1.2056263533.1706515587&semt=ais" alt="Your Image Alt Text" />
        </div>

        {/* For talent */}

      </div>
      <div >
        <Card sx={{ display: 'flex', height: '46em', borderRadius: "20px" }}>
          <Grid container >
            {/* Left side with fixed image */}
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  alignItems: 'flex-start',
                  // position: 'relative',
                  // right: 400
                }}
                image="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload//q_auto,dpr_2.0,f_auto/brontes/for-talents/find-great-work@2x.jpg"
                alt="Live from space album cover"
              />
            </Grid>
            {/* Right side with blue background */}
            <Grid className='bg-bl' item xs={6} sx={{ backgroundColor: 'blue', color: 'white' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className='p-5'>
                  <p style={{ fontWeight: "300", fontSize: "1.5em" }}>For talent</p>
                  <div className='mt-5'>
                    <Typography
                      style={{ fontWeight: "700", fontSize: "5em", width: "40em" }}
                      sx={{
                        fontFamily: 'Georgia, Times New Roman, Times, serif', color: 'white'
                      }}>
                      Find Great <br /> Work
                    </Typography>
                    <Typography>
                      Meet clients you’re excited to work with and take
                      your career <br /> or business to new heights.
                    </Typography>
                    <div className='mt-44' style={{ height: "0.1em", backgroundColor: "white" }}></div>
                    <div>
                      <Grid container className='mt-4 mb-4' sx={{
                        fontFamily: 'Georgia, Times New Roman, Times, serif', fontSize: 'bold'
                      }}>
                        <Grid item xs={4}>
                          <p>Find opportunities for <br /> every stage of your <br /> freelance career</p>
                        </Grid>
                        <Grid item xs={4}>
                          <p>Control when, where, <br /> and how you work</p>
                        </Grid>
                        <Grid item xs={4}>
                          <p>Explore different <br /> ways to earn</p>
                        </Grid>
                      </Grid>
                      <Button
                        className='font-bold mt-5 w-44 h-10'
                        variant='contained'
                        style={{
                          backgroundColor: "white",
                          color: "blue",
                          borderRadius: "20px"
                        }}
                      >
                        <Typography variant="body1" style={{ textTransform: 'none' }}>
                          Find Opportunities
                        </Typography>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </div>

      {/* For clients */}

      <div className='mt-5'>
        <Card sx={{ display: 'flex', height: '43em', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
          <Grid container>
            {/* Left side with fixed image */}
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'stretch' }}>
              <CardMedia
                component="img"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                image="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale/brontes/delivery-models/find-talent-2x.jpg"
                alt="Live from space album cover"
              />
              <Typography
                color={'white'}
                sx={{
                  position: 'absolute',
                  top: '50px',
                  left: '100px',
                  // display:'flex',
                  // justifyContent:"start",
                  transform: 'translate(-50%, -50%)',
                  fontSize: '1.5em',
                  // zIndex: 1,
                }}
              >
                For clients
              </Typography>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '230px',
                  left: '255px',
                  color: "white",
                  transform: 'translate(-50%, -50%)',
                  fontSize: '4em',
                  fontFamily: 'Georgia, Times New Roman, Times, serif', fontWeight: "700"

                }}>
                <span style={{ fontSize: "1.2em" }}>Find talent</span> <br /> your way
              </Typography>
              <Typography
                sx={{
                  position: 'absolute',
                  top: '400px',
                  left: '230px',
                  color: "white",
                  transform: 'translate(-50%, -50%)',
                  // fontSize: '4em',
                  fontFamily: 'Georgia, Times New Roman, Times, serif', fontWeight: "700"

                }}>
                Work with the largest network of independent <br /> professionals and get things done—from quick <br /> turnarounds to big transformations.
              </Typography>
              <div  style={{
                position: 'absolute',
                top: '450px',
                left: '30px',
                display:"flex"
              }}>
                <Grid container className='mt-4 mb-4' spacing={4} sx={{
                  fontFamily: 'Georgia, Times New Roman, Times, serif', fontSize: 'bold'
                }}> 
                  <Grid item xs={4} >
                    <div className='client'>
                      <Typography className='client-cells' style={{ fontWeight: 'bold', fontSize: '2.2em' }}> 
                        Post a Project <br />and hire a pro
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className='client'>
                      <Typography className='client-cells' style={{ fontWeight: 'bold', fontSize: '2.2em' }}>
                        Add and view  <br /> your projects
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <div className='client'>
                      <Typography className='client-cells' style={{ fontWeight: 'bold', fontSize: '2.2em' }}>
                        Manage Your Project on Workspace
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Card>
      </div>

    </div>
  )
}

export default HeroSection