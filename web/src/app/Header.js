import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../context/UserData'
import { NotificationIndic, NotificationTray } from '../components/notification/Notification'
import NotifContextProvider, { NotifContext } from '../context/Notifications'

export default function Header() {
  let { jwt } = useContext(UserDataContext)

  return (
    <React.Fragment>
      <NotifContextProvider>
        <header>
          <div className="container">
            <ul className="nav">
              <li><a className="button" href="/feed">Feed</a></li>
            </ul>
            <ul className="auth">
              {jwt
                ? <React.Fragment>
                  <NotificationIndic />
                  <li><a className="button" href="/logout">Logout</a></li>
                </React.Fragment>
                : <li><a className="button" href="/">Login</a></li>
              }
            </ul>
          </div>
        </header>
        <NotificationTray />
      </NotifContextProvider>
    </React.Fragment>
  )
}
