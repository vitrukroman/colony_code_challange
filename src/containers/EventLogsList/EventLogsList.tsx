import React, { FunctionComponent, useEffect, useState } from "react";
import { EventLogsList as EventLogsListComponent } from "../../components/EventLogsList/EventLogsList";
import { EventLog } from "../../models/eventLog";
import {
  getColonyInitializedEventLogs,
  getColonyRoleSetEventLog,
  getDomainAddedEventLog,
  getPayoutClaimedEventLogs,
} from "../../services/eventsService";

const EventLogsList: FunctionComponent = () => {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const sortFunc = (log1: EventLog, log2: EventLog) =>
    log2.date.getTime() - log1.date.getTime();

  useEffect(() => {
    const getBasicEventLogs = async () => {
      setLoading(true);
      try {
        const logs = await Promise.all([
          getColonyInitializedEventLogs(),
          getPayoutClaimedEventLogs(),
          getDomainAddedEventLog(),
          getColonyRoleSetEventLog(),
        ]);
        setEventLogs(logs.flat().sort(sortFunc));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getBasicEventLogs();
  }, []);

  return (
    <EventLogsListComponent
      loading={loading}
      error={error}
      eventLogs={eventLogs}
    />
  );
};

export default EventLogsList;
