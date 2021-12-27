import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button} from '@mui/material';

export default (props) => {
    return (
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.description}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The action cannot be undone!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => props.handleConfirm(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => props.handleConfirm(true)}
                    autoFocus
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}