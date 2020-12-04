import React from "react";
import {Paper} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(1,1,1,2),
            margin: theme.spacing(1),
          },
}));

// eslint-disable-next-line react/prop-types
export default function TaskCard({ task, /*deleteTask*/ }) {
    const classes = useStyle();
   // const onDeleteTask = () => {
        // eslint-disable-next-line react/prop-types
     //   if (window.confirm(`Do you want to delete task ${task.id}?\n**Redesign this to a popup later**`)) {
            // eslint-disable-next-line react/prop-types
         //   deleteTask(task.id);
       // }
  //  }

    return (
        <div >
            <div>

                {/* eslint-disable-next-line react/prop-types*/}
                <Paper className={classes.card}>{task.title}</Paper>
            </div>

          {/*  <button className="button"
                id="delete-category"
    onClick={onDeleteTask}>Delete</button> */}
        </div>
    );
}