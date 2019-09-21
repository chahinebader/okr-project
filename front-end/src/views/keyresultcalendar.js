import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import FullCalendar from "fullcalendar-reactwrapper";
import "fullcalendar/dist/fullcalendar.min.css";
import "fullcalendar-scheduler/dist/scheduler.min.css";
import "../style/calendar.css";

import CryptoJS from "crypto-js";
let status = CryptoJS.AES.decrypt(
  localStorage.getItem("status"),
  "secret key 123"
).toString(CryptoJS.enc.Utf8);
const GET_MISSIONS = gql`
  query($userid: String!) {
    missioncalendar(userid: $userid) {
      title
      start
      end
      color
    }
  }
`;
const GET_KEYRESULTS = gql`
  query($userid: String!) {
    keyresultsbycreator(userid: $userid) {
      title
      start
      end
      color
    }
  }
`;
const GET_KEYRESULTS_MEMBER = gql`
  query($userid: String!) {
    keyresultsmember(userid: $userid) {
      title
      start
      end
      color
    }
  }
`;
let Query_Start = GET_KEYRESULTS_MEMBER;
if (status === "membre") {
  Query_Start = GET_KEYRESULTS_MEMBER;
}
if (status === "superviseur") {
  Query_Start = GET_KEYRESULTS;
} else if (status === "admin") {
    Query_Start = GET_MISSIONS;
}
class Keyresultcalendar extends React.Component {
 
  render() {
    let userid = localStorage.getItem("userId");
    
    return (
      <div id="example-component" >
        <Query query={Query_Start} variables={{ userid }}>
          {({ loading, error, data }) => {
            

            if (loading)
              return (
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              );
            if (error) return <p>Error :(</p>;
            if (status === "superviseur")
              return (
                <FullCalendar
                  id="your-custom-ID"
                  header={{
                    left: "prev,next today myCustomButton",
                    center: "title",
                    right: "month,basicWeek,basicDay"
                  }}
                  defaultDate={new Date()}
                  navLinks={true} // can click day/week names to navigate views
                  editable={false}
                  eventLimit={true} // allow "more" link when too many events
                  events={data.keyresultsbycreator}
                 
                />
              );
            if (status === "membre")
              return (
                <FullCalendar
                  id="your-custom-ID"
                  header={{
                    left: "prev,next today myCustomButton",
                    center: "title",
                    right: "month,basicWeek,basicDay"
                  }}
                  defaultDate={new Date()}
                  navLinks={true} 
                  editable={false}
                  eventLimit={true}
                  events={data.keyresultsmember}
                />
              );
              if (status === "admin")
              return (
                <FullCalendar
                  id="your-custom-ID"
                  header={{
                    left: "prev,next today myCustomButton",
                    center: "title",
                    right: "month,basicWeek,basicDay"
                  }}
                  defaultDate={new Date()}
                  navLinks={true}
                  editable={false}
                  eventLimit={true}
                  events={data.missioncalendar}
                  eventColor={data.missioncalendar.color}

                />
              );
          }}
        </Query>
      </div>
    );
  }
}

export default Keyresultcalendar;
