import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { AddressForm } from "./AddressForm";
import { PaymentForm } from "./PaymentForm";
import { Review } from "./Review";
import { useEffect, useState } from "react";
import { ICartItem } from "../HomePage";
import TransactionService from "../../../../Services/TransactionService";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Cyberhop
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    img: {
        width: 75,
        height: "auto",
    },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];



export const Checkout: React.FunctionComponent<{}> = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");

    //payment details

    const [nameOnCard, setNameOnCard] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiryDate, setExpiryDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);

    const [orderId, setOrderId] = useState();

    const handleNext = () => {

        if(activeStep === steps.length - 1){
            const data = {
                cartItems: cartItems,
                shippingAddress: [address, address2, city, state, zip, country].join(', ')

            };
            console.log(data);
            TransactionService.createNewOrder(data)
                .then(resp =>{
                    setOrderId(resp.data);
                    console.log(resp);
                    setActiveStep(activeStep + 1);
                    localStorage.removeItem("cartItems");
                    
                    
                })
                .catch(err =>{
                    console.log(err.message);
                })

        }
        else {
            setActiveStep(activeStep + 1);
        }
        
    };

   useEffect(() =>{
        if((JSON.parse(localStorage.getItem("cartItems")).length == 0)){
            window.location.assign("/");
        }
        setCartItems(JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) as any : []);
      }, [])

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddressForm
                        handleFirstNameChange = {(firstName) => setFirstName(firstName)}
                        handleLastNameChange = {(lastName) => setLastName(lastName)}
                        handleAddressChange = {(address) => setAddress(address)}
                        handleAddress2Change = {(address2) => setAddress2(address2)}
                        handleCityChange = {(city) => setCity(city)}
                        handleStateChange = {(state) => setState(state)}
                        handleZipChange = {(zip) => setZip(zip)}
                        handleCountryChange = {(country) => setCountry(country)}/>;
            case 1:
                return <PaymentForm 
                        handleNameOnCardChange = {(nameOnCard) => setNameOnCard(nameOnCard)}
                        handleCardNumberChange = {(cardNumber) => setCardNumber(cardNumber)}
                        handleExpiryDateChange = {(expiryDate) => setExpiryDate(expiryDate)}
                        handleCvvChange = {(cvv) => setCvv(cvv)}
                        />;
            case 2:
                return <Review
                        fullName = {firstName + " " + lastName}
                        cardType = "Visa"
                        cardHolder = {nameOnCard}
                        cardNumber = {cardNumber}
                        expiryDate = {expiryDate}
                        address = {[address, address2, city, state, zip, country]}
                         />;
            default:
                throw new Error("Unknown step");
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your order number is #{orderId}. We have
                                    emailed your order confirmation, and will
                                    send you an update when your order has
                                    shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {getStepContent(activeStep)}
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button
                                            onClick={handleBack}
                                            className={classes.button}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                        
                                    >
                                        {activeStep === steps.length - 1
                                            ? "Place order"
                                            : "Next"}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
};
