import React from "react";
import { UserAuth } from "./Context";
import { Link } from 'react-router-dom';


export const UserName = () => {
    const { logOut, user } = UserAuth();
  let rtn;
    const handleSignOut = async () => {
      try {
        await logOut();

      } catch (error) {
        console.log(error);
      }
    };
  
    return (
        <div>
           {user?.displayName &&  (
        <button onClick={handleSignOut}>
          Logout
        </button>)}
        {!user?.displayName && (
        <div><span>Welcome Guest</span><br/><Link to='/profile/signin'>Sign in</Link></div>)}
      </div>
    );
  };
  
//   export default UserName;