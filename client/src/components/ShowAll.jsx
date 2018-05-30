import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Post from './Post.jsx';
import PostForm from './PostForm.jsx'

function ShowAll(props) {
  const space = props.posts.map(posts => {
    console.log('props',posts);
    return (
      <div className='postDiv' key={posts.id}>
          <h1>Title: {posts.title}</h1>
          <h2>Content: {posts.content}</h2>
          <Switch>
          <Route
            path={`/post_its/${posts.id}/edit`}
            render={()=> (
                <Post
                  onSubmit={updatedPost => props.onEdit(updatedPost.id)}
                  initialValue={posts}
                />
            )}
          />
          <Route
            render={() => (
              <Post
                onDelete={()=> props.onDelete(posts.id)}
                post={posts}
              />
            )}
          />
          </Switch>
        </div>
      )
  });
  //give "loading" while not being rendered
  let response;
  if (!space) {
    console.log('space', space);
  response = <h1>Loading</h1>

  }
  // else {
  //   console.log('space', space.title);
  //       response = (
  //       <div>
  //         <h1>Title: {space.title}</h1>
  //         <h2>Content: {space.content}</h2>
  //       </div>
  //     )
  //   }
    return(
      <div>
        {space}
      </div>
    )
  }
  // return (
  //   <ul>
  //     {props.posts.map(post => (
  //       <Switch key={post.id}>
  //         <Route
  //           path={'/post_its/${post.id}/edit'}
  //           render={()=> (
  //             <li>
  //               <PostForm
  //                 onSubmit={updatedPost => props.onEdit(updatedPost, updatedPost.id)}
  //                 initialValue={post}
  //               />
  //             </li>
  //           )}
  //         />
  //         <Route
  //           render={() => (
  //             <Post
  //               onDelete={()=> props.onDelete(post.id)}
  //               post={post}
  //             />
  //           )}
  //         />
  //         </Switch>
  //       ))}
  //   </ul>
  // )
//}

export default ShowAll;
