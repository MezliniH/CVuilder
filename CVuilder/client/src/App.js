import React from "react";
import "./App.css";
import Resume from "./components/Resume";
import "bootstrap/dist/css/bootstrap.min.css";
import {Provider} from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";
import { loadUser } from "./store/actions/authAction";


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function App () {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const classes = useStyles();
    return (
      <Provider store={store}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                CV Builder
              </Typography>
              <Button href="" color="inherit">
                Login
              </Button>
            </Toolbar>
          <Navbar/>  
          </AppBar>
          <Resume />
        </div>
      </Provider>
    );
  }

export default App;
