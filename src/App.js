import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BleacherReport  from './components/bleacherReport';
import Home from './components/home';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articles" component={BleacherReport} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
