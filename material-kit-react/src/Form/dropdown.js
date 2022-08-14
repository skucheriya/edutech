import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import User from "../pages/User";
import logo from "../Landing/logo.png";
import { storeUser } from "../store/actions/userActions";
import CreateMeeting from "./CreateMeeting";
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
    //   name: props.user.name??'',
      dob: '',
      number: '',
    //   email: props.user.email??'',
      educationDesc: ''
      // username: '',
      // password: '',
  })
  const [Sectors,setSectors]=useState([]);
  const [streams,setstreams]=useState([]);
  const [substreams,setsubstreams]=useState([]);
  const [sectorValue,setsectorValue]=useState("none");
  const [streamsValue,setstreamsValue]=useState("none");
  const [substreamValue,setsubstreamValue]=useState("none");
  const [mentorList,setmentorList]=useState([]);
//   const [screen,setScreen]=useState("mentorList")
  // const [screen,setScreen]=useState("CreateMeeting")
  const [screen,setScreen]=useState("Counseling Details")
  

  useEffect(()=>{
    getData();
  },[])
    
    const handleChange = (key,value) => {
        setUserDetails(old=>({...old, [key]: value}))
    }
    const getData = async()=>{
        const {data} = await axios.get(
            `${constants.BASE_API_URL}/api/dropdowns`
          );
          setSectors(data.fields)
          console.log("data",data.fields)
    }
  return (
    <div className="landing-container">
      <div className="landing-overlay register-overlay">
        <div className="landing-logo">
          <img src={logo} alt="logo" />
        </div>
        
            {screen==="Counseling Details"&&
            <div className="landing-inner-container register-container">
          <div className="landing-sub-container2">
            <Typography variant="h1" component="h1" className="landing-heading2 register">
              Counseling Details 
            </Typography>
            <div className="landing-button-container form-container">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                //   props.storeUser({ ...props.user, ...userDetails });
                const obj ={
                    sector:sectorValue!=="none"?Sectors[sectorValue].name:null,
                    stream:streamsValue!=="none"?streams[streamsValue].name:null,
                    subStream:substreamValue!=="none"?substreams[substreamValue].name:null,
                }
                console.log("obj",obj)
                  const { data } = await axios.post(`${constants.BASE_API_URL}/api/users/mentorList`, {...obj});
                  setScreen("mentorList")
                  setmentorList(data)
                  console.log(data);
                }}
              >
                <div className="input-container">
                  <label>Sectors</label>
                  <select value={sectorValue} onChange={({target})=>{
                    if(target.value==="none"){
                        setstreams([])
                        setsubstreams([])
                        setsectorValue("none")
                        setstreamsValue("none")
                        setsubstreamValue("none")
                        return
                    }
                    setstreams(Sectors[target.value].streams)
                    setsectorValue(target.value)
                    setsubstreams([])
                    setstreamsValue("none")
                        setsubstreamValue("none")
                  }}>
                    <option value="none">none</option>
                    {Sectors.map((item,key)=>{
                        return(
                            <option key={key} value={key}>{item.name}</option>
                        )
                    })}</select>
                </div>
                {streams.length!==0?
                <div className="input-container">
                <label>streams</label>
                <select value={streamsValue} onChange={({target})=>{
                    if(target.value==="none"){
                        setsubstreams([])
                        setstreamsValue("none")
                        setsubstreamValue("none")
                        return
                    }
                    console.log("target.",target.value)
                  setsubstreams(streams[target.value].subStreams)
                  setstreamsValue(target.value)
                        setsubstreamValue("none")

                }}>
                          <option value="none">none</option>
                  {streams.map((item,key)=>{
                      return(
                          <option key={key} value={key}>{item.name}</option>
                      )
                  })}</select>
              </div>:null
              }
              {substreams.length!==0?
                <div className="input-container">
                <label>Sub Streams</label>
                <select value={substreamValue} onChange={({target})=>{
                    console.log("value",substreams[target.value].name)
                    if(target.value==="none"){
                        setsubstreamValue("none")
                        return
                    }
                    setsubstreamValue(target.value)
                //   setstreams(Sectors[target.value].streams)
                }}>
                          <option value="none">none</option>

                  {substreams.map((item,key)=>{
                      return(
                          <option key={key} value={key}>{item.name}</option>
                      )
                  })}</select>
              </div>:null
              }
                <Button className="landing-button" type="submit">
                  <div className="landing-button-title">Submit</div>
                </Button>
              </form>
            </div>
          </div>
          </div>
          }
          {screen==="mentorList"&&
           <div >
            
           
            <User mentorList={mentorList}/>
         </div>
          }
          {
            screen==="CreateMeeting"&&
            <CreateMeeting/>
          }
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
