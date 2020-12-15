import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, makeStyles } from '@material-ui/core'
import Controls from '../controls/Controls';


export default function ConfirmDialog(props) {

    const useStyles = makeStyles(theme => ({
        dialog:{
            padding: theme.spacing(2),
            position:'absolute',
            top: theme.spacing(5)
        }, 
        dialogContent: {
            textAlign:'center'
        },
        dialogAction: {
            justifyContent: 'center'
        }
    }))
    const { confirmDialog, setConfirmDialog} = props;
    const classes = useStyles()
    return(
        <Dialog open = {confirmDialog.isOpen} classes= {{paper: classes.dialog}}>
            <DialogTitle>

            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <Typography variant ="h6">
                    {confirmDialog.title}
                </Typography>
                <Typography variant ="h6">
                    {confirmDialog.subTitle}
                </Typography>

            </DialogContent>
            <DialogActions className={classes.dialogAction}>
                <Controls.Button
                text="No"
                color= "default" 
                onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })} />

                <Controls.Button
                text="Yes"
                color="secondary" 
                onClick={confirmDialog.onConfirm}/>
            
             </DialogActions>

        </Dialog>
    )
}