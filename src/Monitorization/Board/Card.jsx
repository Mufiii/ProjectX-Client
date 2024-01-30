import axios from 'axios';
// import '../Workspace/Workspace.scss'
import AddIcon from '@mui/icons-material/Add';
import { Grid, ListItemIcon, ListItemText } from '@mui/material';
import { Button, List, ListItem } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectBoardDetails } from '../../Redux/slices/BoardDataSlice';
import AddCard from './AddCard';

const Card = () => {

  const [isBoxClicked, setIsBoxClicked] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [listName, setListName] = useState('');
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleCloseClick = () => {
    setIsAddingCard(false); // Set isAddingCard to false when the close button is clicked
  };

  console.log(listName, '55555');
  const { authToken } = useContext(AuthContext)
  const boardDetails = useSelector(selectBoardDetails);


  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    const latestList = storedLists[storedLists.length - 1];
    setListName(latestList);
  }, []);

  const handleAddList = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/lists/',
        {
          list_title: listName,
          board: boardDetails.id
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
          },
        }
      );

      const { message, data } = response.data;
      console.log('List added successfully:', message, data);

      const storedLists = JSON.parse(localStorage.getItem('data.title')) || [];
      console.log(storedLists, '5555');
      const updatedLists = [...storedLists, data.list_title];
      console.log(updatedLists, '6666');
      localStorage.setItem('lists', JSON.stringify(updatedLists));

      setIsBoxClicked(false);
      setIsInputVisible(false);
    } catch (error) {
      console.error('Error adding list:', error);
      console.error('RESPONSE:', error.response);
      console.error('Error mESSAGE:', error.message);
    }
  };

  const handleChange = (event) => {
    setListName(event.target.value);
  };


  const handleBoxClick = () => {
    setIsBoxClicked(true);
    setIsInputVisible(true)
  };

  const handleCloseIconClick = () => {
    setIsBoxClicked(false); // Close the box
    setIsInputVisible(false)
  };

  return (
    <div style={{ marginLeft: "20px" }}>

      <Box
        className='mt-3'
        sx={{
          width: "300px", maxWidth: 360, borderRadius: "10px",
          backgroundColor: isBoxClicked ? "#23262b" : "rgba(128, 128, 128, 0.3)"
        }}
      >
        <List>
          <ListItem>
            {isInputVisible ? (
              <input
                type="text"
                name='list_title'

                placeholder="Enter list title"
                className='w-full rounded-md h-10 px-3 border-2 border-gray-100'
                onChange={handleChange}
                style={{ backgroundColor: "#23262b", color: 'white' }}
              />
            ) : (
              <div className='flex items-center gap-10' >
                {listName ? (
                  <div className='flex items-center gap-2'>
                    <p>{listName}</p>
                  </div>
                ) : (
                  <ListItemIcon className='flex items-center gap-2' onClick={handleBoxClick} >
                    <AddIcon /> Add a list
                  </ListItemIcon>
                )}
              </div>
            )}
          </ListItem>
          <ListItem>
            {
              isBoxClicked && isInputVisible ? (
                <div className='flex justify-start items-center'>
                  <ListItem style={{ cursor: 'pointer' }}>
                    <Button type='submit' variant="contained" color="primary" onClick={handleAddList}>
                      Add list
                    </Button>
                  </ListItem>
                  <Button onClick={handleAddList} type='submit'>
                    <CloseIcon style={{ color: "white", cursor: 'pointer' }} onClick={handleCloseIconClick} />
                  </Button>
                </div>
              ) : (
                <div>
                  {isAddingCard ? (
                    // Render the AddCard component when isAddingCard is true
                    <AddCard onClose={() => setIsAddingCard(false)} />
                  ) : (
                    <div style={{ cursor: 'pointer' }} 
                      className='flex items-center gap-2' onClick={handleAddCardClick} >
                      <AddIcon />
                      <span>Add a Card</span>
                    </div>
                  )}
                </div>
              )
            }
          </ListItem>
        </List>
      </Box>
    </div>
  )
}

export default Card





{/* <div className='master'>
          <div className='board-coloumns'>
            <div className='coloumn'>
              <header>Brainstorm</header>
              <ul>
                <li>first</li>
              </ul>
              <footer> <AddIcon/> Add a card</footer>
            </div>
            <div className='coloumn'>
              <header>Brainstorm</header>
              <ul>
                <li>first</li>
                <li>firsghbbhbhbhvbht</li>
                <li>first</li>
                <li>first</li>
              </ul>
              <footer> <AddIcon/> Add a card</footer>
            </div>
          </div>
        </div> */}