import React from "react";
import { Switch, Route } from "react-router";
import Students from "./Students/index.jsx";
import Student from "./Student/index.jsx";
import Home from "./Home.jsx";
import Cohorts from "./Cohorts.jsx";
import Cohort from "./Cohort.jsx";
import StudentEdit from "./StudentEdit/index.jsx";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={Students} />
      <Route exact path="/students/:id" component={Student} />
      <Route path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/cohorts" component={Cohorts} />
      <Route path="/cohorts/:name" component={Cohort} />
    </Switch>
  );
}
