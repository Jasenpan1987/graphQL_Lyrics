import React, { Component } from "react";
import { graphql } from "react-apollo";

import likeLyric from "../mutations/likeLyric";

class LyricList extends Component {
    constructor(props){
        super(props);

        this.renderLyrics = this.renderLyrics.bind(this);
    }

    likeHandler(id, likes){
        console.log(id);

        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __type: "Mutation",
                likeLyric: {
                    __typename: "LyricType",
                    likes: likes + 1,
                    id,
                }
            }
        });
    }

    renderLyrics(){
        const lyrics = this.props.lyrics
        if(!lyrics){
            return (
                <h4>No Lyrics</h4>
            )
        }

        return lyrics.map(({id, likes, content}) => {
            return (
                <li className="collection-item" key={id}>
                    {content}
                    <div className="vote-box">
                        <span className="num-likes">{likes}</span>
                        <i 
                            className="material-icons"
                            onClick={() => this.likeHandler(id, likes)}
                        >thumb_up</i>
                    </div>
                </li>
            )
        })
    }

    render(){
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        )
    }
}

export default graphql(likeLyric)(LyricList);