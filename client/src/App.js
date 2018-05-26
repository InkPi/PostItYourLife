import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const BASE_URL= process.env.REACT_APP_BASE_URL;

class App extends Component {
  constructor() {
    super();

    this.state = {
      //https://www.robinwieruch.de/local-storage-react/
      postit: []
    }

    }

  componentDidMount() {
    fetch(`${BASE_URL}/post_it`) //maybe heroku here //3000 become same look as 3001
      .then(resp => resp.json())
      .then(data => this.setState({
        postit: data.postit
      }));
  }

  render() {
    return (
      <div className="App">
        <div>Hey there</div>
        <div>{JSON.stringify(this.state.postit)}</div>
        <div>{BASE_URL}</div>
      </div>
    );
  }
}

export default App;
