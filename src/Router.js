import React from "react";
import { BrowserRouter, Route } from 'react-router-dom'

//import other

//import all the screens
import Dash from './screens/Dash'

import Login from './screens/Login' // test import

function Router() {
  console.log(`%c   /$$   /$$  /$$$$$$  /$$    /$$ /$$$$$$$$       /$$$$$$$$ /$$   /$$ /$$   /$$
  | $$  | $$ /$$__  $$| $$   | $$| $$_____/      | $$_____/| $$  | $$| $$$ | $$
  | $$  | $$| $$  \\ $$| $$   | $$| $$            | $$      | $$  | $$| $$$$| $$
  | $$$$$$$$| $$$$$$$$|  $$ / $$/| $$$$$         | $$$$$   | $$  | $$| $$ $$ $$
  | $$__  $$| $$__  $$ \\  $$ $$/ | $$__/         | $$__/   | $$  | $$| $$  $$$$
  | $$  | $$| $$  | $$  \\  $$$/  | $$            | $$      | $$  | $$| $$\\  $$$
  | $$  | $$| $$  | $$   \\  $/   | $$$$$$$$      | $$      |  $$$$$$/| $$ \\  $$
  |__/  |__/|__/  |__/    \\_/    |________/      |__/       \\______/ |__/  \\__/
                                                                               `, 'color: cyan')
  return (
    <BrowserRouter>
      <Route path="/" component={Login} />
    </BrowserRouter>
  );
}

export default Router;
