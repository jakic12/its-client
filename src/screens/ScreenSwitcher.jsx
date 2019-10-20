import React from "react";

// import scss
import "../scss/screens/ScreenSwitcher.scss";

// external libs
import { Route } from "react-router-dom";

const ScreenSwitcher = ({ screens }) => {
  return (
    <div className={`screenSwitcher`}>
      {screens.map((screen, i) => (
        <Route
          key={`screen_${screen.urlName}_${i}`}
          path={screen.exactPath ? screen.exactPath : `/${screen.urlName}`}
          exact={!!screen.exactPath}
          component={screen.component}
        />
      ))}
    </div>
  );
};

export default ScreenSwitcher;
