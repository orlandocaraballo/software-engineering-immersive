import React, { useEffect } from "react";
import { useTitle } from "../../../context/Title.jsx";

export default function Home() {
  const { setTitle } = useTitle();

  useEffect(() => setTitle("Home"), []);

  return (
    <article>
      <p>Welcome to the Software Engineering Immersive database</p>
      <p>Please click on one of your links above 👆 to find out more</p>
    </article>
  );
}
