import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


//Redux Stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


const styles = (theme) => ({
    ...theme.spreadThis
})

class login extends Component {


    constructor() {
        super();
        console.log("constructor")

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("okkkkkkkkkkk");
        if (nextProps.UI.errors) this.setState({ errors: nextProps.UI.errors });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log("this state ===> ", this.state);
    }

    render() {
        console.log("render: ", this.props);
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className={classes.textField}
                            // helperText={errors.email}
                            // error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange} fullWidth />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={classes.textField}
                            // helperText={errors.password}
                            // error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange} fullWidth />

                        {errors.message && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.message}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            Login
                        </Button>
                        <br />
                        <small style={{ mrginTop: '0.rem' }}>
                            dont have an account ? sign up <Link style={{ color: 'red' }} to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}


login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    console.log("mapStateToProps: ", state);
    return {
        user: state.user,
        UI: state.UI
    }
}

const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
