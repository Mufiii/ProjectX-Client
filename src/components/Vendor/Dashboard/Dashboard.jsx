import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { fontWeight } from "@mui/system"
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectError, selectLoading, selectProjects } from "../../../Redux/slices/ProjectSlice";
import { useEffect, useState } from "react";
import { fetchAllProjectDetails } from "../../../Redux/Actions/Actions";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProjectCreate from "../Project/ProjectCreate";



const Dashboard = () => {

  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };


  useEffect(() => {
    console.log('Fetching projects...');
    dispatch(fetchAllProjectDetails())
      .then((result) => {
        console.log('Fetch success', result);
      })
      .catch((err) => {
        console.error('Fetch error', err);
      });
  }, [dispatch]);

  console.log('Current Projects:', projects);




  return (

    <div className="flex justify-center mt-36">
      <Card className="border-2 w-6/12">
        <div className="flex justify-between items-center p-8">
          <Typography style={{ fontWeight: "700", fontSize: "1.5em" }}>
            Your dashboard
          </Typography>
          {/* <Typography>{}</Typography> */}
          <Button
            style={{ borderRadius: "20px", textTransform: 'none' }}
            className="w-36 mt-4"
            variant="contained"
            color="success"
            onClick={handleOpenModal}
          >
            Post a project
          </Button>
        </div>
        <div>

          <Card style={{ borderRadius: "15px" }} className="border-2 border-gray-400 h-full w-9/12 mb-5 ml-8">
            <CardContent>
              <div className="flex justify-between items-center">
                <Typography variant="h6" component="div" className="">
                  Your postings
                </Typography>
                <Typography color={'green'} component="div">
                  See all posting
                </Typography>
              </div>
              <div className="mt-6  ">
                {projects.projectsData.map((project,index)=>(
                  <div 
                    key={index} 
                    className="hover:bg-gray-200 transition duration-300 p-3"
                    onClick={() => navigate(`/dashboard/${project.id}`)}
                  >
                <Typography
                  className="flex justify-between items-center"
                  style={{ fontWeight: '700', fontSize: '1em' }}
                  variant="body2"
                  color="black"
                  >
                  {project.title}  <HiOutlineDotsCircleHorizontal size={25} style={{color:"green"}} />
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4} mt={1}  className="gap-5">
                    <p className="flex">{project.price_type}</p>
                    <p className="flex mt-1">Created</p>
                  </Grid>
                  <Grid item xs={2} mt={1} ml={3}  >
                    <p className="flex">{project.applicants.length}</p>
                    <p className="flex">Proposals</p>
                  </Grid>
                  <Grid item xs={2} mt={1} ml={3} >
                    <p className="flex">0</p>
                    <p className="flex">Messaged</p>
                  </Grid>
                  <Grid item xs={2} mt={1} ml={3}>
                    <p className="flex">0</p>
                    <p className="flex">Hired</p>
                  </Grid>
                </Grid>
                <hr style={{ borderTop: "1px solid #ddd", margin: "12px 0" , marginTop:"0.8em" }} />
                </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* Second Card */}
      <ProjectCreate isOpen={isModalOpen} handleClose={() => setModalOpen(false)} />
      </div>
      
      )
}

export default Dashboard