import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Post from './Post.jsx';
import PostForm from './PostForm.jsx'

function ShowAll(props) {
  return (
    <ul>
      {props.posts.map(post => (
        <Switch key={post.id}>
          <Route
            path={'/posts/${post.id}/edit'}
            render={()=> (
              <li>
                <PostForm
                  onSubmit={updatedPost => props.onEdit(updatedPost, updatedPost.id)}
                  initialValue={post}
                />
              </li>
            )}
          />
          <Route
            render={() => (
              <Post
                onDelete={()=> props.onDelete(post.id)}
                post={post}
              />
            )}
          />
          </Switch>
        ))}
    </ul>
  )
}

export default ShowAll;
