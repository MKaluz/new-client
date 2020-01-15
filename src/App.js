import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import Navigation from "./Components/Utils/Navigation";
import "./App.css";
import Visits from "./Components/Visits";
import MyVisits from "./Components/MyVisits";
import Register from "./Components/Register";
import axios from "axios";
import About from "./Components/About";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: "",
      data: [],
      myData: [],
      isLogged: false
    };
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    fetch("https://localhost:44396/visit/available", {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        const temp = res;
        this.setState({ data: temp });
        console.log(this.state.data);
        console.log(res);
        //this.setData(r));
      });
    if (this.state.isLogged) {
    }
  }
  setData = _data => {
    this.setState({ data: _data });
    console.log("LOG: ", this.state.data);
  };
  setToken = _token => {
    this.setState({ token: _token, isLogged: true });
  };

  render() {
    return (
      <div class="container">
        <Navigation />
        <Router>
          <Switch>
            <Route exact path="/">
              <Login onTokenChange={this.setToken} token={this.state.token} />
            </Route>
            <Route path="/visits">
              <Visits data={this.state.data} token={this.state.token} />
            </Route>
            <Route path="/my-visits">
              <MyVisits data={this.state.myData} token={this.state.token} />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
