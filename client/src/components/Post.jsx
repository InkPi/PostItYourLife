import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

function Post({ post, onDelete, onEdit}) {
  return (
    <div>
    <form>
    <h4>{post.title}</h4>
      <p>{post.content}<button onClick={onDelete}>X</button></p>
      <p onClick={onEdit}>Edit</p>
      </form>
    </div>
  )
}

export default Post
