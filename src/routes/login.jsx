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
            navigate("/login");
         
        }else{
          navigate("/secrets");
        }})
  
    });
  },[]);


  function goHome(){
    navigate("/") 
  }


  
function secretsy(){
  fetch("https://gossip-backend.vercel.app/secrets", {
    method: "GET",
   credentials: "include",
    withCredentials: true, 
    crossDomain: true, 
    
    headers: {"Content-Type": "application/json",
    'Accept': 'application/json'},
   })
    .then((res) => {
   
    
      setUser({ username: "", password: "" });
   
      res.text().then(data=> console.log(data));

  });
}


  function log() {

     fetch(props.link, {
      method: "POST",
      withCredentials: true, 
      crossDomain: true, 
      
      headers: {"Content-Type": "application/json",
      'Accept': 'application/json'},
    body: JSON.stringify({
      
      username: user.username,
      password: user.password,
    })  }).then( res=> {
      //setUser({ username: "", password: "" })
      //navigate("/secrets")
      console.log(res.text())}
    ).catch(err => {

      console.log("WRONG")
      console.log(err)
    })
      
        //res.text().then(data=> console.log(data));

        //console.log(res.data);
        //console.log("?")
       //navigate("/secrets");
   
      //     });
    };
  

  function log2() {
    
    Axios.post(props.link, {
          username: user.username,
    password: user.password,
  }, {
    withCredentials: true, 
    crossDomain: true, 
    headers: {"Content-Type": "application/json"} }).then((res) => {
   
    
      setUser({ username: "", password: "" });
   const expireD = (new Date(Date. now()+ 86400*1000)). toUTCString()
   console.log("TEST")
      console.log(encodeURIComponent(res.data));
      document.cookie="connect.sid="+res.data+"; expires="+expireD;
      console.log("tuz przed navigate")
      navigate("/secrets")
      //console.log("tuz przed navigate")
      //console.log("?")
      //--->navigate("/secrets");
      //console.log("tuz po navigate")
    //     });
  }).catch(err=>{
  console.log("WRONG LOGIN/REGISTER")
  console.log(err)
  navigate("/login")
  })}

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
                <button onClick={secretsy} type="submit" className="btn btn-dark">
                secretsy
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
