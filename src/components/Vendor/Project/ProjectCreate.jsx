import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const ProjectCreate = () => {

  const { authToken } = useContext(AuthContext)
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    note: '',
    type: '',
    skills: [],
    category: '',
    level: '',
    price_type: '',
    price: '',
  });


  let newProject = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/vendor/project/', 
      { ...formData, skills: formData.selectedSkills },
      {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        }
      })
        const data = response.data
        console.log(data);
      
    }catch(error){
      console.log((error));
    }
  }

  const getAllSkills = async (e) => {
    // e.preventDefault() // Commenting this line out as it's not necessary here
    if (e && e.trim().length > 0) {
      console.log("dfghjk");
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
        console.log(response.data);
        setAllSkills(skills);
      } catch (error) {
        console.log(error);
      }
    } else {
      setAllSkills([]);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // if (name === "skills") {
    //   const filteredSkills = allSkills.filter((skill) =>
    //   skill.name.toLowerCase().startsWith(value.toLowerCase())
    //   );
    //   setFilteredSkills(filteredSkills);
    //   console.log(filteredSkills,'filteredSkills');
    // }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addSkill = (skill) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedSkills: [...prevData.selectedSkills, skill],
      skills: "", // Clear the input after selecting a skill
    }));
    setFilteredSkills([]); // Clear the filtered skills
  };

  // const removeSkill = (skill) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     selectedSkills: prevData.selectedSkills.filter((s) => s !== skill),
  //   }));
  // };

  const handleSkillChange = (e) => {
    const selectedSkill = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedSkill,
    }));
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  return (
    <div>
        <form onSubmit={newProject} >
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
          <TextField
            fullWidth
            label="Project Type"
            type="text"
            multiline
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />

        <div>
          <TextField
            type="text"
            placeholder="Search skills"
            name="skills"
            onChange={(e) => getAllSkills(e.target.value)}
          />

          <ul>
            {allSkills.map((skill) => (
              <li key={skill.id}>
                {skill.name}
              </li>
            ))}
          </ul>
        </div>


          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <MenuItem value="hbj">Python Developer</MenuItem>
              <MenuItem value="bgh">Python Full Stack Developer</MenuItem>
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
              <MenuItem value="entry">Entry Level</MenuItem>
              <MenuItem value="mid">Mid Level</MenuItem>
              <MenuItem value="expert">Expert Level</MenuItem>
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
              <MenuItem value="fixed">Fixed Price</MenuItem>
              <MenuItem value="range">Price in a Range</MenuItem>
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
          
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
    </form>

    </div>
  )
}

export default ProjectCreate