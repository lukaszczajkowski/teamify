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
export default function Tags({ event, onEmailsChange }) {

  const classes = useStyles();
  const [userBase, setUserBase] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(async () => {
      loadContacts();
  }, [event])

  const loadContacts = () => {
    UserApi.getUsersFromSharedProjects().then(response => {
      const users = response.data;
      setUserBase(users);
    })
  }

  useEffect(() => {
    setInvitedUsers(invitedUsers);
    onEmailsChange(invitedUsers);
  }, [invitedUsers]);


  const handleChange = (e, value, reason) => {
    switch(reason){
      case "select-option":
        setInvitedUsers(value);
        break;
    }
  }
 
  return (
   userBase === undefined ?
   null
   :
    <div className={classes.root}>

      <Autocomplete
        multiple = {true}
        autoComplete={true}
        id="tags-filled"
        name="tags"
        options={userBase.map((user) => user.email)}
        value={invitedUsers}
        //onSelect = {(e) => updateInvitedUsers(e, "tags")}
        //onClose = {(e) => updateInvitedUsers(e, "select-option")}
        onChange = {(e, value) => handleChange(e, value, "select-option")}
        freeSolo = {true}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            // eslint-disable-next-line react/jsx-key
            <Chip
              variant="outlined" 
              label={option} {...getTagProps({ index })} 
              />
          ))
        }
        renderInput={(params) => (
          <TextField 
          {...params}
          variant="filled" 
          label="freeSolo" 
          placeholder="Add users"
          onClick = {e => (e.target.value !== undefined && e.target.value !== "")  ?
             setInvitedUsers(invitedUsers.concat(e.target.value))
            :
            null
          }
          onKeyPress = {
            e => e.key === 13 ? 
            setInvitedUsers(invitedUsers.concat(e.target.value))
            :
            null
          }
        />
        )}
      />
    </div>
  );
}

