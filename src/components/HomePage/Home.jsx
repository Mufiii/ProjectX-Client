import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import {
  Card,
  CardContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from '@mui/material'
import axios from "axios"
import ProjectSkills from "../Vendor/Project/ProjectSkills"
import '../Vendor/Project/ProjectList.css'
import ProjectItemCreated from "../Vendor/Project/ProjectItemCreated"
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Home.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Footer from "../../utils/Footer"


const Home = () => {

  const { authToken } = useContext(AuthContext)
  const [AllProjects, setAllProjects] = useState([])
  const navigate = useNavigate()
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showInputLabel, setShowInputLabel] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [category, setCategory] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
    setShowInputLabel(false); // Hide input label when an option is selected
  };

  const handleMenuClose = () => {
    if (category === '') {
      setShowInputLabel(false); // Show input label when menu closes without selection
    }
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent click event from propagating to parent elements
    setIsClicked(true); // Set the state variable to true when clicked
  };

  useEffect(() => {

    let AllProjectsView = async () => {

      let response = await axios.get('http://127.0.0.1:8000/developer/view_projects/', {
        headers: {
          Authorization: `Bearer ${authToken.access}`
        }
      })
      const data = response.data
      console.log(data);
      setAllProjects(data)
    }

    AllProjectsView()

  }, [])

  return (
    <div>

      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={9} md={3}>
          <div className="right-content mx-auto mt-10 ">
            <p className="flex flex-col text-lg font-bold ml-24">Category</p>
            <div className="">
              <div className="flex justify-center">
                <div style={{ height: "70vh", maxWidth: "800px", width: "100%" }} className="ml-20  mt-7">
                  <div className="flex flex-col"> {/* Container for both sections */}
                    <div>
                      <FormControl sx={{ m: 1, minWidth: 270 }}>
                        <InputLabel id="demo-multiple-checkbox-label">select categories</InputLabel>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="demo-simple-select-autowidth"
                          value={category}
                          onChange={handleChange}
                          autoWidth
                          label="Age"
                          MenuProps={{ onClose: showInputLabel }}
                        >
                          <MenuItem value="">
                            <em>Select categories</em>
                          </MenuItem>
                          <MenuItem sx={{ minWidth: 270 }} value={10}>Python developer</MenuItem>
                          <MenuItem sx={{ minWidth: 270 }} value={11}>Django developer</MenuItem>
                          <MenuItem sx={{ minWidth: 270 }} value={12}>Mern stack developer</MenuItem>
                          <MenuItem sx={{ minWidth: 270 }} value={13}>Flutter developer</MenuItem>
                          <MenuItem sx={{ minWidth: 270 }} value={14}>Dotnet developer</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    {/* Experience Level */}

                    <div className="flex flex-col ml-4"> {/* Container for experience levels */}
                      <h4 className="text-lg mb-2 mt-3 font-bold">Experience Level</h4>
                      <RadioGroup value={selectedLevel} onChange={handleLevelChange}>
                        <FormControlLabel
                          value="entry"
                          control={<Radio sx={{ borderRadius: '2' }} />}
                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>Entry Level</InputLabel>}
                        />
                        <FormControlLabel
                          value="intermediate"
                          control={<Radio />}
                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>Intermediate</InputLabel>}
                        />
                        <FormControlLabel
                          value="expert"
                          control={<Radio />}
                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>Expert</InputLabel>}
                        />
                      </RadioGroup>
                    </div>

                    <div className="flex flex-col ml-4"> {/* Container for experience levels */}
                      <h4 className="text-lg mb-2 mt-3 font-bold">Fixed price</h4>
                      <RadioGroup >
                        <FormControlLabel
                          value="less1"
                          control={<Radio sx={{ borderRadius: '2' }} />}
                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>Less than $100</InputLabel>}
                        />
                        <FormControlLabel
                          value="1bw5"
                          control={<Radio />}
                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>$100 to 500$</InputLabel>}
                        />
                        <FormControlLabel
                          value="5bw1"
                          control={<Radio />}
                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>$500 to $1k</InputLabel>}
                        />
                        <FormControlLabel
                          value="1kto5k"
                          control={<Radio />}
                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>
                            $1k to $5k
                          </InputLabel>}
                        />
                        <FormControlLabel
                          value="5k+"
                          control={<Radio />}

                          label={<InputLabel id="demo-simple-select-label" style={{ color: "black", fontWeight: "bold" }}>$5k+</InputLabel>}
                        />
                      </RadioGroup>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={7} md={8}>
          <div className="mt-10  ">
            <div className="flex gap-4">
              <p
                className={`filter ${selectedFilter === 'bestMatches' ? 'selected' : ''}`}
                onClick={() => handleFilterClick('bestMatches')}
                style={{ 'fontWeight': '700' }}
              >
                Best matches
              </p>
              <p
                className={`filter ${selectedFilter === 'mostRecent' ? 'selected' : ''}`}
                onClick={() => handleFilterClick('mostRecent')}
                style={{ 'fontWeight': '700' }}
              >
                Most recent
              </p>
              <p
                className={`filter ${selectedFilter === 'savedJobs' ? 'selected' : ''}`}
                onClick={() => handleFilterClick('savedJobs')}
                style={{ 'fontWeight': '700' }}
              >
                Saved projects
              </p>
            </div>
          </div>

          <div className="horizontal-line max-w-6xl ml-auto"></div>
          <div className="flex justify-end">
            <div>
              {AllProjects.length === 0 ? (
                <div className="flex justify-center items-center">
                  <p>No project found</p>
                </div>
              ) : (
                AllProjects.map(project => (
                  <div key={project.id} className="flex flex-col">
                    <Card className="border-y-2  border-gray-100 max-w-6xl  hover:bg-gray-200 transition duration-300" onClick={() => navigate(`/projects/${project.id}`)}>
                      <CardContent style={{ position: 'relative' }}>
                        <div>
                          <FavoriteBorderIcon
                            onClick={handleClick}
                            style={{
                              position: 'absolute',
                              top: 25,
                              right: 25,
                              zIndex: 1,
                              //  backgroundColor: isClicked ? 'green' : 'inherit', // Change color to green when clicked
                            }}
                          />
                        </div>
                        <div className="mb-5" style={{ display: 'flex', flexDirection: 'column' }}>
                          <ProjectItemCreated project={project} />
                          <Typography style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>
                            {project.title}
                          </Typography>
                          <div style={{ display: 'flex' }}>
                            <Typography>{project.price_type + ' - '}</Typography>
                            <Typography> ${project.price + ' - '}</Typography>
                            <Typography> {project.level.name}</Typography>
                          </div>
                        </div>
                        {/* <h2 className="font-bold mb-2">{project.category ? project.category.name : ''}</h2> */}
                        <h2>{project.description}</h2>
                        <p className="mt-5">
                          <ProjectSkills project_id={project.id} />
                        </p>
                        <p className="mt-5"><VerifiedIcon style={{ color: 'gray' }} /> Payment verified</p>
                        {/* <h2>note: {project.note}</h2>
                          {console.log("Yoyooooooooo", project.skills.map(skill => skill.name))}
                          <h2>project_type: {project.project_type}</h2>
                        <h2>status: {project.status}</h2> */}
                      </CardContent>
                    </Card>
                  </div>
                ))
              )}
        <Footer/>
            </div>
          </div>
        </Grid>
      </Grid>
    </div >
  )
}

export default Home