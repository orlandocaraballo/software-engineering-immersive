import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTitle } from "../../../context/Title.jsx";
import Loading from "../../Utils/Loading.jsx";

export default function Cohort(props) {
  const { name } = props.match.params;
  const { setTitle } = useTitle();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCohortStudents() {
      try {
        const { data } = await axios.get(`/api/cohorts/${name}/students`);

        setStudents(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    loadCohortStudents();
    setTitle("Cohort");
  }, []);

  return loading ? (
    <Loading />
  ) : students.length === 0 ? (
    "No students for this cohort"
  ) : (
    <ul>
      {students.map(({ name, _id: id }) => (
        <li key={id}>
          <Link to={`/students/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
