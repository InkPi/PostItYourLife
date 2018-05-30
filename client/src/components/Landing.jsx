import React from 'react';
import { Link } from 'react-router-dom';

function Landing (props) {

  return (
    <div>
      <ul>
       <li><Link to='/post_its'>Show All Post</Link></li>
      </ul>
    </div>
  )
}

export default Landing;
