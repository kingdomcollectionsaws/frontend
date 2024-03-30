import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom";
import { store } from './customer/state/store.js'
import MainPage from './customer/MainPage.jsx'
import Layout from './Layout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <App/>
      </Layout>
      
     </Provider> 
    </BrowserRouter>
  
  </React.StrictMode>,
)
