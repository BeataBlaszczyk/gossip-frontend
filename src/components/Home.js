import React, {useState} from "react";
import { Link } from "react-router-dom";

function Home() {

  

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
