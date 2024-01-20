
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import {store,persistor} from './Redux/store.jsx'
import { PersistGate } from 'redux-persist/integration/react'


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
          <PersistGate loading={null} persistor={persistor}>
           <App />
          </PersistGate>
        </Provider>
      </ThemeProvider>
  </BrowserRouter>
)
