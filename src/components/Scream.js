import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';


const styles = {
    card: {
        position: 'relative',
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

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: { _id, body, createdAt, userImage, userHandle, likeCount, commentCount },
            user: { authenticated, credentials: { handle } }
        } = this.props;

        let deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={_id} />
        ) : null


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

                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>

                    <LikeButton screamId={_id} />
                    <span>{likeCount} Likes</span>

                    <MyButton tip="comments">
                        <ChatIcon color="primary"></ChatIcon>
                    </MyButton>
                    <span>{commentCount} comments</span>

                    <ScreamDialog userhandle={userHandle} screamId={_id} />

                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,

    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(withStyles(styles)(Scream))
