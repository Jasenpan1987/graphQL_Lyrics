import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import App from "./components/App";
import SongList from "./components/SongList";
import SongNew from "./components/SongNew";
import SongDetail from "./components/SongDetail";

import "./style/style.css";

// const client = new ApolloClient({
//   dataIdFromObject: o => {
//     return o.id
//   }
// });

const client = new ApolloClient({
  dataIdFromObject: (result) => {
    console.log(result.__typename, result.id)
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }

    // Make sure to return null if this object doesn't have an ID
    return null;
  },
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory} >
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongNew} />
          <Route path="songs/:songId" component={SongDetail}/>
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
