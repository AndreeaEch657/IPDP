import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM, { render } from 'react-dom';
import AccountService from "../../Services/AccountService";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
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
    },
}));

export default function CreateAccount() {
    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        passwordConfirmation: '',
        firstName: '',
        lastName: '',
        showError: false,
        errorMessage: ''
    })
    const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email')
    const urltoken = urlParams.get('token')

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        const data = {
            email: email,
            password: values.password,
            confirmPassword: values.passwordConfirmation,
            token: urltoken,
        }
        // AccountService.confirmAccount(data)
        //     .then(resp => {
        //         setIsFeedbackLoading(false);
        //         setOpen(true);
        //     })
        //     .catch(error => {
        //         setIsFeedbackLoading(false);
        //         setValues({ ...values, errorMessage: error, showError: true })
        //     })

    }
    const renderErrorMessage = () => {
        {
            if (values.showError) {
                return (<h2>{values.errorMessage}</h2>)
            }
        }
    }

    const circularFeedback = () => {
        if (isFeedbackLoading)
            return (
                <div>
                    <CircularProgress />

                </div>
            );
    }

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
                        You have succesfully created an account.
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



    const handleClose = () => {
        setOpen(false);
        window.location.assign("/Account/Login");
    };



    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography className={classes.titleLabel}>
                    Confrim your account
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={handleSubmit}
                >
                    Sign Up
          </Button>
                {openDialog()}

            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

ReactDOM.render(
    <div>
        <CreateAccount />
    </div>,
    document.getElementById("appRoot"));