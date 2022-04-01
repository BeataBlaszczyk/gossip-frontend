
import axios from "axios";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";



function Submit(props){
    let navigate = useNavigate();
  const  [secret, setSecret] = useState("");


  useEffect(() => {


    fetch("https://gossip-backend.vercel.app/submit", {
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
          if (JSON.parse(data)==="unauthorized") {
            navigate("/");
        }})
  
    });

    function sumbitSecret(){

        axios.post(props.link, {
            secret: secret
            
        }).then((res)=>{
            setSecret("");

            navigate("/secrets");
        })


    }



    function changeHandler(e){
        setSecret(e.target.value)
    }

    function sub(e){
        e.preventDefault();
    }


    return (

<div className="container">
  <div className="jumbotron centered">
    <i className="fas fa-key fa-6x"></i>
    <h1 className="display-3">Secrets</h1>
    <p className="secret-text">Don't keep your secrets, share them anonymously!</p>

    <form  onSubmit={sub}> 

      <div className="form-group">
        <input type="text" 
        class="form-control text-center" 
        nameName="secret" 
        placeholder="What's your secret?"
        value={secret}
        onChange={changeHandler}
         />
      </div>
      <button type="submit" class="btn btn-dark" onClick={sumbitSecret}>Submit</button>
    </form>


  </div>
</div>

    )


}

export default Submit