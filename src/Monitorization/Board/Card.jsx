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
  console.log(listName, '55555');
  const { authToken } = useContext(AuthContext)
  const boardDetails = useSelector(selectBoardDetails);

  const handleAddCardClick = () => {
    setIsAddingCard(true);
  };

  const handleCloseClick = () => {
    setIsAddingCard(false); // Set isAddingCard to false when the close button is clicked
  };



  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
    if (storedLists.length > 0) {
      setListName(''); // Reset listName if there are no stored lists
    } else {
      const latestList = storedLists[storedLists.length - 1];
      setListName(latestList);
    }
    console.log("localStorage", localStorage);
  }, []);



  const handleAddList = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/workspace/lists/',
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

      // Update local storage with the updated lists array
      const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
      const updatedLists = [...storedLists, data]; // Append the new list to the existing array
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

  const handleAddListClick = () => {
    setIsInputVisible(true);
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

    <div className='w-full' style={{ marginLeft: "20px" }}>
      <div className='flex gap-10'>


        {/* <List>
              <ListItem>
                <div className='flex items-center'>
                  <div key={index} >
                    <div className='p-3'>{lit.list_title}</div>
                    <div style={{ cursor: 'pointer' }} className='flex items-center gap-2' onClick={handleAddCardClick} >
                      <AddIcon />
                      <span>Add a Card</span>
                    </div>
                  </div>
                </div>
              </ListItem>

              <ListItem> */}
        {/* {isBoxClicked && isInputVisible ? (
                  
                ) : (
                  <div>
                    {listName && isAddingCard ? (
                      <AddCard onClose={() => setIsAddingCard(false)} />
                    ) : (
                      <div style={{ cursor: 'pointer' }} className='flex items-center gap-2' onClick={handleAddCardClick} >
                        <AddIcon />
                        <span>Add a Card</span>
                      </div>
                    )}
                  </div>
            //     )} */}
        {/* //   </ListItem>
            // </List> */}

        {boardDetails.lists.map((lit, index) => (
          <Box
            key={index}
            className='mt-3 px-3'
            sx={{
              width: "300px",
              maxWidth: 300,
              borderRadius: "10px",
              backgroundColor: isBoxClicked ? "#23262b" : "rgba(128, 128, 128, 0.3)",
              display: 'flex',
              cursor: 'pointer',
              flexShrink: 0 // Prevent shrinking
            }}
          >
        
              <List>
                <ListItem>
                  <div className='flex items-center'>
                    <div key={index}>
                      <div className='p-3'>{lit.list_title}</div>
                      <div style={{ cursor: 'pointer' }} className='flex items-center gap-2'>
                        <AddIcon />
                        <span>Add a Card</span>
                      </div>
                    </div>
                  </div>
                </ListItem>
              </List>
          </Box>
        ))}
        <Box
          key={boardDetails.lists.length}
          className='mt-3 px-3'
          sx={{
            width: "300px",
            maxWidth: 300,
            borderRadius: "10px",
            backgroundColor: "rgba(128, 128, 128, 0.3)",
            display: 'flex',
            cursor: 'pointer',
            flexShrink: 0 // Prevent shrinking
          }}
        >
          {isInputVisible ? (
            <div>
              <input
                type="text"
                name='list_title'
                placeholder="Enter list title"
                className='w-full rounded-md h-10 mt-3 px-3 border-2 border-gray-100'
                onChange={handleChange}
                style={{ backgroundColor: "#23262b", color: 'white' }}
              />
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
            </div>
          ) : (
            <List>
              <ListItemIcon className='flex items-center gap-2' onClick={handleAddListClick}>
                <AddIcon /> {boardDetails.lists.length === 0 ? 'Add a list' : 'Add another list'}
              </ListItemIcon> 
            </List>
          )}

        </Box>
      </div>
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