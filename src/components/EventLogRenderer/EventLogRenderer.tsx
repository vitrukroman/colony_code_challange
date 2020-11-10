import React, { FunctionComponent } from "react";
import { EventLog } from "../../models/eventLog";
import { EventLogType } from "../../types/eventLogType";
import EventLogColonyInitialized from "../EventLogColonyInitialized/EventLogColonyInitialized";
import EventLogPayoutClaimed from "../EventLogPayoutClaimed/EventLogPayoutClaimed";

interface Props {
  eventLog: EventLog;
}
const EventLogRenderer: FunctionComponent<Props> = (props) => {
  switch (props.eventLog.type) {
    case EventLogType.ColonyInitialized:
      return <EventLogColonyInitialized eventDate={props.eventLog.date} />;
    case EventLogType.PayoutClaimed:
      return (
        <EventLogPayoutClaimed
          fundingPotId="123"
          eventDate={props.eventLog.date}
          userAddress="1232"
          amount={10}
          token="12341234"
        />
      );
    default:
      return null;
  }
};

export default EventLogRenderer;
