import { AppBar, Button, Grid, Toolbar } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as React from "react";
import { Routes } from "./Routes";
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { withMuiTheme } from "./withMuiTheme";
import AccountService from "../Services/AccountService";

const App: React.FunctionComponent<{}> = () => {
    const classes = useStyles();
    const [isUserAdmin, setIsUserAdmin] = React.useState(false);
    React.useEffect(() =>{
        AccountService.checkUser()
            .then((resp) =>{
                setIsUserAdmin(resp.data)
            })
            .catch((err) =>{
                console.log(err)
            })

    },[]) 

    return (
        <Router>
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <Grid container spacing={3} alignItems={"center"}>
                                <Grid item xs={1} sm={1} md={2} lg={1}>
                                    <Link to="/web/home">
                                        <img className={classes.img} alt="icon" src="../img/logo.png" />
                                    </Link>
                                </Grid>
                                <Grid item xs={5} sm={4} md={4} lg={8}>
                                </Grid>

                                {isUserAdmin && <Grid item xs={2} sm={2} md={2} lg={1}>
                                    <Button
                                        color="inherit"
                                    >
                                        <Link to="/web/admin" className={classes.links} >Admin</Link>
                                    </Button>
                                </Grid>  }
                                              
                                <Grid item xs={2} sm={2} md={2} lg={1}>
                                    <Button
                                        color="inherit"
                                    >
                                        <Link to="/web/shop" className={classes.links} >Shop</Link>
                                    </Button>
                                </Grid>

                                <Grid item xs={2} sm={2} md={2} lg={1}>
                                    <Button
                                        color="inherit"
                                        onClick={() => {
                                            AccountService.logout()
                                                .then(() => {
                                                    
                                                })
                                                .finally(() =>{
                                                    window.location.reload();
                                                })
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </Grid>

                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.contentHolder}>
                        <div className={classes.routeHolder}>
                            <Routes />
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
            zIndex: 1,
            overflow: "auto",
            flexGrow: 1,
            marginBottom: 50
        },
        appFrame: {
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            position: "absolute",
            padding: 15,

        },
        contentHolder: {

            marginTop: 100,
            height: "100%",
            width: "100%",
            maxHeight: "100%",
            //overflow: "hidden",
        },
        routeHolder: {
            marginTop: "50px",
            paddingLeft: 40,
            paddingRight: 40,
            height: "100%",
            width: "100%",
            maxHeight: "100%",
        },
        navIconHide: {
            [theme.breakpoints.up("md")]: {
                display: "none",
            },
        },
        content: {
            backgroundColor: theme.palette.background.default,
            width: "100%",
            height: "calc(100% - 56px)",
            marginTop: 56,
            [theme.breakpoints.up("sm")]: {
                height: "calc(100% - 64px)",
                marginTop: 64,
            },
        },
        eyIcon: {
            flexGrow: 1,
        },
        signOut: {
            fontFamily: "Arial",
            fontSize: 16,
            flexGrow: 1,
            color: "white",
            fontWeight: "bold",
        },
        links: {
            fontFamily: "Arial",
            fontSize: 16,
            flexGrow: 1,
            color: "white",
            fontWeight: "bold",
            "&:hover": {
                color: "white"
            }
        },
        userIcon: {
            fontFamily: "Arial",
            fontSize: 16,
            flexGrow: 1,
            color: "white",
            fontWeight: "bold",
        },
        img: {
            width: 75,
            height: "auto"
        },
    }),
);

export default withMuiTheme(App);
