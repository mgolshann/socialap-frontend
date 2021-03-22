import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRouth from './util/AuthRouth'

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

//style
import './App.css'

//components
import Navbar from './components/Navbar';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';


let authenticated;
const token = localStorage.getItem('x-auth-token');
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
}

const theme = createMuiTheme(themeFile);

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRouth exact path="/login" component={login} authenticated={authenticated} />
                <AuthRouth exact path="/signup" component={signup} authenticated={authenticated} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
