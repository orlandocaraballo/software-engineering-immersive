import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTitle } from "../../../context/Title.jsx";

export default function Cohort(props) {
  const { name } = props.match.params;
  const { setTitle } = useTitle();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadCohortStudents() {
      try {
        const { data } = await axios.get(`/api/cohorts/${name}/students`);

        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCohortStudents();
    setTitle("Cohort");
  }, []);

  return students.length === 0 ? (
    "No students for this cohort"
  ) : (
    <ul>
      {students.map(({ name, _id }) => (
        <li key={_id}>
          <Link to={`/students/${_id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
