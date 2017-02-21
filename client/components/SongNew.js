import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";

import fetchSongQuery from "../queries/fetchSongs";
import addSongMutation from "../mutations/addSong";

class SongNew extends Component {
    constructor(props){
        super(props);

        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(e){
        e.preventDefault();
        
        const songName = this._input.value;
        
        this.props.mutate({
            variables: {
                title: songName
            },
            // this method is used to call the query again, otherwise apollo will not rerun the query
            refetchQueries: [ { query: fetchSongQuery /*, variables: {}*/ } ]
        })
        .then(resp => console.log(resp.data.addSong))
        .then(() => hashHistory.push("/"))
        .catch(err => console.error(err))

        this._input.value = "";
    }

    render(){
        return (
            <div>
                <Link to="/"> {"< Back"} </Link>
                <h3>Create New Song</h3>
                <form onSubmit={this.submitHandler}>
                    <label>Song Title</label>
                    <input type="text" ref={input => this._input = input} />
                </form>
            </div>
        )
    }
}

export default graphql(addSongMutation)(SongNew);