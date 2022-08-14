import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import logo from "../Landing/logo.png";
import { storeUser } from "../store/actions/userActions";
import * as constants from '../utils/constants'

const CustomInput = (props) => {
    return <div className="input-container">
        <label>
            {props.label}
        </label>
        <input placeholder={props.placeholder} value={props.value} type={props.type} onChange={props.onChange} required disabled={props.disabled} style={{color:props.disabled?'rgba(249, 244, 244, 0.5)':'white'}}/>
    </div>
}

const RegistrationForm = (props) => {
  const [userDetails, setUserDetails] = useState({
      name: props.user.name??'',
      dob: '',
      number: '',
      email: props.user.email??'',
      educationDesc: ''
      // username: '',
      // password: '',
  })
    
    const handleChange = (key,value) => {
        setUserDetails(old=>({...old, [key]: value}))
    }
  return (
    <div className='landing-container'>
    <div className='landing-overlay register-overlay'>
      <div className='landing-logo'>
        <img src={logo} alt="logo"/>
      </div>
      <div className='landing-inner-container register-container'>
        <div className='landing-sub-container'>
          <Typography
            variant="h2"
            component="h1"
            className='landing-heading1'
          >
            SAVE TIME, SAVE PROFILE
          </Typography>
        </div>
        <div className='landing-sub-container2'>
          <Typography
            variant="h1"
            component="h1"
            className='landing-heading2 register'
          >
            Register
          </Typography>
          <div className='landing-button-container form-container'>
              <form onSubmit={async(e)=>{
                e.preventDefault()
                props.storeUser({...props.user,...userDetails})
                const { data } = await axios.post(`${constants.BASE_API_URL}/api/users/profile`,{...props.user,...userDetails})
                window.location.href="/dropdown"
                }}>
              <CustomInput label="Name" placeholder="John Doe" type="text" disabled={userDetails.name!==''} value={userDetails.name} onChange={(e)=>handleChange('name',e.target.value)}/>
              <CustomInput label="Date Of Birth" type="date" value={userDetails.dob} onChange={(e)=>handleChange('dob',e.target.value)}/>
              <CustomInput label="Phone Number" placeholder="1234567890" value={userDetails.number} type="text" onChange={(e)=>handleChange('number',e.target.value)}/>
              <CustomInput label="Email" placeholder="johndoe@gmail.com" disabled={userDetails.dob!==''} value={userDetails.email} type="email" onChange={(e)=>handleChange('email',e.target.value)}/>
              {/* <CustomInput label="Username" placeholder="john123" type="text" value={userDetails.username} onChange={(e)=>handleChange('username',e.target.value)}/> */}
              {/* <CustomInput label="Password" placeholder="*****" type="password" value={userDetails.password} onChange={(e)=>handleChange('password',e.target.value)}/> */}
              
              <div className="input-container">
        <label>
            Education Description
        </label>
        <textarea rows="4" cols="50" placeholder="About Computer Engineering" onChange={(e)=>handleChange('educationDesc',e.target.value)}/>
        </div>
            <Button className='landing-button' type="submit">
              <div className='landing-button-title'>
                Submit
              </div>
            </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer.user
 })

const mapDispatchToProps = dispatch => ({
  storeUser: (data) => dispatch(storeUser(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm)
