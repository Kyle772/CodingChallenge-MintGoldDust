import React from 'react'

export default function Login() {
  return (
    <React.Fragment>
      <input type="text" placeholder="Username"></input>
      <input type="password" placeholder="Password"></input>
      <div className="button-con space">
        <a href="/register"><button type="submit" className="button">Register</button></a>
        <a className="button blurple">Login</a>
      </div>
    </React.Fragment>
  )
}
