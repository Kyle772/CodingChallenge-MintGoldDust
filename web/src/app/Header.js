import React from 'react'

export default function Header() {
  return (
    <React.Fragment>
      <header>
        <div className="container">
          <ul className="nav">
            <li><a className="button" href="/feed">Feed</a></li>
          </ul>
          <ul className="auth">
            <li><a className="button" href="/">Login</a></li>
            <li><a className="button" href="/logout">Logout</a></li>
          </ul>
        </div>
      </header>
    </React.Fragment>
  )
}
