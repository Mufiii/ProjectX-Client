
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import store from './Redux/store.jsx'


// let authToken = JSON.parse(localStorage.getItem('authToken'))


// axios.interceptors.request.use((request)=>{
//     console.log(request,'111111111');
//     if (authToken) {
//         request.headers.Authorization = `Bearer ${authToken.access}`
//     }
//     return request;
// })


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ThemeProvider >
        <Provider store={store}>
           <App />
        </Provider>
      </ThemeProvider>
  </BrowserRouter>
)
