import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import fetchSongQuery from "../queries/fetchSongs";
import deleteSongMutation from "../mutations/deleteSong";

class SongList extends Component {
    constructor(props){
        super(props);

    }

    deleteSongHandler(id){
        this.props.mutate({
            variables: {
                id
            },
            // refetchQueries: [ { query: fetchSongQuery } ]
        })
        .then(() => this.props.data.refetch()); // alternative way to refetch data since we already has the query
    }

    renderSongList(){
        return this.props.data.songs.map(({ id, title }) => {
            return (
                <li key={id} className="collection-item">
                    <Link to={`/songs/${id}`}>{title}</Link>
                    <i className="material-icons" onClick={this.deleteSongHandler.bind(this, id)}>
                        delete
                    </i>
                </li>
            )
        })
    }

    render(){
        if(this.props.data.loading){
            return <div>Loading...</div>
        }
        return (
            <div>
                <ul className="collection">
                    { this.renderSongList() }
                </ul>
                <Link 
                    to="/songs/new"
                    className="btn-floating btn-large green right"
                >
                    <i className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

export default graphql(deleteSongMutation)(
    graphql(fetchSongQuery)(SongList)
);