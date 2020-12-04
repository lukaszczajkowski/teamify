import React, { useState } from "react";
import { Paper, InputBase, Button, IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, fade } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  card: {
    width: '255px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(5),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: '#5AAC44',
    color: '#fff',
    '&:hover': {
      background: fade('#5AAC44', 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));

// eslint-disable-next-line react/prop-types
export default function CreateTaskCard({onSubmit, categoryId, setOpen}) {
    const [title, setTitle] = useState("");
    const classes = useStyle();
    const [isCreatingTask, setIsCreatingTask] = useState(false);

    const handleClick = () => {
        setIsCreatingTask(true);
    }

    const onCreateTask = () => {
        onSubmit(categoryId, 
                { title: title });
        setIsCreatingTask(false);
        setTitle("");
    }

    return (
        <div>
            {
                isCreatingTask ?
                <div>
                    <Paper className={classes.card}>
                        <InputBase
                            type="text"
                            inputProps={{
                              className: classes.input,
                            }}
                            placeholder="Enter a title of this card"
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                            </Paper>
                        <Button onClick={onCreateTask}
                            className={classes.confirm}>
                            Add Card
                        </Button>
                        <IconButton onClick={() => setOpen(false)}>
                        <ClearIcon />
                  </IconButton>
                    </div> :
                        <button onClick={handleClick}>+ Add a Card</button>
            }
        </div>



    );

}