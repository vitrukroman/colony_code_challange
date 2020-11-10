import React, { FunctionComponent, useEffect, useState } from "react";
import { EventLogsList as EventLogsListComponent } from "../../components/EventLogsList/EventLogsList";
import { EventLog } from "../../models/eventLog";
import {
  getColonyInitializedEventLogs,
  getPayoutClaimedEventLogs,
} from "../../services/eventsService";

const EventLogsList: FunctionComponent = () => {
  const [eventLogs, setEventLogs] = useState<EventLog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const getBasicEventLogs = async () => {
      setLoading(true);
      try {
        const logs = await Promise.all([
          getColonyInitializedEventLogs(),
          getPayoutClaimedEventLogs(),
        ]);
        setEventLogs(logs.flat());
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
