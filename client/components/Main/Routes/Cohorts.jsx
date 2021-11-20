import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTitle } from "../../../context/Title.jsx";
import Loading from "../../Utils/Loading.jsx";

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const { setTitle } = useTitle();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCohorts() {
      try {
        const { data } = await axios.get("/api/cohorts");

        setCohorts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    loadCohorts();
    setTitle("Cohorts");
  }, []);

  return loading ? (
    <Loading />
  ) : cohorts.length === 0 ? (
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
