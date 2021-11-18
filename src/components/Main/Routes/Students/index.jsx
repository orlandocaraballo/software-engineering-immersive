import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../../context/Title.jsx";
import axios from "axios";
import "./style.css";

export default function Students() {
  const [studentsGroupedByCohort, setStudentsGroupedByCohort] = useState({});
  const { setTitle } = useTitle();

  useEffect(() => {
    async function loadStudents() {
      try {
        const { data } = await axios.get("http://localhost:3000/api/students");

        // restructure to object such that each key is a cohort
        //  and each value is the array of students that belong
        //  to that cohort { [cohortName]: arrayOfStudents }
        const groupedStudentsObject = data.reduce(
          (accumulator, student, _index, students) => {
            const { cohort } = student;
            delete student.cohort;

            // create cohort key and set to array
            //  or use the existing key and push student to array
            if (accumulator[cohort]) {
              accumulator[cohort].push(student);
            } else {
              accumulator[cohort] = [];
            }

            return accumulator;
          },
          {}
        );

        setStudentsGroupedByCohort(groupedStudentsObject);
      } catch (err) {
        console.error(err);
      }
    }

    loadStudents();
    setTitle("Students");
  }, []);

  return (
    // below we loop thru all the cohort keys and for every cohort
    //  we loop thru all the students that correspond to that cohort
    <div id="cohorts">
      {Object.entries(studentsGroupedByCohort).map(
        ([cohort, students], index) => (
          <ul key={index}>
            <h3>{cohort}</h3>
            {students.map(({ _id, name }) => (
              <li key={_id}>
                <Link to={`/students/${_id}`}>{name}</Link>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}
