import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, Route, BrowserRouter, Routes } from "react-router-dom";
import Secrets from "./secrets";



function Login(props) {
  
  let navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  //const [isLogged, setIsLogged]=useState(false)
  function changeHandler(e) {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function goHome(){
    navigate("/") 
  }

  function log() {

    fetch(props.link, {
      method: "POST",
      withCredentials: true, 
      crossDomain: true, 
      
      headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      
      username: user.username,
      password: user.password,
    }),  })
      .then((res) => {
     
      
        setUser({ username: "", password: "" });
     
        res.json().then(data=> console.log(data));

        //console.log(res.data);
        //console.log("?")
       // navigate("/secrets", {state: {isLogged:res.data}});
   
      //     });
    });
  }

  function log2() {
    Axios.post(props.link, {
      
    username: user.username,
    password: user.password,
  }, {
    withCredentials: true, crossDomain: true, headers: {"Content-Type": "application/json"} }).then((res) => {
   
    
      setUser({ username: "", password: "" });
   
      console.log(res.data);
      console.log("?")
      //navigate("/secrets", {state: {isLogged:res.data}});
 
    //     });
  });
  }

  return (
    <div className=" container container-login mt-5">
      
      {/* {isLogged ? <Redirect to="/secrets" /> : null } */}
      <h1>{props.whatToDo}</h1>
      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(event) => event.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    value={user.username}
                    type="email"
                    className="form-control"
                    name="username"
                    onChange={changeHandler}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    value={user.password}
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={changeHandler}
                  />
                </div>

                <button className="btn btn-light" onClick={log2} >
                  axios
                </button>

           
                <button onClick={log} type="submit" className="btn btn-dark">
                fetch
                  {/* {props.whatToDo} */}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <a
                className="btn btn-block btn-google"
                href="/auth/google"
                role="button"
              >
                <i className="fab fa-google"></i>
                Sign In with Google
              </a>
              <a
                className="btn btn-block btn-facebook"
                href="/auth/facebook"
                role="button"
              >
                <i className="fab fa-facebook"></i>
                Sign Up with Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
