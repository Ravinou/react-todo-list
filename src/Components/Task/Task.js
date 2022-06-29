//Lib
import React from "react";
import classes from './Task.module.css';

//PrimeReact CSS
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button'
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

function Task(props) {
    
    //// Methodes
    // Affichage d'une case cochée ou non + texte barré
    const isCheck = check => {
        if (check) {
            return (
                <div className="field-checkbox">
                    <Checkbox inputId={props.index} checked={props.check} onChange={props.checkTask}/>
                    <div className={classes.taskName}>
                        <strike>{props.taskName}</strike>
                    </div>
                </div>         
            );
        }
        else {
            return (
                <div className="field-checkbox">
                    <Checkbox inputId={props.index} checked={props.check} onChange={props.checkTask}/>
                    <div className={classes.taskName}>
                        {props.taskName}
                    </div>
                </div>  
            );
        }
    }
    
    return (
      <div className={classes.task}>
        
        {isCheck(props.check)}
            
        <Button icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text p-button-sm" aria-label="Cancel" onClick={props.deleteTask} />
      </div>
    );
}

export default Task;