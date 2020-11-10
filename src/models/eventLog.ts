import { ColonyRole, getBlockTime } from "@colony/colony-js";
import { getColonyClient, provider } from "../services/colonyClient";
import { Log } from "ethers/providers";
import { EventLogType } from "../types/eventLogType";

export class EventLog {
  public static async getColonyInitializedEventLog(log: Log) {
    const eventLog = await EventLog.initializeFromLog(log);
    eventLog._type = EventLogType.ColonyInitialized;
    return eventLog;
  }

  public static async getPayoutClaimedEventLog(log: Log) {
    const eventLog = await EventLog.initializeFromLog(log);
    eventLog._type = EventLogType.PayoutClaimed;
    return eventLog;
  }

  public get logIndex() {
    return this._logIndex;
  }

  public get type(): EventLogType {
    return this._type;
  }

  public get date(): Date {
    return this._date;
  }

  private static async initializeFromLog(log: Log) {
    const eventLog = new EventLog(log);
    const parsedLog = await eventLog._parseEventLog(log);
    eventLog._token = parsedLog.values.token;
    eventLog._amount = parsedLog.values.amount;
    return eventLog;
  }

  private readonly _blockHash: string = "";
  private _roleId: ColonyRole = 0;
  private _role: string = "";
  private _userAddress = "";
  private _transactionHash = "";
  private _token = "";
  private _amount = "";
  private _fundingPotId = "";
  private readonly _logIndex: number = 0;
  private _type!: EventLogType;
  private _date: Date = new Date();

  private constructor(log: Log) {
    this._logIndex = log.logIndex!;
    this._blockHash = log.blockHash!;
    this._transactionHash = log.transactionHash!;
  }

  private async _getBlockTime() {
    await getBlockTime(provider, this._blockHash);
  }

  private _getRoleById() {
    return ColonyRole[this._roleId];
  }

  private async _parseEventLog(log: Log) {
    const colonyClient = await getColonyClient;
    return colonyClient.interface.parseLog(log);
  }
}
