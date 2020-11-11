import React, { FunctionComponent, ReactNode } from "react";
import styles from "./EventLog.module.css";
import EventLogAvatar from "../EventLogAvatar/EventLogAvatar";

interface Props {
  eventMessage: ReactNode;
  eventDate: Date;
  avatarHash: string;
}
const EventLog: FunctionComponent<Props> = (props) => {
  return (
    <article className={styles.EventLog}>
      <div className={styles.EventLog__avatar}>
        <EventLogAvatar hash={props.avatarHash} />
      </div>
      <div className={styles.EventLog__copy}>
        <div className={styles.EventLog__primaryText}>{props.eventMessage}</div>
        <time
          dateTime={props.eventDate.toISOString()}
          className={styles.EventLog__secondaryText}
        >
          {props.eventDate.toDateString()}
        </time>
      </div>
    </article>
  );
};

export default EventLog;
