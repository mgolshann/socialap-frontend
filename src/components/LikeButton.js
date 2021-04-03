import React, { Component } from 'react'
import MyButton from '../util/MyButton';
import PropTypes from 'prop-types';

// icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { likeScream, unLikeScream } from '../redux/actions/dataActions';
import { Link } from 'react-router-dom';



export class LikeButton extends Component {


    likedScream = () => {
        if (this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.screamId === this.props.screamId
            )
        )
            return true;
        else return false;
    }

    likeScream = () => {
        this.props.likeScream(this.props.screamId)
    }

    unLikeScream = () => {
        this.props.unLikeScream(this.props.screamId)
    }


    render() {

        const { authenticated } = this.props.user;


        let likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : (
                this.likedScream() ? (
                    <MyButton tip="Undo Like" onClick={this.unLikeScream}>
                        <FavoriteIcon color="primary" />
                    </MyButton>
                ) : (
                        <MyButton tip="Like" onClick={this.likeScream}>
                            <FavoriteBorder color="primay" />
                        </MyButton>
                    )
            )

        return likeButton
    }
}


LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unLikeScream: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
    likeScream,
    unLikeScream
}


export default connect(mapStateToProps, mapActionToProps)(LikeButton)
