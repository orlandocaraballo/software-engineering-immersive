import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/students">Students</Link>
      <Link to="/cohorts">Cohorts</Link>
    </nav>
  );
}
