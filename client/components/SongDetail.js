import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import fetchSongById from "../queries/fetchSongById";

import LyricNew from "./LyricNew";
import LyricList from "./LyricList";

class SongDetail extends Component {
    renderContent(loading, song){
        console.log(this.props.data)
        if(loading){
            return (
                <h3>Loading...</h3>
            )
        }

        if(!loading && !song){
            return (
                <h3>Error: Could not find the song</h3>
            )
        }

        return (
            <div>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics}/>
                <LyricNew songId={song.id}/>
            </div>
        )
    }
    render(){
        const { loading, song } = this.props.data;

        return(
            <div>
                <Link to="/"> {"< Back"} </Link>
                { this.renderContent(loading, song) }
                
            </div>
        )
    }
}

export default graphql(fetchSongById, {
    // need to pass the variables before rendering
    options: (props) => {
        return {
            variables: { id: props.params.songId }
        };
    }
})(SongDetail);