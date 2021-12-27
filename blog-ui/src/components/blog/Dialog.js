import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button} from '@mui/material';
import {useTranslation} from "react-i18next";

export default (props) => {
    const {t} = useTranslation();
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
                    {t("The action cannot be undone!")}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => props.handleConfirm(false)}
                >
                    {t("Cancel")}
                </Button>
                <Button
                    variant="contained"
                    onClick={() => props.handleConfirm(true)}
                    autoFocus
                >
                    {t("Confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}