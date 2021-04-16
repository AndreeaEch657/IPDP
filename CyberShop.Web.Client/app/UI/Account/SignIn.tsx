import * as React from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';


import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReCAPTCHA from "react-google-recaptcha";
import AccountService from "../../Services/AccountService";
import { CircularProgress, Grid } from '@material-ui/core';
import {render} from 'react-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {

            margin: 5 | theme.spacing(2)
        },
    },
}));



export const SignIn: React.FunctionComponent<any> = () => {

    const classes = useStyles();
    const [isFeedbackLoading, setIsFeedbackLoading] = React.useState(false);
    const recaptchaRef = React.createRef();
    const [values, setValues] = React.useState({
        email: "",
        password: "",
        redirect: false,
        displayError: false,
        errorMessage: ""
    });
    const [tokenValue, setTokenValue] = React.useState('');

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handleSubmit = async (event) => {
        // event.preventDefault();
        let reCaptchatoken = await (recaptchaRef.current as any).executeAsync();

        setIsFeedbackLoading(true);


        console.log("value in handle", reCaptchatoken);

        const { email, password } = values;
        const data = {
            email: email,
            password: password,
            returnUrl: '/',
            reCaptchaToken: reCaptchatoken
        }


        AccountService.singIn(data)
            .then(resp => {
                console.log(resp);
                //console.log(resp.data);
                //window.location.assign("/");
                setIsFeedbackLoading(false);

            })
            .catch(error => {
                setValues({ ...values, displayError: true, errorMessage: error });
                // console.log(error);
                setIsFeedbackLoading(false);
            });



    }

    const renderErrorMessage = () => {
        if (values.displayError) {
            return (
                <p>{values.errorMessage}</p>
            )
        }
    }



    const handleForgotPassword = () => {
        window.location.assign("/Account/ForgotPassword")
    }

    const circularFeedback = () => {
        if (isFeedbackLoading)
            return (
                <div className={classes.root}>
                    <CircularProgress />

                </div>
            );
    }

    const onChange = (value) => {
        (recaptchaRef.current as any).reset();

    }


    const renderButtons = () => {
        if (isFeedbackLoading) {
            return (
                <div>

                    <Button
                        disabled
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}>
                        Sign In
                     </Button>
                    <Link aria-disabled component="button" variant="body2" underline="none" href="#">
                        Forgot password?
        </Link>
                </div>
            )
        }
        else {
            return (
                <div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Sign In
        </Button>
                    <Link aria-disabled component="button" variant="body2" onClick={handleForgotPassword}>
                        Forgot password?
        </Link>
                </div>
            )

        }
    }

    return (


        <Container maxWidth="xs">
            <CssBaseline />
            <div>
                {/* <Avatar >
          <LockOutlinedIcon />
        </Avatar> */}


                <Typography component="h1" variant="h5">
                    Sign in
        </Typography>

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
                    value={values.email}
                    onChange={handleChange}

                />
                <TextField
                    variant="outlined"
                    margin="normal"
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
                <ReCAPTCHA
                    sitekey="6Lcd88kZAAAAAFh3hAGSGoDAZ5u8MFyWCX4LsV2V"
                    size="invisible"
                    ref={recaptchaRef}
                    onChange={onChange}


                />

                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />

                {circularFeedback()}

                {renderButtons()}


                <Grid item>
            <Link href="#" variant="body2" onClick = {() => {window.location.href = '../Account/Register'}}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>

            </div>

        </Container >
    );
}
render(
    <div>
        <SignIn />
    </div>,
    document.getElementById("rootPage"));
