import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Post from './Post.jsx';
import PostForm from './PostForm.jsx'

function ShowAll(props) {
  //taught how javascript syntac must be outside of html tags
  const space = props.posts.map(post => (
      <div className='postDiv'>
      <Switch key={post.id}>
          <Route
            render={() => (
              <Post
                onEdit={()=> props.onEdit(post.id)}
                onDelete={()=> props.onDelete(post.id)}
                post={post}
              />
            )}
          />
          </Switch>
        </div>

    ));


  let response;
  if (!space) {
    console.log('space', space);
    response = <h1>Loading</h1>

  }



  //give "loading" while not being rendered

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
