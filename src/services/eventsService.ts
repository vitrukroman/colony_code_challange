import { getColonyClient } from "./colonyClient";
import { getLogs } from "@colony/colony-js";
import { EventLog } from "../models/eventLog";
import { Filter, Log } from "ethers/providers";

const getEventLogs = async (
  filter: Filter,
  factoryMethod: (log: Log) => Promise<EventLog>
) => {
  const colonyClient = await getColonyClient;

  const logs = await getLogs(colonyClient, filter);
  const eventLogsPromises = logs.map(factoryMethod);

  return Promise.all(eventLogsPromises);
};

export const getColonyInitializedEventLogs = async () => {
  const colonyClient = await getColonyClient;

  return getEventLogs(
    colonyClient.filters.ColonyInitialised(null, null),
    EventLog.getColonyInitializedEventLog
  );
};

export const getPayoutClaimedEventLogs = async () => {
  const colonyClient = await getColonyClient;

  return getEventLogs(
    colonyClient.filters.PaymentAdded(null),
    EventLog.getPayoutClaimedEventLog
  );
};
