import React, { Component, FunctionComponent, useState } from "react";
import ReactDOM from "react-dom";
import { makeStyles, createStyles, Theme, Grid, TextField, Typography, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog, CircularProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ReCAPTCHA from "react-google-recaptcha";
import AccountServices from "../../Services/AccountService";
import AppSettings from "../../Utility/AppSettings";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));


export const ForgotPasswordForm: FunctionComponent<any> = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
    const [values, setValues] = useState({
        tokenValue: '',
        email: '',
        showError: false,
        errorMessage: ''

    })


    const handleClose = () => {
        setOpen(false);
        window.location.assign("/");
    };

    const renderDialog = () => {
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Password reset"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        We've sent you a password reset link.
      </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
      </Button>

                </DialogActions>
            </Dialog>
        )
    }



    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handlereCaptchaChange = (value) => {
        setValues({ ...values, tokenValue: value });
    }

    const handleSubmit = (event) => {
        setIsFeedbackLoading(true);
        event.preventDefault();
        const { tokenValue, email } = values;
        const data = {
            email: email,
            reCaptchaToken: tokenValue
        }

        const response = AccountServices.forgotPassword(data)
            .then(resp => {
                setIsFeedbackLoading(false);
                setOpen(true);
            })
            .catch(error => {
                setValues({ ...values, errorMessage: error, showError: true })
                setIsFeedbackLoading(false);

            })

    }

    const circularFeedback = () => {
        if (isFeedbackLoading) {
            return (
                <div className={classes.root}>
                    <CircularProgress />

                </div>
            );
        }
    }

    const renderButton = () => {

        if (isFeedbackLoading) {
            return (
                <Button
                    disabled
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}

                >
                    Send Link
                </Button>
            )
        } else {
            return (
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}

                >
                    Send Link
                </Button>
            )
        }

    }

    const renderErrorMessage = () => {
        {
            if (values.showError) {
                return (<h2>{values.errorMessage}</h2>)
            }
        }

    }


    return (
        <div>
            <Typography component="h1" variant="h5">
                Trouble Logging In?
           </Typography>
           Enter your email and we'll send you a link to get back into your account.
            {renderErrorMessage()}

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                type="email"
                // value={this.state.email}
                onChange={handleChange}

            />

            {circularFeedback()}

            {renderButton()}
            <ReCAPTCHA sitekey={AppSettings.ReCaptchaSiteKey} onChange={handlereCaptchaChange} />

            {renderDialog()}
        </div>

    )
}


ReactDOM.render(
    <div>
        <ForgotPasswordForm />
    </div>,
    document.getElementById("forgotPasswordRoot"));