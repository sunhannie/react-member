import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory,hashHistory } from 'react-router'

import Nav from '../component/nav/nav.js';
import QandA from '../component/QandA/QandA.js';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }


  render() {
    return (
    	<div>
        <Nav />
        <QandA />
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
