import React, { FunctionComponent } from "react";
import styles from "./EventLogAvatar.module.css";
import Blockies from "react-blockies";

interface Props {
  hash: string;
}
const EventLogAvatar: FunctionComponent<Props> = (props) => {
  return <Blockies seed={props.hash} className={styles.EventLogAvatar} />;
};

export default EventLogAvatar;
