import jwtDecode from 'jwt-decode';

const BASE_URL= process.env.REACT_APP_BASE_URL;

//check for errors
function checkStatus(resp) {
  if (!resp.ok) throw new Error(resp.statusMessage);
  console.log('Hello' + resp);
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
  const req = fetch(`${BASE_URL}/post_its`).then(checkStatus);
  console.log('fetch', req)
  return req;
}

function createPost(post) {
  return fetch(`${BASE_URL}/post_its`, {
    method: 'Post',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus);
}

function deletePost(id) {
  const foo=() => {
    console.log('deleted');
  }
  return fetch(`${BASE_URL}/post_its/${id}`, {
    method: 'DELETE',
  }).then(wantchocolate => foo())
}

function updatePost(post, id) {
  return fetch(`${BASE_URL}/post_its/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus)
}

//Auth

function login(creds) {
  return fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}

function register(creds) {
  return fetch(`${BASE_URL}/api/auth/register`, {
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
