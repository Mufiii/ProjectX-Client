import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, CardContent, Card, Autocomplete, Chip, Modal, Box }
  from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '80%',
  bgcolor: '#fff', // Set background color
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  overflowY: 'auto',
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const ProjectCreate = ({ isOpen, handleClose }) => {

  const { authToken, allSkills, setAllSkills } = useContext(AuthContext)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    note: '',
    project_type: '',
    skills: [],
    category: '',
    level: '',
    price_type: '',
    price: '',
    status: '',
    end_date: ''
  });


  let newProject = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/vendor/project/',
        {
          ...formData,
          skills: formData.skills.map((skill) => skill.id),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          }
        })
      const data = response.data
      console.log('*****************', data);

    } catch (error) {
      console.log((error));
    }
  }

  const getAllSkills = async (e) => {

    if (e && e.trim().length > 0) {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/developer/skills/?q=${e}`,
          {
            headers: {
              Authorization: `Bearer ${authToken.access}`,
            },
          }
        );
        const skills = response.data;
        setAllSkills(skills);
      } catch (error) {
        console.log(error);
      }
    } else {
      setAllSkills([]);
    }
  };

  const handleDelete = (skillToDelete) => () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill.name !== skillToDelete.name),
    }));
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className="flex">
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Card className="">
          <CardContent> */}
            <Box sx={style}>
              <div style={modalContentStyle}>
                <form onSubmit={newProject} >
                  <h3>Add Project</h3>
                  <TextField
                    fullWidth
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    type="text"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />

                  <TextField
                    fullWidth
                    label="Note"
                    type="text"
                    multiline
                    name="note"
                    rows={4}
                    value={formData.note}
                    onChange={handleInputChange}
                  />

                  <Autocomplete
                    multiple
                    options={allSkills}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) => {
                      console.log('Selected Skills:', value);
                      setFormData((prevData) => ({ ...prevData, skills: value }));
                    }}

                    onInputChange={(event, newInputValue) => getAllSkills(newInputValue)}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          key={index}
                          label={option.name}
                          onDelete={() => handleDelete(option)}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills"
                        placeholder="Add Skills"
                        fullWidth
                      />
                    )}
                  />



                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={1}>Python developer</MenuItem>
                      <MenuItem value={2}>Python full stack developer</MenuItem>
                      <MenuItem value={3}>Flutter developer</MenuItem>
                      <MenuItem value={4}>Mern stack developer</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Level</InputLabel>
                    <Select
                      label="Level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={1}>Entry</MenuItem>
                      <MenuItem value={2}>Intermediate</MenuItem>
                      <MenuItem value={3}>Expert</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="open">open</MenuItem>
                      <MenuItem value="closed">closed</MenuItem>
                      <MenuItem value="completed">completed</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Project Type</InputLabel>
                    <Select
                      label="Project Type"
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleInputChange}
                    >
                      <MenuItem value='One-time project'>One-time project</MenuItem>
                      <MenuItem value='Ongoing project'>Ongoing Project</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Price Type</InputLabel>
                    <Select
                      label="Price type"
                      name="price_type"
                      value={formData.price_type}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Fixed-Price">Fixed Price</MenuItem>
                      <MenuItem value="Price in a range">Price in a Range</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    name="price"
                    label="Price"
                    type="text"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                  />

                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </form>


              </div>
              <div className="">
                <img src="https://img.freepik.com/free-vector/project-planning-abstract-concept-vector-illustration-project-plan-creation-schedule-management-business-analysis-vision-scope-timeline-timeframe-estimate-document-abstract-metaphor_335657-2942.jpg?size=626&ext=jpg&ga=GA1.1.1586837442.1703038971&semt=ais" alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Box>
          {/* </CardContent>
        </Card> */}
      </Modal>
    </div>
  )
}

export default ProjectCreate