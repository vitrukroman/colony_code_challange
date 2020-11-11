import React, { FunctionComponent } from "react";
import EventLog from "../EventLog/EventLog";

interface Props {
  userAddress: string;
  amount: string;
  token: string;
  fundingPotId: string;
  eventDate: Date;
}
const EventLogPayoutClaimed: FunctionComponent<Props> = (props) => {
  const primaryText = (
    <>
      User <strong>{props.userAddress}</strong> claimed{" "}
      <strong>
        {props.amount}
        {props.token}
      </strong>{" "}
      payout from pot <strong>{props.fundingPotId}</strong>
    </>
  );

  return (
    <EventLog
      eventMessage={primaryText}
      eventDate={props.eventDate}
      avatarHash={props.userAddress}
    />
  );
};

export default EventLogPayoutClaimed;
