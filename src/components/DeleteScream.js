import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

//MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const style = {
    deleteButton: {
        position: 'absolute',
        left: '90%',
        top: '10%'
    }
};
class DeleteScream extends Component {

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    handleDeleteScream = () => {
        this.props.deleteScream(this.props.screamId);
        this.setState({ open: false })
    }
    state = { open: false }

    render() {

        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton
                    tip="Delete Scream"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}>
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Are you sure ??</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancle
                        </Button>
                        <Button onClick={this.handleDeleteScream} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    screamId: PropTypes.string.isRequired,
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}
export default connect(null, { deleteScream })(withStyles(style)(DeleteScream))