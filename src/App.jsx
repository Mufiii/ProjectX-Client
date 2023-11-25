
import VendorRegister from "./components/Authentications/VendorRegister"
import { Routes,Route } from "react-router-dom"
import Home from "./components/Home"

function App() {

  return (
    <div>
      <Routes>
        <Route element={<VendorRegister/>} path="/register" />
        <Route element={<Home/>} path="/" />
      </Routes>

    </div>
  )
}

export default App
