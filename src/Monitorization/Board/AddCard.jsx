import axios from 'axios'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { selectBoardDetails } from '../../Redux/slices/BoardDataSlice';


const AddCard = ({ onClose }) => {

  const { authToken } = useContext(AuthContext)
  const [handleClick,setHandleClick] = useState(false)
  const boardDetails = useSelector(selectBoardDetails);
  console.log(boardDetails.lists.id,'888888888'); 
  const [addCard,setAddCard] = useState('')

  const handleCloseClick = () => {
    setHandleClick(true)
  }

  const handleChange = (event) => {
    setAddCard(event.target.value);
  };

  const handleAddCard = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/cards/',
        {
          card_title: addCard,
          list_column_id: boardDetails.lists.id
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
          },
        }
      );

      const card = response.data;
      console.log('Card added successfully:', card);
      onClose();
    } catch (error) {
      console.error('Error adding list:', error);
      console.error('RESPONSE:', error.response);
      console.error('Error mESSAGE:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddCard}>
        <input
          type="text"
          name='card'
          onChange={handleChange}
          placeholder="Enter a title for this card"
          className='w-full rounded-md h-14 px-3 border-2 border-gray-100 mb-3'
          style={{ color: 'black' }}
        />
        <Button variant='contained' type="submit">
          Add Card
        </Button>
        <Button type='button' onClick={onClose}>
          <CloseIcon style={{ color: "white", cursor: 'pointer' }} />
        </Button>
      </form>
    </div>
  )
}

export default AddCard