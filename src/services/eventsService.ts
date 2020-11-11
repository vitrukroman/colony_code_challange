import { getColonyClient } from "./colonyClient";
import { getLogs } from "@colony/colony-js";
import { EventLog } from "../models/eventLog";
import { Filter } from "ethers/providers";

const getEventLogs = async (filter: Filter) => {
  const colonyClient = await getColonyClient;

  const logs = await getLogs(colonyClient, filter);
  const eventLogsPromises = logs.slice(0, 3).map(EventLog.initializeFromLog);

  return Promise.all(eventLogsPromises);
};

export const getColonyInitializedEventLogs = async () => {
  const colonyClient = await getColonyClient;

  return getEventLogs(colonyClient.filters.ColonyInitialised(null, null));
};

export const getPayoutClaimedEventLogs = async () => {
  const colonyClient = await getColonyClient;

  return getEventLogs(colonyClient.filters.PayoutClaimed(null, null, null));
};

export const getDomainAddedEventLog = async () => {
  const colonyClient = await getColonyClient;

  return getEventLogs(colonyClient.filters.DomainAdded(null));
};

export const getColonyRoleSetEventLog = async () => {
  const colonyClient = await getColonyClient;

  return getEventLogs((colonyClient.filters as any).ColonyRoleSet());
};
