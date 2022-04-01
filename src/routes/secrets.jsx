import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Secrets(props) {
  const [secrets, setSecrets] = useState([]);
  //const myAppUrl = "http://localhost:3001";

  const {state} = useLocation();
//const { foundSecrets } = state || ["nie znalazłem"]; // Read values passed on state
//console.log(isLogged + "STATE")
console.log("NOWY PLIK")
let navigate = useNavigate();
//tu sprawdzić czy jest ciasteczko
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
          setSecrets(JSON.parse(data))
        }})
  
    });



    //function klik(){
       //console.log("ŁADUJE")
      /////////////////////////////
        // Axios.post("https://gossip-backend.vercel.app/secrets",
        //  {cookie: document.cookie.split('=').pop()|| ""}).then((response) => {
        //    console.log("RES__________>")
        //   console.log(response.data)
        //   (response.data) ? setSecrets(response.data):
        //   navigate("/")
         //////////////////////////////////////  

        //   })
       
      
     },[])

  function logOut() {
    document.cookie = 'connect.sid=; Max-Age=-99999999'
    Axios.get("https://gossip-backend.vercel.app/logout").then((response) => {
      
      document.cookie="connect.sid=logout; max-age=0";
 
      console.log("WYLOGOWANO");
      navigate("/");
      //
    });
  }

  return (
    <div className="jumbotron text-center">
      <div className="container">
        <i className="fas fa-key fa-6x"></i>
        <h1 className="display-3">You've Discovered My Secret!</h1>

        { secrets[0] && secrets.map( (element)=> {
             return(
          <div className="secret-container">
            <p className="secret-text">
              <span className="fire">
                <div className="myGrid">
                  🔥 <span class="rating">{element.rating}</span>
                  <img className="thumbUp" />
                  <img className="thumbDown" />
                </div>
              </span>
              <span className="secret-text">{element.content}</span>
            </p>
          </div>)
        })}

        <hr />

        <a className="btn btn-light btn-lg" onClick={logOut} role="button">
          Log Out
        </a>
        <a className="btn btn-dark btn-lg" href="/submit" role="button">
          Submit a Secret
        </a>
        {/* <button onClick={klik} > SEKRETY DEJ MNIE! </button> */}
      </div>
    </div>
  );
}

export default Secrets;
