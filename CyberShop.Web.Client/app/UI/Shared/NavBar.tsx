import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import MenuIcon from '@material-ui/icons/Menu';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      marginLeft: 10
    },
    loginButton:{
        float: "right"
    },
    navBarLink:{
        flexGrow: 1,
        
    }
  }));

  export default function NavBar() {
    const classes = useStyles();

    return(
        <div className={classes.root}>

            <Router>

            <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>

          <div className = {classes.navBarLink}>

            <Link to ="/">
                Link1
            </Link>

            <Link to ="/">
                Link2
            </Link>

            <Link to ="/">
                Link3
            </Link>

            <Link to ="/">
                Link4
            </Link>

          </div>
          
          <Button className={classes.loginButton} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
                <Switch>
                    
                </Switch>
            </Router>
      
    </div>
    )
  }