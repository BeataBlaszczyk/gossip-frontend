import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {

  let navigate = useNavigate()
  useEffect(() => {

  

    fetch("https://gossip-backend.vercel.app/secrets", {
      method: "GET",
     credentials: "include",
      withCredentials: true, 
      crossDomain: true, 
      
      headers: {"Content-Type": "application/json",
      'Accept': 'application/json'},
     })
      .then((res) => {
     
        res.text().then(data=> {
          
          console.log(data)
          if ((data)==="unauthorized") {
            navigate("/");
         
        }else{
          navigate("/secrets");
        }})
  
    });
  });

  

  return (
    <div className="jumbotron centered">
      <div className="container container-home">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">Secrets</h1>
        <p className="lead">Don't keep your secrets, share them anonymously!</p>
        <hr />

{/* 
        <Link to="/Login">Invoices</Link> |{" "}
        <Link to="/Register">Expenses</Link> */}

        <a
          className="btn btn-light btn-lg"
          href="/register"
          name="register"
          role="button"
          
        >
          Register
        </a>
        <a
          className="btn btn-dark btn-lg"
          href="/login"
          name="login"
          role="button"
         
        >
          Login
        </a>
      </div>
    </div>
  );
}

export default Home;
