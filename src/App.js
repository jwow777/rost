import { CssBaseline } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router";
import Login from "./Login";
import ProtectRoute from "./ProtectedRoute";
import Users from "./Users";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setLoggedIn(true);
      history.push('/');
    }
  }, [history]);

  function handleLogin() {
    setLoggedIn(true);
  }

  return (
    <>
      <CssBaseline />
        <Switch>
          <ProtectRoute 
            exact path='/' 
            loggedIn={loggedIn} 
            setLoggedIn={setLoggedIn} 
            component={Users} 
          />
          <Route path='/sign-in'>
            <Login 
              handleLogin={handleLogin}
            />
          </Route>
        </Switch>
    </>
  );
}
