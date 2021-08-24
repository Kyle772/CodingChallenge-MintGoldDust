import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserData'

export default function Header() {
  let { jwt } = useContext(UserDataContext)

  return (
    <React.Fragment>
      <header>
        <div className="container">
          <ul className="nav">
            <li><a className="button" href="/feed">Feed</a></li>
          </ul>
          <ul className="auth">
            {jwt
              ? <li><a className="button" href="/logout">Logout</a></li>
              : <li><a className="button" href="/">Login</a></li>
            }
          </ul>
        </div>
      </header>
    </React.Fragment>
  )
}
