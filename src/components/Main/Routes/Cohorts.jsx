import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);

  useEffect(() => {
    async function loadCohorts() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/cohorts");
        console.log(data);

        setCohorts(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCohorts();
  }, []);

  return (
    <ul>
      {cohorts.map((name, index) => (
        <li key={index}>
          <Link to={`/cohorts/${name}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
