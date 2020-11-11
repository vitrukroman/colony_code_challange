import React, { FunctionComponent } from "react";
import EventLog from "../EventLog/EventLog";

interface Props {
  domainId: string;
  eventDate: Date;
  transactionHash: string;
}
const EventLogDomainAdded: FunctionComponent<Props> = (props) => {
  const primaryText = (
    <>
      Domain <strong>{props.domainId}</strong> added.
    </>
  );

  return (
    <EventLog
      avatarHash={props.transactionHash}
      eventMessage={primaryText}
      eventDate={props.eventDate}
    />
  );
};

export default EventLogDomainAdded;
