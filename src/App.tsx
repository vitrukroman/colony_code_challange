import React from "react";
import "./App.module.css";
import EventLogsList from "./containers/EventLogsList/EventLogsList";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <main className={styles.App__main}>
        <EventLogsList />
      </main>
    </div>
  );
}

export default App;
