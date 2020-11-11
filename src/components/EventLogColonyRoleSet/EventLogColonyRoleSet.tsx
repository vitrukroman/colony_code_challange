import React, { FunctionComponent } from "react";
import EventLog from "../EventLog/EventLog";

interface Props {
  role: string;
  userAddress: string;
  domainId: string;
  eventDate: Date;
}
const EventLogColonyRoleSet: FunctionComponent<Props> = (props) => {
  const primaryText = (
    <>
      <strong>{props.role}</strong> role assigned to user{" "}
      <strong>{props.userAddress}</strong> in domain{" "}
      <strong>{props.domainId}</strong>
    </>
  );

  return (
    <EventLog
      avatarHash={props.userAddress}
      eventMessage={primaryText}
      eventDate={props.eventDate}
    />
  );
};

export default EventLogColonyRoleSet;
