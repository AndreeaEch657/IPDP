import React, { useState, FunctionComponent } from "react";
import { makeStyles, createStyles, Theme, Grid, TextField, Typography, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CircularProgress, CssBaseline } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AccountService from "../../Services/AccountService";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        '& > * + *': {
            margin: 5 | theme.spacing(2)
        },
    },

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    titleLabel: {
        fontSize: 30,
        fontFamily: "Arial",
        paddingTop: 10,
        paddingBottom: 10
    },
}));


export const ResetPasswordForm: FunctionComponent<any> = () => {

    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        passwordConfirmation: '',
        showPassword: false,
        showError: false,
        errorMessage: ''
    })
    const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email')

    const urltoken = urlParams.get('token')


    const openDialog = () => {
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
                        You have succesfully reseted your password.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Login
          </Button>

                </DialogActions>
            </Dialog>
        )
    }

    const circularFeedback = () => {
        if (isFeedbackLoading)
            return (
                <div className={classes.root}>
                    <CircularProgress />

                </div>
            );
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handleClose = () => {
        setOpen(false);
        window.location.assign("/Account/Login");
    };


    const handleSubmit = () => {
        setIsFeedbackLoading(true);
        // const queryString = window.location.search;

        // const urlParams = new URLSearchParams(queryString);
        // const email = urlParams.get('email')

        // const urltoken = urlParams.get('token')

        const data = {
            email: email,
            token: urltoken,
            password: values.password,
            confirmPassword: values.passwordConfirmation
        }

        AccountService.resetPassword(data)
            .then(resp => {
                //console.log(resp);
                setIsFeedbackLoading(false);
                setOpen(true);

            })
            .catch(error => {
                setIsFeedbackLoading(false);
                setValues({ ...values, errorMessage: error, showError: true })
            })
    }

    const renderErrorMessage = () => {
        {
            if (values.showError) {
                return (<h2>{values.errorMessage}</h2>)
            }
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
                    Submit
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
                    Submit
                </Button>
            )
        }

    }

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography className={classes.titleLabel}>
                    Reset your passwod
                </Typography>
                {renderErrorMessage()}

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            disabled
                            value={email}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="passwordConfirmation"
                            label="Password Confirmation"
                            type="password"
                            id="passwordConfirmation"
                            autoComplete="current-password"
                            value={values.passwordConfirmation}
                            onChange={handleChange}
                        />
                    </Grid>

                </Grid>
                {circularFeedback()}
                {renderButton()};

                {openDialog()}

            </div>

        </Container>
    )
}

ReactDOM.render(
    <div>
        <ResetPasswordForm />
    </div>,
    document.getElementById("resetPasswordRoot"));