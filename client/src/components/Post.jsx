import React from 'react';
import { Link } from 'react-router-dom';
import './Post.css';

//give each post action: delete and edit
function Post({ post, onDelete, onEdit}) {
  return (
    <div>
    <form>
    <h1>{post.title}</h1>
      <p>{post.content}<button onClick={onDelete}>X</button></p>
      <Link to={`post_its/${post.id}/edit`}>Edit</Link>
    </form>
    </div>
  )
}
//maybe props.post.title
export default Post
