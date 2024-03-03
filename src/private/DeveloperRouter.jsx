import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const DeveloperRouter = ({children}) => {

  const {user} = useContext(AuthContext)
  const Navigate = useNavigate()

  return (
    <div>
      
        {user.is_developer ? children:<Navigate to={'/home'}/>}

    </div>
  )
}

export default DeveloperRouter