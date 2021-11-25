import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../../context/Title.jsx";
import Loading from "../../../Utils/Loading.jsx";
import _ from "lodash";
import axios from "axios";
import "./style.scss";

export default function View({ student, setIsEdit }) {
  const { setTitle } = useTitle();

  useEffect(() => setTitle("Student View"));

  const {
    name,
    slackHandle,
    github,
    cohort,
    knownFor,
    gender,
    _id: id,
  } = student;

  return (
    <div id="student">
      <h2>
        <dl>
          <dt>{name}:</dt>
          <dd>
            <button onClick={() => setIsEdit(true)}>Edit</button>
          </dd>
        </dl>
      </h2>
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
