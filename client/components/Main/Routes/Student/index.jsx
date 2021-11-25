import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTitle } from "../../../../context/Title.jsx";
import Loading from "../../../Utils/Loading.jsx";
import Edit from "./Edit.jsx";
import View from "./View.jsx";
import _ from "lodash";
import axios from "axios";
import "./style.scss";

export default function Student(props) {
  const { id } = props.match.params;
  const { setTitle } = useTitle();
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

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

  return loading ? (
    <Loading />
  ) : _.isEmpty(student) ? (
    "Student not found"
  ) : isEdit ? (
    <Edit student={student} setIsEdit={setIsEdit} setStudent={setStudent} />
  ) : (
    <View student={student} setIsEdit={setIsEdit} />
  );
}
