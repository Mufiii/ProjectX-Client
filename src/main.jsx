
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import store from './Redux/store.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ThemeProvider >
        <Provider store={store}>
           <App />
        </Provider>
      </ThemeProvider>
  </BrowserRouter>
)
