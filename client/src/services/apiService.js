import jwtDecode from 'jwt-decode';

//check for errors
function checkStatus(resp) {
  if (!resp.ok) throw new Error(resp.statusMessage);
  return resp.json();
}

//save user during login
function saveToken(respBody) {
  localStorage.setItem('authToken', respBody.token)
  const user = jwtDecode(respBody.token);
  return user;
}

//Post
function getPosts() {
  return fetch('/api/posts').then(checkStatus);
}

function createPost(post) {
  return fetch('/api/posts', {
    method: 'Post',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus);
}

function deletePost(id) {
  return fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  }).then(checkStatus)
}

function updatePost(post, id) {
  return fetch(`/api/quotes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus)
}

//Auth

function login(creds) {
  return fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}

function register(creds) {
  return fetch('/api/auth/register', {
  method: 'POST',
  body: JSON.stringify(creds),
  headers: {
    'content-type': 'application/json'
  }
}).then(checkStatus).then(saveToken)
}

export {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  login,
  register
}
