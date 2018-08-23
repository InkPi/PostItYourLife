import React from 'react';
//import { BrowserRouter as Switch, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import NavBar from './NavBar';
import Post from './Post.jsx';
import PostForm from './PostForm.jsx';

function ShowAll(props) {
  //was taught how javascript syntax must be outside of html tags
  console.log('props for showall',props);
  const space = props.posts.map((post, i) => (
      <div className='postDiv' key={i}>
      <Switch>
          <Route
            // exact path='/'
            render={() => (
              <Post
                onDelete={
                  // ()=> {console.log(post.id);
                    props.onDelete
                }
                post={post}
              />
            )}
          />
          <Route
            path={'/'}
            render={() => (
              <li>
                <PostForm
                  //onSubmit={updatedPost => props.onEdit(updatedPost, updatedPost.id)}
                  onSubmit={props.onEdit}
                  initialValue={post}
                  postId={post.id}
                />
              </li>
            )}
          />
        </Switch>
        </div>

    ));

  /*if nothing loads or when something haven't showed up yet,
  put large header of Loading*/
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
