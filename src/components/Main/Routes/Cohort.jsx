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
    setTitle("Cohort");
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
