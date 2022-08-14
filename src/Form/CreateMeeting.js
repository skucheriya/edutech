import React from 'react';

function CreateMeeting(props) {
    let gapi = window.gapi
let CLIENT_ID = "49041614094-b8f21uke9f12l1k6k3cvjtjsu9j69948.apps.googleusercontent.com"
let API_KEY = "AIzaSyC5UNBaSXGXRtxgfi7M3t8t7uLMuOdmFFY"
let DISCOVERY_DOCS=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
let SCOPES = "https://www.googleapis.com/auth/calendar.events"
    const addCalendarEvent = (startTime,address,clientName) => {
        console.log("nssvn")
        gapi.load('client:auth2', () => {
          gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          });
    
    
          gapi.client.load('calendar', 'v3')
    //time zone list:
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
          let timeZone = "Asia/India"; 
          let duration = '00:30:00'; //duration of each event, here 30 minuts
    
    
        //event start time - im passing datepicker time, and making it match      //with the duration time, you can just put iso strings:
    //2020-06-28T09:00:00-07:00' 
    
         let startDate = new Date();
          let msDuration = (Number(duration.split(':')[0]) * 60 * 60 + Number(duration.split(':')[1]) * 60  + Number(duration.split(':')[2])) * 1000;
          let endDate = new Date(startDate.getTime() + msDuration);
          let isoStartDate = new Date(startDate.getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().split(".")[0];
          let isoEndDate = new Date(endDate.getTime()-(new Date().getTimezoneOffset())*60*1000).toISOString().split(".")[0];
    
    
    //sign in with pop up window
          gapi.auth2.getAuthInstance().signIn()
          .then(() => { 
            let event = {
              'summary': clientName, // or event name
              'location': address, //where it would happen
              "start": {
                "date": "2015-06-01"
               },
               "end": {
                "date": "2015-06-02"
               },
               "recurrence": [
                "EXDATE;VALUE=DATE:20150610",
                "RDATE;VALUE=DATE:20150609,20150611",
                "RRULE:FREQ=DAILY;UNTIL=20150628;INTERVAL=3"
               ],
              'reminders': {
                'useDefault': false,
                'overrides': [
                  {'method': 'popup', 'minutes': 20}
                ]
              }
            }
             
    //if you need to list your events than keep it
             gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            }).then(response => {
              const events = response.result.items
              console.log('EVENTS: ', events)
            })
            
     //end of event listing
           
            let request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event,
            })
    
    
            request.execute(event => {
              console.log(event)
              window.open(event.htmlLink)
            })
            
    
    
          })
        })
      }
    return (
        <div>
          <button onClick={()=>addCalendarEvent(new Date().getDate()+1,"nigadi","pk0106288@gmail.com")}>handleClick</button>  
        </div>
    );
}

export default CreateMeeting;