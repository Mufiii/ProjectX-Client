
import axios from 'axios';


const VendorRegister = () => {


  let VendorRegisterView = async(e ) => {
    e.preventDefault()
    try{    
        let response = await axios.post('http://127.0.0.1:8000/hire_talent/', {
            'email': e.target.email.value,
            'first_name': e.target.first_name.value,
            'last_name': e.target.last_name.value,
            'country': e.target.country.value
        })
        
        let data = await response.data.data
        console.log("An Verification Email is send to your email")
        console.log(data); 
    }catch (error){
      console.log((error));
    }

  }
  return (
    <div>

      <h1 className="text-center">VendorRegister</h1>
      <form onSubmit={VendorRegisterView}>
      <input label="email" size="lg" name="email"/>
      <input label="first_name" size="lg" name="first_name"/>
      <input label="last_name" size="lg" name="last_name"/>
      <input label="country" size="lg" name="country"/>
      <button type='submit'>Submit</button>
      </form>

      
    </div>
  )
}

export default VendorRegister