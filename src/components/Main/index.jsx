import React from "react";
import Routes from "./Routes/index.jsx";
import { useTitle } from "../../context/Title.jsx";

export default function Main() {
  const { title } = useTitle();

  return (
    <main>
      <h1>{title}</h1>
      <Routes />
    </main>
  );
}
