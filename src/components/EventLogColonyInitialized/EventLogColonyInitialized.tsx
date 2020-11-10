import React, { FunctionComponent } from "react";
import EventLog from "../EventLog/EventLog";

interface Props {
  eventDate: Date;
}

const EventLogColonyInitialized: FunctionComponent<Props> = (props) => {
  const primaryText = "Congratulations! It's a beautiful baby colony!";
  return <EventLog eventMessage={primaryText} eventDate={props.eventDate} />;
};

export default EventLogColonyInitialized;
