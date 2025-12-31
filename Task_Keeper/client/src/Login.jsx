import React , {useState} from "react";
import "./Login.css";


function Login(params) {  

  const [username, setUsername] = useState("");

  function handleInputChange(event) {
    setUsername(event.target.value);
  }
  function handleLogin(){
    if(username !== ""){
      params.onClick(username);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Login to Keeper-APP</h2>
        </div>
        <form className="login-form">
           <div className="input-group"> 
            <label htmlFor="username">Username:</label>
            <input value ={username} onChange={handleInputChange} type="text" id="username" name="username" required />
           </div> 
           <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button className="submit-btn" onClick={handleLogin} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;