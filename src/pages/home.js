import { Grid, GridList } from '@material-ui/core'
import React, { Component } from 'react'
import axios from 'axios';
import Scream from '../components/Scream';
import Profile from '../components/Profile';


class home extends Component {

    state = { screams: null }

    componentDidMount() {
        axios.get('/screams')
            .then(res => {
                console.log(res.data)
                this.setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream._id} scream={scream} />)
        ) : <p>loading ...</p>
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item sm={8} xs={12}>
                        {recentScreamsMarkup}
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Profile />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default home