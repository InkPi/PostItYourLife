import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

function Post({ post, onDelete, onEditClick}) {
  return (
    <li>
    <h4>{post.title}</h4>
      <p>{post.content}<button onClick={onDelete}>X</button></p>
      <Link to={'/posts/${post.id}/edit'}>Edit</Link>
    }
    </li>
  )
}

export default Post
