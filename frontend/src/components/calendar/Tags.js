/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import UserApi from '../../api/UserApi';
//import EventApi from '../../api/EventApi';

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
  const {
    // eslint-disable-next-line react/prop-types
    id,
    // eslint-disable-next-line react/prop-types
    extendedProps,
} = event;
  console.log("event from tag", event);
  console.log("event id", id);
  // eslint-disable-next-line react/prop-types
  console.log("members:", extendedProps.users);
  const classes = useStyles();
  const [userBase, setUserBase] = useState([]);
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line react/prop-types
  const [invitedUsers, setInvitedUsers] = useState([]);

  useEffect(async () => {
      // eslint-disable-next-line react/prop-types
      setInvitedUsers(extendedProps.users);
      loadContacts();
      loadInvitedUsers();
  }, [event])

  const loadContacts = () => {
    UserApi.getUsersFromSharedProjects().then(response => {
      const users = response.data;
      console.log("Users from db:", users);
      setUserBase(users);
    })
  }

  //fetches a list of users invited to that specific event
  // eslint-disable-next-line no-unused-vars
  const loadInvitedUsers = () => {
    UserApi.getEventMembers(id)
    .then(response=> {
      setInvitedUsers(response.data);
      console.log("Intived users fetched from the api:", response.data);
    })
    .catch(err => console.log(err));
    
  }

  const updateInvitedUsers = ({target}, fieldName) => {
    const { value } = target;
    switch(fieldName) {
      case "tags":
        console.log("Value:", value);
        break;
      case "select-option":
        console.log("Value:", value);
        UserApi.getUserByEmail(value).then(response => setInvitedUsers([...invitedUsers, response.data]))
        break;
    }

    // EventApi.inviteUserByEmail(id, email)
    //           .then(response => setInvitedUsers(response.data))
    //           .then(loadInvitedUsers())
    //           .catch(err => console.log(err));
  }

  console.log("invited users:", invitedUsers);

  return (
   userBase === undefined ?
   null
   :
    <div className={classes.root}>
      <Autocomplete
        multiple
        autoComplete ="true"
        id="tags-filled"
        name="tags"
        options={userBase.map((user) => user.email)}
        value={invitedUsers.map((user) => user.email)}
        onSelect = {(e) => updateInvitedUsers(e, "tags")}
        onClose = {(e) => updateInvitedUsers(e, "select-option")}
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

