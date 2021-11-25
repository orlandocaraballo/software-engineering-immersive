import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useTitle } from "../../../../context/Title.jsx";
import axios from "axios";
import "./style.scss";
import "./edit.scss";

export default function Edit({ student, setIsEdit, setStudent }) {
  const { setTitle } = useTitle();

  const {
    name,
    slackHandle,
    gender,
    github,
    knownFor,
    cohort,
    _id: id,
  } = student;

  useEffect(() => setTitle("Student Edit "), []);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { status } = await axios.put(`/api/students/${id}`, student);

      if (status !== 200) {
        console.error(
          "There was an error updating the student, check system logs for more details."
        );
        return;
      }

      setIsEdit(false);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setStudent({ ...student, [name]: value });
  }

  return (
    <form id="student-edit" onSubmit={handleSubmit}>
      <dl>
        <dt></dt>
        <dd>
          <button onClick={() => setIsEdit(false)}>Back</button>
        </dd>
      </dl>
      <dl>
        <dt>
          <label htmlFor="name">Name</label>
        </dt>
        <dd>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </dd>
      </dl>
      <dl>
        <dt>
          <label htmlFor="slackHandle">Slack</label>
        </dt>
        <dd>
          <input
            type="text"
            name="slackHandle"
            value={slackHandle}
            onChange={handleChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>
          <label htmlFor="gender">Gender</label>
        </dt>
        <dd>
          <input
            type="text"
            name="gender"
            value={gender}
            onChange={handleChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>
          <label htmlFor="github">Github</label>
        </dt>
        <dd>
          <input
            type="text"
            name="github"
            value={github}
            onChange={handleChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>
          <label htmlFor="knownFor">Known for</label>
        </dt>
        <dd>
          <input
            type="text"
            name="knownFor"
            value={knownFor}
            onChange={handleChange}
          />
        </dd>
      </dl>
      <dl>
        <dt>
          <label htmlFor="cohort">Cohort</label>
        </dt>
        <dd>
          <input
            type="text"
            name="cohort"
            value={cohort}
            onChange={handleChange}
          />
        </dd>
      </dl>
      <dl>
        <dt></dt>
        <dd>
          <button type="submit">Submit</button>
        </dd>
      </dl>
    </form>
  );
}
