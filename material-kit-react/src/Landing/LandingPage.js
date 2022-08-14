import { Button, Typography } from "@mui/material";
import React from "react";
import ArrowIcon from "@mui/icons-material/ArrowForward";
import logo from "./logo.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { connect } from "react-redux";
import { storeUser } from "../store/actions/userActions";

function LandingPage(props) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      console.log("User Info----->",userInfo)
      console.log("User Info Data----->",userInfo.data)
      
      if (userInfo.data) {
        props.storeUser({
          email: userInfo.data.email,
          name: userInfo.data.name,
          picture: userInfo.data.picture,
          token: tokenResponse.access_token,
        });
        const user = await axios.get(
          `http://localhost:5000/api/users/${userInfo.data.email}`
        );
        console.log("User ----->",user)
        console.log("User Data----->",user.data)
        if (user.data) {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/form";
        }
      } else {
        alert("Something went wrong. Please try again!");
      }
    },
    // flow: 'auth-code'
  });

  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <div className="landing-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="landing-inner-container">
          <div className="landing-sub-container">
            <Typography
              variant="h2"
              component="h1"
              className="landing-heading1"
            >
              EDUCATION IS VALUABLE WHEN TAKEN CORRECTLY
            </Typography>
          </div>
          <div className="landing-sub-container2">
            <Typography
              variant="h5"
              component="h1"
              className="landing-heading2"
            >
              Don't spend your time looking for career guidance from 1000
              sources. We got your back in every situation.
            </Typography>
            <div className="landing-button-container flex-column">
              <Button
                className="landing-button"
                onClick={() => {
                  window.location.href = "/dropdown";
                }}
              >
                <div className="landing-button-title">
                  KNOW ABOUT YOU CAREER
                </div>
                <ArrowIcon />
              </Button>
              <Button
                className="landing-button"
                onClick={() => {
                  window.location.href = "/dropdown";
                }}
              >
                <div className="landing-button-title">
                  DON'T KNOW ABOUT YOU CAREER
                </div>
                <ArrowIcon />
              </Button>
              <Button
                className="landing-button"
                onClick={() => {
                  window.location.href = "/form";
                }}
              >
                <div className="landing-button-title">MENTOR LOGIN</div>
                <ArrowIcon />
              </Button>

              <Button
                className="landing-button"
                onClick={() => {
                  if (!props.user) {
                    login();
                  }else{
                    window.location.href = "/dashboard";
                  }
                }}
              >
                <div className="landing-button-title">STUDENT LOGIN</div>
                <ArrowIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  storeUser: (data) => dispatch(storeUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
