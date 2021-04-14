import React from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() => props.loggedIn ? <Component {...props} /> : <Redirect to='./sign-in' />}
    </Route>
  )
}

export default ProtectRoute;