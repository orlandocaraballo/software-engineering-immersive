import React, { useEffect } from "react";
import { useTitle } from "../../../../context/Title.jsx";
import "./style.scss";

export default function StudentEdit() {
  const { setTitle } = useTitle();

  useEffect(() => setTitle("Student Edit"));

  return (
    <div id="students-edit">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" />
      <label htmlFor="slackHandle">Slack</label>
      <input type="text" name="slackHandle" />
      <label htmlFor="gender">Gender</label>
      <input type="text" name="gender" />
      <label htmlFor="github">Github</label>
      <input type="text" name="github" />
      <label htmlFor="knownFor">Known for</label>
      <input type="text" name="knownFor" />
      <label htmlFor="cohort">Cohort</label>
      <input type="text" name="cohort" />
    </div>
  );
}
