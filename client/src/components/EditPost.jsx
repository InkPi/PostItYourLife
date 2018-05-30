import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import Post from './Post'

class EditPost extends Component ({ post, onDelete, onEditClick}) {
  constructor(props) {
    super(props);
    this.state = {
      redirectHome: false
      post:
    }
  }
  return (
    <div>
    <form>
    <h4>{post.title}</h4>
      <p>{post.content}<button onClick={onDelete}>X</button></p>
      <p onClick={onEditClick}>Edit</p>
    </form>
    </div>
  )
}

export default EditPost
