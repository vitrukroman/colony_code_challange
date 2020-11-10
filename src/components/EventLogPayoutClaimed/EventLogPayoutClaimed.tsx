import React, { FunctionComponent } from "react";
import EventLog from "../EventLog/EventLog";

interface Props {
  userAddress: string;
  amount: number;
  token: string;
  fundingPotId: string;
  eventDate: Date;
}
const EventLogPayoutClaimed: FunctionComponent<Props> = (props) => {
  const primaryText = (
    <>
      User <span className="bold">{props.userAddress}</span> claimed
      <span className="bold">{props.amount}</span>
      <span className="bold">{props.token}</span> payout from pot
      <span className="bold">{props.fundingPotId}</span>
    </>
  );

  return <EventLog eventMessage={primaryText} eventDate={props.eventDate} />;
};

export default EventLogPayoutClaimed;
