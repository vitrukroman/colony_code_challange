import React, { FunctionComponent } from "react";
import { EventLog } from "../../models/eventLog";
import { EventLogType } from "../../types/eventLogType";
import EventLogColonyInitialized from "../EventLogColonyInitialized/EventLogColonyInitialized";
import EventLogPayoutClaimed from "../EventLogPayoutClaimed/EventLogPayoutClaimed";
import EventLogDomainAdded from "../EventLogDomainAdded/EventLogDomainAdded";
import EventLogColonyRoleSet from "../EventLogColonyRoleSet/EventLogColonyRoleSet";

interface Props {
  eventLog: EventLog;
}
const EventLogRenderer: FunctionComponent<Props> = (props) => {
  switch (props.eventLog.type) {
    case EventLogType.ColonyInitialized:
      return (
        <EventLogColonyInitialized
          transactionHash={props.eventLog.transactionHash}
          eventDate={props.eventLog.date}
        />
      );
    case EventLogType.PayoutClaimed:
      return (
        <EventLogPayoutClaimed
          fundingPotId={props.eventLog.fundingPotId}
          eventDate={props.eventLog.date}
          userAddress={props.eventLog.userAddress}
          amount={props.eventLog.amount}
          token={props.eventLog.tokenSymbol}
        />
      );
    case EventLogType.DomainAdded:
      return (
        <EventLogDomainAdded
          domainId={props.eventLog.domainId}
          eventDate={props.eventLog.date}
          transactionHash={props.eventLog.transactionHash}
        />
      );
    case EventLogType.ColonyRoleSet:
      return (
        <EventLogColonyRoleSet
          domainId={props.eventLog.domainId}
          eventDate={props.eventLog.date}
          userAddress={props.eventLog.userAddress}
          role={props.eventLog.role}
        />
      );
    default:
      return null;
  }
};

export default EventLogRenderer;
