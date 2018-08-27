import React, { Component } from 'react';
// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './App.css';
import ShowAll from './components/ShowAll';
import PostForm from './components/PostForm';
import Login from './components/Login';

import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  login,
  register
} from './services/apiService';
const BASE_URL= process.env.REACT_APP_BASE_URL;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      email: '',
      password: '',
      currentUser: null,
      base:"http://localhost:3001"
    };
    this.getPosts = this.getPosts.bind(this);
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
    this.currentUser = this.currentUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    //this.handleLogin = this.handleLogin.bind(this);
  }

  currentUser() {
    const res = !!(localStorage.getItem("jwt"));
    this.setState({
      currentUser: res,
    })
    return res;
  }

//   getPosts() {
//     const jwt = localStorage.getItem("jwt")
//     const init = {
//       headers: {"Authorization": `Bearer ${jwt}`
//     }
//     fetch(`${BASE_URL}/post_its`, init)
//     .then(res => res.json())
//     .then(data => this.setState({
//       posts: data,
//   }))
//     .then(console.log('state post', this.state.posts))
//     .catch(err => err);
//     console.log('currentUser', currentUser);
// }

  getPosts() {
    const jwt = localStorage.getItem("jwt")
    const init = {
      headers: {"Authorization": `Bearer ${jwt}`}
    }
    fetch(`${this.state.base}/api/post_its`, init)
    .then(res => res.json())
    .then(data => this.setState({
      posts: data,
    }))
    .catch(err => err)
  }

handleChange(e) {
  this.setState({
    [e.target.name]:e.target.value
  })
}

logout() {
  localStorage.removeItem("jwt")
  this.setState({
    currentUser: false,
    posts: [],
  })
}

login() {
  const url = `${this.state.base}/api/user_token`;

  // const url = `${BASE_URL}/api/user_token`;
  const body = {"auth": {"email": this.state.email, "password": this.state.password} }
  const init = { method: 'POST',
                 headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                 mode: 'cors',
                 body:JSON.stringify(body),
                }
  fetch(url, init)
  .then(res => res.json())
  .then(res => localStorage.setItem("jwt", res.jwt))
  .then(() => this.setState({
     currentUser: true,
       }))
  .then(() => this.getPosts())
  .catch(err => console.log("FETCH ERROR",err))
  }

    componentDidMount() {
      this.currentUser();
      this.getPosts();
    }

  //set data of arrays onto screen
  // componentDidMount() {
  //   getPosts() //coming out
  //     .then(data => {console.log('data',data);
  //       this.setState({
  //       posts: data //already out in array
  //     })}).catch((err)=> err.message);
  // }

  //create action
  handleSubmit(post) {
    createPost(post)
    .then(resBody => {
      this.setState((prevState, props) => {
        return {
          posts: prevState.posts.concat(resBody.data)
        } //didn't know about concat but it is useful: help merge new and old arrays
      })
    });
  }




  //delete action
  handleDelete(id, e) {
    const jwt = localStorage.getItem("jwt")
    const init = {
      headers: {"Authorization": `Bearer ${jwt}`}
    }
    e.preventDefault();
    fetch(`${this.state.base}/api/post_its/${id}`, init)
      .then(resBody=> {
      this.setState((prevState, props) => {
        return {
          posts: prevState.posts.filter(post=> post.id !== id)
        }
      })
    })
    .catch(err => err)
  }
  // handleDelete(id, e) {
  //   console.log("I AM DELETE")
  //   e.preventDefault();
  //   console.log('id', id);
  //   deletePost(id)
  //   .then(resBody=> {
  //     this.setState((prevState, props) => {
  //       return {
  //         posts: prevState.posts.filter(post=> post.id !== id)
  //       }
  //     })
  //   });
  // }

  //edit action
  handleEdit(post, id) {
    console.log("this is id:", id);
    updatePost(post, id) //got help: did not realize this had to be exact params in another file
    .then(resBody => {
      this.setState((prevState, props) => {
        const { posts } = prevState; //destructoring method (got help, didn't know why I thought it was a param)
        console.log('this is prevState:', prevState);
        const indx = posts.findIndex(q => q.id === id);
        return {
          posts: [
            ...posts.slice(0, indx),
            resBody.data,
            ...posts.slice(indx+1)
          ]
        } //not used to .slice and looked back on previous labs
      })
      .catch(err=>console.log(err))
    });
  }
  // handleEdit(post, id) {
  //   console.log("this is id:", id);
  //   updatePost(post, id) //got help: did not realize this had to be exact params in another file
  //   .then(resBody => {
  //     this.setState((prevState, props) => {
  //       const { posts } = prevState; //destructoring method (got help, didn't know why I thought it was a param)
  //       console.log('this is prevState:', prevState);
  //       const indx = posts.findIndex(q => q.id === id);
  //       return {
  //         posts: [
  //           ...posts.slice(0, indx),
  //           resBody.data,
  //           ...posts.slice(indx+1)
  //         ]
  //       } //not used to .slice and looked back on previous labs
  //     })
  //     .catch(err=>console.log(err))
  //   });
  // }



  //lab
  // handleLogin(creds) {
  //   login(creds)
  //     .then(user => this.setState({currentUser: user}));
  // }

  //go to path based on action
  render() {
    console.log(this.state.posts, "the posts");
    /* Had help with organizing and some routing problems partly due
    to rerouting confusion from auth such as the commented area below
    and along the way I learned some things (thank you Mimi) */

    // const display = this.state.posts && this.state.currentUser ? this.state.posts.map

    // const display = this.state.currentUser ? (
    //   <ShowAll posts={this.state.posts}
    //                         />
    // ) : "UNAUTHORIZED";
    //Within Nav
    // {!!this.state.currentUser || <Login onSubmit={this.handleLogin} />}

    return(
      <Router>

        <div className="App">

          <div className="landing">

          <nav>
            <Link to ='/new'>Create</Link>
          </nav>
          <h1>Post It Your Life</h1>
        <form>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            name="email" //should add id?
            id="email" //just added
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            name="password"
            id="password" //just added
            onChange={this.handleChange}
            value={this.state.value}
            type="password"
          />
          </form>
          <br />
          <button onClick={this.login}>
          Login
          </button>

          <button onClick={this.logout}>
          Logout
          </button>

          <button onClick={this.getPosts}>
          Get Posts
          </button>
          <p>{this.state.postItsReceived}</p>


          </div>

          <div className='response'>
          <Switch>
          <Route
          path='/new'
            render={()=> (
            <PostForm onSubmit={this.handleSubmit}
            />)}
          />
          <Route
          exact path='/'
          render={() => (
            <ShowAll
            posts={this.state.posts}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            />)}
          />
          <Route
            path="/post_its/:id/edit"
            label="edit"
            render={({ match }) => (
              <PostForm post={this.state.posts.filter(el => el.id === match.params.id)}
                        onSubmit={this.handleEdit}
                        id={match.params.id}
              />)}
          />
           </Switch>
           </div>

          </div>
        </Router>
    );
  }
}

export default App;
