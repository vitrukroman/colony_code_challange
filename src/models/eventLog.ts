import { ColonyRole, getBlockTime } from "@colony/colony-js";
import { getColonyClient, provider } from "../services/colonyClient";
import { Log } from "ethers/providers";
import { EventLogType } from "../types/eventLogType";
import { LogDescription } from "ethers/utils";
import { utils } from "ethers";
import TOKEN_SYMBOLS from "../types/tokenSymbols";

export class EventLog {
  public static async initializeFromLog(log: Log) {
    const eventLog = new EventLog(log);

    const parsedLog = await eventLog._parseEventLog(log);
    eventLog._type = parsedLog.name as EventLogType;
    eventLog._amount = EventLog._getAmount(parsedLog);
    eventLog._fundingPotId = EventLog._getFundingPotId(parsedLog);
    if (parsedLog.values.user) {
      eventLog._userAddress = parsedLog.values.user;
    } else {
      eventLog._userAddress = await EventLog._getUserAddress(
        eventLog._fundingPotId
      );
    }
    eventLog._date = await EventLog._getBlockTime(eventLog._blockHash);
    eventLog._tokenSymbol = TOKEN_SYMBOLS[parsedLog.values.token];
    eventLog._domainId = EventLog._getDomainId(parsedLog.values.domainId);
    eventLog._role = EventLog._getRoleById(parsedLog.values.role);

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

  public get amount() {
    return this._amount;
  }

  public get fundingPotId() {
    return this._fundingPotId;
  }

  public get userAddress() {
    return this._userAddress;
  }

  public get tokenSymbol() {
    return this._tokenSymbol;
  }

  public get domainId() {
    return this._domainId;
  }

  public get role() {
    return this._role;
  }

  public get transactionHash() {
    return this._transactionHash;
  }

  public get blockHash() {
    return this._blockHash;
  }

  private static _getAmount(parsedLog: LogDescription) {
    if (parsedLog.values.amount === undefined) {
      return "";
    }
    return new utils.BigNumber(parsedLog.values.amount).toString();
  }

  private static _getFundingPotId(parsedLog: LogDescription) {
    if (parsedLog.values.fundingPotId === undefined) {
      return "";
    }
    return new utils.BigNumber(parsedLog.values.fundingPotId).toString();
  }

  private static async _getUserAddress(fundingPotId: string) {
    if (!fundingPotId) {
      return "";
    }

    const colonyClient = await getColonyClient;
    const { associatedTypeId } = await colonyClient.getFundingPot(fundingPotId);

    const { recipient } = await colonyClient.getPayment(associatedTypeId);

    return recipient;
  }

  private static async _getBlockTime(blockHash: string) {
    return new Date(await getBlockTime(provider, blockHash));
  }

  private static _getDomainId(domainIdHex: string) {
    if (!domainIdHex) {
      return "";
    }
    return new utils.BigNumber(domainIdHex).toString();
  }

  private static _getRoleById(roleId: ColonyRole) {
    if (!roleId) {
      return "";
    }
    return ColonyRole[roleId];
  }

  private readonly _blockHash: string = "";
  private _role: string = "";
  private _userAddress = "";
  private _transactionHash = "";
  private _tokenSymbol = "";
  private _amount = "";
  private _fundingPotId = "";
  private readonly _logIndex: number = 0;
  private _type!: EventLogType;
  private _date: Date = new Date();
  private _domainId: string = "";

  private constructor(log: Log) {
    this._logIndex = log.logIndex!;
    this._blockHash = log.blockHash!;
    this._transactionHash = log.transactionHash!;
  }

  private async _parseEventLog(log: Log) {
    const colonyClient = await getColonyClient;
    return colonyClient.interface.parseLog(log);
  }
}
