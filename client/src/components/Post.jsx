import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

function Post({ post, onDelete, onEdit}) {
  return (
    <div>
    <form>
    <h1>{post.title}</h1>
      <p>{post.content}<button onClick={onDelete}>X</button></p>
      <Link to={`posts/${post.id}/edit`}>Edit</Link>
      </form>
    </div>
  )
}

export default Post
