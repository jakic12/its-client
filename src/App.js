import React, { useState } from "react";

//import other
import { UserContext } from './platform/contexts/Contexts'

//import all the screens
import Login from "./platform/screens/Login";

function App() {
  const [accessToken, setAccessToken] = useState();
  const [userData, setUserData] = useState();

  const isLoggedIn = accessToken && userData;

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          accessToken: accessToken,
          userData: userData,
          setAccessTokenAndUserData: (accessToken,userData) => {
            setAccessToken(accessToken)
            setUserData(userData)
          }
        }}
      >
        {!isLoggedIn ? <Login /> : <p>welcome {userData.name}</p>}
      </UserContext.Provider>
    </div>
  );
}

export default App;
