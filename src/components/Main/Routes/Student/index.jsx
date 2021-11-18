import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../../context/Title.jsx";
import axios from "axios";
import "./style.css";

export default function Student(props) {
  const { id } = props.match.params;
  const { setTitle } = useTitle();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function loadStudent() {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/students/${id}`
        );
        console.log(data);

        setStudent(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadStudent();
    setTitle("Student");
  }, []);

  const { name, slackHandle, github, cohort, knownFor, gender } = student;

  return (
    <div>
      <h2>{name}</h2>
      <dl>
        <dt>Slack:</dt>
        <dd>{slackHandle}</dd>
      </dl>
      <dl>
        <dt>Gender:</dt>
        <dd>{gender}</dd>
      </dl>
      <dl>
        <dt>Github:</dt>
        <dd>
          <a href={github}>{github}</a>
        </dd>
      </dl>
      <dl>
        <dt>Known for:</dt>
        <dd>{knownFor}</dd>
      </dl>
      <dl>
        <dt>Cohort:</dt>
        <dd>
          <Link to={`/cohorts/${cohort}`}>{cohort}</Link>
        </dd>
      </dl>
    </div>
  );
}
