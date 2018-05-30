import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import './Post.css';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false,
      post: Object.assign({
        title: '',
        content: '',
      }, props.initialValue)
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const {name, value} = e.target;
    console.log(name,value);
    this.setState((prevState, props) => ({
      post : {
        ...prevState.post,
        [name]: value
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.post);
    this.setState({
      redirectHome:true
    });
  }

render() {
  const { title, content, id } = this.state.post
  return (
    <form onSubmit={this.handleSubmit} className={id? 'edit' : 'create'}>
      {this.state.redirectHome && <Redirect to='/' />}
      {!id && <h3>New Post</h3>}
      <label>
        <h4>Title</h4>
        <input
          type='text'
          name='title'
          value={title} //this.state.post.title/put this.state for state change
          onChange={this.handleInputChange}
        />
      </label>
      <label>
      <h4>Content</h4>
      <textarea
        name='content'
        value={content} //this.state.post.content
        onChange={this.handleInputChange}
      />
      </label>
      <button type='submit'>{id? 'Edit' : 'Create'} Post</button>
      <Link to='/'>Cancel</Link>
    </form>
  )
}
}

export default PostForm;
