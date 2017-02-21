import React, { Component } from "react";
import { graphql } from "react-apollo";

import addLyricToSong from "../mutations/addLyricToSong";


class LyricNew extends Component {
    constructor(props){
        super(props);

        this.addLyricsHandler = this.addLyricsHandler.bind(this);
    }

    addLyricsHandler(e){
        e.preventDefault();

        const content = this._input.value;
        const { songId } = this.props;

        this.props.mutate({
            variables: {
                songId,
                content
            }
        }).then(res => {
            
        })

        this._input.value = "";
    }

    render(){
        return (
            <form onSubmit={this.addLyricsHandler}>
                <label>Add Lyrics</label>
                <input type="text" ref={input => this._input = input}/>
            </form>
        )
    }
}

export default graphql(addLyricToSong)(LyricNew);