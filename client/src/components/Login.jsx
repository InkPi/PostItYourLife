import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
        usern: '',
        password: ''
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleInputChange(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({
        usern: '',
        password:''
      });
    }

    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type='text'
              onChange={this.handleInputChange}
              value={this.state.email}
              name='usern'
            />
          </label>
          <label>
            Password:
            <input
              type='password'
              onChange={this.handleInputChange}
              value={this.state.password}
              name='password'
            />
          </label>
          <button type='submit'>Login</button>
        </form>
      )
    }
  }

export default Login;
