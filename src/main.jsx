import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { store } from './customer/state/store.js';
import Layout from './Layout';
import ReactGA from 'react-ga';

ReactGA.initialize('G-509RBXK1MX');

const MainApp = () => {
  useEffect(() => {
    const trackPageView = () => {
      ReactGA.pageview(window.location.pathname + window.location.search);
    };

    trackPageView();
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <App/>
        </Layout>
      </Provider> 
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <MainApp />
  </React.StrictMode>
);
