import { AppBar, Button, Toolbar } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class Navbar extends Component {
    render() {
        return (
            <div className="App">
                <AppBar>
                    <Toolbar className="nav-container">
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default Navbar
