import React, { FunctionComponent } from "react";
import EventLog from "../EventLog/EventLog";

interface Props {
  eventDate: Date;
  transactionHash: string;
}

const EventLogColonyInitialized: FunctionComponent<Props> = (props) => {
  const primaryText = "Congratulations! It's a beautiful baby colony!";
  return (
    <EventLog
      avatarHash={props.transactionHash}
      eventMessage={primaryText}
      eventDate={props.eventDate}
    />
  );
};

export default EventLogColonyInitialized;
