import React, { Component } from 'react';
// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
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
    getPosts() //maybe heroku here //3000 become same look as 3001
      .then(data => {console.log('data',data);
        this.setState({
        posts: data //already out in array
      })}).catch((err)=> err.message);
  }

  // componentDidMount(){
  //   getPosts()
  //   .then(resBody => {
  //     this.setState({
  //       posts: resBody.data
  //     })
  //   });
  // }

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
    console.log('id', id)
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
    console.log('Edit');
    updatePost(post, id)
    .then(resBody => {
      this.setState((prevState, props) => {
        const { posts } = prevState;
        const indx = posts.findIndex(p => p.id === id);
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
          <Route
            render={()=> (<PostForm onSubmit={this.handleSubmit} />)}
            path='/new'
          />
          <ShowAll
          posts={this.state.posts}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          />
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
