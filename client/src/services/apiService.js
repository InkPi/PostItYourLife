import jwtDecode from 'jwt-decode';

const BASE_URL= process.env.REACT_APP_BASE_URL;
//Realized I put starting url /, after 3000, different for posts compared to other files
//check for errors
function checkStatus(resp) {
  // if (!resp.ok) {throw new Error(resp.statusText)};
  console.log('errors', resp);
  return JSON.parse(resp);
}

//save user during login
function saveToken(respBody) {
  localStorage.setItem('authToken', respBody.token)
  const user = jwtDecode(respBody.token);
  return user;
}

/*Posts*/

//get
function getPosts() {
  const req = fetch(`${BASE_URL}/post_its`).then(checkStatus);
  console.log('fetch', req)
  return req;
}

//create
//adding new headers is wrong
function createPost(post) {
  return fetch(`${BASE_URL}/post_its`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus);
}

//destroy
function deletePost(id) {
  console.log("DELETE POST")
  const foo=() => {
    console.log('deleted');
  }
  return fetch(`${BASE_URL}/api/post_its/${id}`, {
    method: 'DELETE',
  }).then(wantchocolate => foo())
}

//update
//turn json into string
function updatePost(post, id) {
  return fetch(`${BASE_URL}/api/post_its/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus)
}

/* Auth */

//login
function login(creds) {
  return fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    body: JSON.stringify(creds),
    headers: {
      'content-type': 'application/json'
    }
  }).then(checkStatus).then(saveToken)
}

//register
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
