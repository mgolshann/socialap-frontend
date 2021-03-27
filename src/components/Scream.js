import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
// Redux
import { connect } from 'react-redux';
import { likeScream, unLikeScream } from '../redux/actions/dataActions';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,

    },
    content: {
        padding: 25,
        objectFit: "cover"
    }
}


class Scream extends Component {

    likedScream = () => {
        if (this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.screamId === this.props.scream._id
            )
        )
            return true;
        else return false;
    }

    likeScream = () => {
        this.props.likeScream(this.props.scream._id)
    }

    unLikeScream = () => {
        this.props.unLikeScream(this.props.scream._id)
    }

    render() {

        dayjs.extend(relativeTime);
        const { classes,
            scream: { _id, body, createdAt, userImage, userHandle, likeCount, commentCount },
            user: { authenticated }
        } = this.props;

        let likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder color="primary" />
                </Link>
            </MyButton>
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
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.image}
                    image={userImage}
                    title="profile image" />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        color="primary"
                        component={Link}
                        to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>

                    {likeButton}
                    <span>{likeCount} Likes</span>

                    <MyButton tip="comments">
                        <ChatIcon color="primary"></ChatIcon>
                    </MyButton>
                    <span>{commentCount} comments</span>

                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unLikeScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionToProps = {
    likeScream,
    unLikeScream
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Scream))
