import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { fontWeight } from "@mui/system"
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectError, selectLoading, selectProjects } from "../../../Redux/slices/ProjectSlice";
import { useContext, useEffect } from "react";
import { fetchAllProjectDetails } from "../../../Redux/Actions/Actions";
import { AuthContext } from "../../../context/AuthContext";



const Dashboard = () => {

  const venprojects = useSelector(selectProjects);
  const dispatch = useDispatch();

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

  console.log('Current Redux State:', useSelector((state) => state)); // Log the entire Redux state
  console.log('Current Projects:', venprojects);

  if (venprojects === undefined) {
    console.log('Projects are still undefined.');
    return <p>Loading...</p>; // or handle the loading state in another way
  }


  return (

    <div className="flex justify-center mt-36">
      {/* First Card */}
      <Card className="border-2 w-6/12 border-black">
        <div className="flex justify-between items-center p-8">
          <Typography style={{ fontWeight: "700", fontSize: "1.5em" }}>
            Your dashboard
          </Typography>
          <Button
            style={{ borderRadius: "20px", textTransform: 'none' }}
            className="w-36 mt-4"
            variant="contained"
            color="success"
          >
            Post a project
          </Button>
        </div>
        <div>

          <Card style={{ borderRadius: "15px" }} className="border-2 border-gray-400 h-full w-8/12 mb-5 ml-8">
            <CardContent>
              <div className="flex justify-between items-center">
                <Typography variant="h6" component="div" className="">
                  Your postings
                </Typography>
                <Typography color={'green'} component="div">
                  See all posting
                </Typography>
              </div>
              <div className="mt-6">
                {projects.map((project) => {
                  console.log('Current Project:', project); // Add this line
                  return (
                    <div key={project.id}>
                      {/* Your existing code for mapping over projects */}
                      <Typography
                        className="flex justify-between items-center"
                        style={{ fontWeight: '700', fontSize: '1em' }}
                        variant="body2"
                        color="black"
                      >
                        {project.title} <HiOutlineDotsCircleHorizontal size={25} />
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={4} mt={1} className="gap-5">
                          <p className="flex">fixed price</p>
                          <p className="flex">Created</p>
                        </Grid>
                        <Grid item xs={2} mt={1} ml={3}  >
                          <p className="flex">0</p>
                          <p className="flex">Proposals</p>
                        </Grid>
                        <Grid item xs={2} mt={1} ml={3} >
                          <p className="flex">0</p>
                          <p className="flex">Messaged</p>
                        </Grid>
                        <Grid item xs={2} mt={1} ml={3} >
                          <p className="flex">0</p>
                          <p className="flex">Hired</p>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
                    </div>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* Second Card */}

    </div>

  )
}

export default Dashboard