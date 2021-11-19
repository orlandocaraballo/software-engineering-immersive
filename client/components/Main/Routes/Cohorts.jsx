import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTitle } from "../../../context/Title.jsx";

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const { setTitle } = useTitle();

  useEffect(() => {
    async function loadCohorts() {
      try {
        const { data } = await axios.get("/api/cohorts");

        setCohorts(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCohorts();
    setTitle("Cohorts");
  }, []);

  return cohorts.length === 0 ? (
    "No cohorts found"
  ) : (
    <ul>
      {cohorts.map((name, index) => (
        <li key={index}>
          <Link to={`/cohorts/${name}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
