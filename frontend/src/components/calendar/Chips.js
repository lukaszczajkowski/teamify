/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';
import UserApi from '../../api/UserApi';
import FaceIcon from '@material-ui/icons/Face';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function Chips({email, handleDelete, changesMade}) {
    
    const [currentEmail, setCurrentEmail] = useState("");

    useEffect(() => {
        setCurrentEmail(email);
    }, [changesMade]);

    return (
        <Chip
              variant="outlined" 
              label={currentEmail}
              icon = {<FaceIcon/>}
              autofocus = {true}
              onClick = {e => handleDelete(e)}
              onDelete = {e => handleDelete(e)}
        />
    );

}