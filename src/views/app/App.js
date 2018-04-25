import React, { Component } from 'react';
import Blackboard from 'components/blackboard/Blackboard';
import Home from 'components/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/game" component={Blackboard} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
