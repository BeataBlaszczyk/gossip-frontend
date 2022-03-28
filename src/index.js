import React, {useState} from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import { BrowserRouter, Routes,  Route } from "react-router-dom";
import Login from "./routes/login";
import Secrets from "./routes/secrets";




ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login whatToDo="Login"   link="https://gossip-backend.vercel.app/login"/>} />
      <Route path="register" element={<Login whatToDo="Register"  link="https://gossip-backend.vercel.app/register"/>} />
      <Route path="secrets" element={<Secrets isLogged={true} />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
