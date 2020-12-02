/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import UserApi from '../../api/UserApi';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

// eslint-disable-next-line react/prop-types
export default function Tags({ event }) {
  console.log("event from tag", event);
  const classes = useStyles();
  const [userBase, setUserBase] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [emails, setEmails] = useState([]);

  useEffect(async () => {
      UserApi.getUsersFromSharedProjects().then(response => {
          const users = response.data;
          console.log("Users from db:", users);
          setUserBase(users);
          console.log("User base ", userBase);
      })
  }, [])
  return (
   userBase === undefined ?
   null
   :
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={userBase.map((user) => user.email)}
        //defaultValue={[userBase[0].email]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            // eslint-disable-next-line react/jsx-key
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField 
          {...params} 
          variant="filled" 
          label="freeSolo" 
          placeholder="Add users" />
        )}
      />
    </div>
  );
}

