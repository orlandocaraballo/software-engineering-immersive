import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../../context/Title.jsx";
import Loading from "../../../Utils/Loading.jsx";
import _ from "lodash";
import axios from "axios";
import "./style.scss";

export default function Student(props) {
  const { id } = props.match.params;
  const { setTitle } = useTitle();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudent() {
      try {
        const { data } = await axios.get(`/api/students/${id}`);
        setStudent(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    loadStudent();
    setTitle("Student");
  }, []);

  const { name, slackHandle, github, cohort, knownFor, gender } = student;

  return loading ? (
    <Loading />
  ) : _.isEmpty(student) ? (
    "Student not found"
  ) : (
    <div id="student">
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
      <Link to={`/students/${id}/edit`}>Edit</Link>
    </div>
  );
}
