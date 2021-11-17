import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cohort({
  match: {
    params: { name },
  },
}) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadCohortStudents() {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/cohorts/${name}/students`
        );
        console.log(data);

        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCohortStudents();
  }, []);

  return (
    <ul>
      {students.map(({ name, _id }) => (
        <li key={_id}>
          <Link to={`/students/${_id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
