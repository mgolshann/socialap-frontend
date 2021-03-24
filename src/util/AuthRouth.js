import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect} from 'react-redux';
import PropTypes from 'prop-types';


const AuthRouth = ({ component: Component, authenticated, ...rest }) => (
    <Route
        {...rest}
        render={(props) => 
            authenticated === true ?
                <Redirect to="/" /> :
                <Component {...props} />
        }
    />
)

AuthRouth.propTypes = {
    user: PropTypes.object.isRequired,

}
const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})
export default connect(mapStateToProps)(AuthRouth);