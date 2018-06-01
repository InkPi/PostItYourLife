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
      currentUser: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    getPosts() //coming out
      .then(data => {console.log('data',data);
        this.setState({
        posts: data //already out in array
      })}).catch((err)=> err.message);



  }


  handleSubmit(post) {
    createPost(post)
    .then(resBody => {
      this.setState((prevState, props) => {
        return {
          posts: prevState.posts.concat(resBody.data)
        }
      })
    });
  }

  handleDelete(id) {
    console.log('id', id);
    deletePost(id)
    .then(resBody=> {
      this.setState((prevState, props) => {
        return {
          posts: prevState.posts.filter(post=> post.id !== id)
        }
      })
    });
  }

  handleEdit(post, id) {
    console.log("this is id:", id);
    updatePost(post, id) //got help: did not realize this had to be exact params in another file
    .then(resBody => {
      console.log("this is resBody:", resBody);

      this.setState((prevState, props) => {
        const { posts } = prevState; //destructoring method (got help, didn't know why I thought it was a param)
        console.log('this is prevState:', prevState);
        const indx = posts.findIndex(q => q.id === id);
        console.log("this is index:", indx);
        return {
          posts: [
            ...posts.slice(0, indx),
            resBody.data,
            ...posts.slice(indx+1)
          ]
        }
      })
    });
  }

  handleLogin(creds) {
    login(creds)
      .then(user => this.setState({currentUser: user}));
  }





  render() {
    return(
      <Router>
        <div className="App">
          <nav>
            <Link to ='/new'>Create</Link>
            {!!this.state.currentUser || <Login onSubmit={this.handleLogin} />}
          </nav>
          <h2>Posts</h2>
          <Switch>
          <Route
            render={()=> (<PostForm onSubmit={this.handleSubmit} />)}
            path='/new'
          />

          <Route
          exact path='/post_its'
          render={() => (
            <ShowAll
            posts={this.state.posts}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          )}
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
        </Router>
    );
  }
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       //https://www.robinwieruch.de/local-storage-react/
//       postit: []
//     }

//     }

//   componentDidMount() {
//     fetch(`${BASE_URL}/post_it`) //maybe heroku here //3000 become same look as 3001
//       .then(resp => resp.json())
//       .then(data => this.setState({
//         postit: data.postit
//       }));
//   }

//   render() {
//     return (
//       <div className="App">
//         <div>Hey there</div>
//         <div>{JSON.stringify(this.state.postit)}</div>
//         <ShowPosts />
//         <div>{BASE_URL}</div>
//       </div>
//     );
//   }
// }

export default App;
