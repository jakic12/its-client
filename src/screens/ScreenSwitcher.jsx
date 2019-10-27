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
          key={`screen_${screen.path}_${i}`}
          path={screen.path}
          exact={screen.isExact}
          component={screen.component}
        />
      ))}
    </div>
  );
};

export default ScreenSwitcher;
