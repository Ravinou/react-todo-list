//Lib
import React from "react";
import classes from "./Task.module.css";

//PrimeReact CSS
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

function Task(props) {
  return (
    <div className={classes.task}>
      <div className="field-checkbox">
        <Checkbox
          inputId={props.index}
          checked={props.check}
          onChange={props.checkTask}
        />
        <div className={classes.taskName}>
          {props.check ? (
            <strike>{props.taskName}</strike>
          ) : (
            <>{props.taskName}</>
          )}
        </div>
      </div>

      <Button
        icon="pi pi-times"
        className="p-button-rounded p-button-danger p-button-text p-button-sm"
        aria-label="Cancel"
        onClick={props.deleteTask}
      />
    </div>
  );
}

export default Task;