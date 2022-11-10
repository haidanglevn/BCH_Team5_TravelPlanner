import React from "react";
import { UserAuth } from "../Context/Context";
import { Link } from 'react-router-dom';
import "./WelcomeUser.css";

const WelcomeUser= () => {
  const { logOut, user } = UserAuth();
console.log(user?.photoURL);
  const handleSignOut = async () => {
    try {
      await logOut();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="user-avatar">
        <img src={user?.photoURL || 
          'https://avatars.dicebear.com/v2/avataaars/da67f910f7ac4a0dbeaec3213b5f3d99.svg'}
          alt={user?.displayName || 'Guest'} />
      </div>
        Hello, <br />
         {user?.displayName &&  (<div><span>{user?.displayName}</span><br/>
         <button onClick={handleSignOut}>
        Logout
        </button>
      </div>)}
      {!user?.displayName && (
      <div><span>Welcome Guest</span><br/><Link to='/profile/signin'>Sign in</Link></div>)}
      <div><i class="fa-solid fa-bell"></i></div>
    </div>
   
  );
};


/* 

const WelcomeUser = (props) => {

  return (
      
      <div className="welcome" id="user-hello">
          
          <UserName/>
          
      </div>
   
  );
};*/

export default WelcomeUser; 