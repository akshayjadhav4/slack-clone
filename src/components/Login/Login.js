import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../config/firebase";
import { useStateValue } from "../../contextApi/StateProvider";
import { actionTypes } from "../../contextApi/reducer";
function Login() {
  const [state, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://a.slack-edge.com/64d6c/marketing/img/promos/promo-rimeto.jpg"
          alt=""
        />
        <h1>Sign in to Slack clone</h1>
        <p>slackclone.slack.com</p>
        <Button onClick={signIn}>Sign in With Google</Button>
      </div>
    </div>
  );
}

export default Login;
