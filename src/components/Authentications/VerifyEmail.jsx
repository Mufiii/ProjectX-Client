import axios from 'axios'
import { useEffect } from 'react'

const VerifyEmail = ({tokens}) => {


  const Emailverify = async (e) => {
      e.preventDefault()

      let response = await axios.get(`http://127.0.0.1:8000/email_verify/?${e}`)

      const data = response.data
      console.log(data);
  }
  useEffect(() => {
    Emailverify(tokens)
  }, [])

  return (
    <div>

    </div>
  )
}

export default VerifyEmail