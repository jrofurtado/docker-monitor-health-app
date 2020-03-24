import React from "react";
import "./ApplicationsList.css";

interface props {
  applications: Array<String>;
}

export default function ApplicationsList(props: props) {
  return (
    <>
      <h2>Applications</h2>
      <ul>
        {props.applications.map((application: String) => (
          <li key={`${application}`}>{application}</li>
        ))}
      </ul>
    </>
  );
}
