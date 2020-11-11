import React, { FunctionComponent } from "react";
import { EventLog } from "../../models/eventLog";
import EventLogRenderer from "../EventLogRenderer/EventLogRenderer";
import styles from "./EventLogsList.module.css";

interface Props {
  eventLogs: EventLog[];
  loading: boolean;
  error?: Error;
}

export const EventLogsList: FunctionComponent<Props> = (props) => {
  const listElements = props.eventLogs.map((eventLog) => {
    return (
      <li
        key={`${eventLog.type}_${eventLog.blockHash}_${eventLog.logIndex}`}
        className={styles.EventLogsList__item}
      >
        <EventLogRenderer eventLog={eventLog} />
      </li>
    );
  });

  return (
    <>
      {props.loading && (
        <div className={styles.EventLogsList__loading}>loading ...</div>
      )}
      {!!props.error && (
        <div className={styles.EventLogsList__error}>{props.error.message}</div>
      )}
      {!!listElements.length && (
        <ul className={styles.EventLogsList}>{listElements}</ul>
      )}
    </>
  );
};
