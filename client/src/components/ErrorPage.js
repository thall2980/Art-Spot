import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="singlePageImgBackground2">
        <div className="errorDiv">
            <h1>Page Does Not Exist!</h1>
            <h3>Looks like you've colored outside the lines.</h3>
            <iframe src="https://giphy.com/embed/gobmtZWI6Fm0g" width="480" height="352" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            <h3>Click <Link className="nameLink"  to="/artists">here</Link> to return to a better time.</h3>
        </div>
    </div>
  )
}

export default ErrorPage