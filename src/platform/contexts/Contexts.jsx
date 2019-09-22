import React from 'react'

export const UserContext = React.createContext({
  accessToken: undefined,
  userData: undefined,
  setAccessTokenAndUserData: (accessToken,userData) => {}
});