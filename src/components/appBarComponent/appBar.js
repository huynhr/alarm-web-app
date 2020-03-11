import React, { Fragment, useContext } from 'react';
import { store } from '../../store/store';
import actionTypes from '../../store/actionsTypes';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from "react-google-login";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

function AppBarComponent() {
  const { state, dispatch } = useContext(store)

  console.log('state: ', state);

  const googleResponse = async(response) => {
    const payload = {
      access_token: response.accessToken,
      userProfile: response.profileObj
    };
    const api_response = await axios.post("http://localhost:3000/api/v1/auth", payload);
    if (api_response.headers["x-auth-token"]) {
      console.log("response: ", api_response);
      dispatch({ type: actionTypes.AUTHENTICATED_UPDATE, payload: true });
      dispatch({
        type: actionTypes.JWT_UPDATE,
        payload: api_response.headers["x-auth-token"]
      });
    } else {
      dispatch({ type: actionTypes.AUTHENTICATED_UPDATE, payload: false });
      onFailure();
    }
  };

  const onFailure = () => alert("Login Failed.");

  const authButton = state.isAuthenticated ? (
    <Fragment>
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={() => {
          dispatch({type: actionTypes.AUTHENTICATED_UPDATE, payload: false});
          dispatch({type: actionTypes.JWT_UPDATE, payload: ''});
        }}
      />
    </Fragment>
  ) : (
    <Fragment>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={googleResponse}
        onFailure={onFailure}
      />
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            // className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" /*className={classes.title}*/>
            News
          </Typography>
          {authButton}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default AppBarComponent;