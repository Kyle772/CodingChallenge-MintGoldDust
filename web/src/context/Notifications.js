import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserDataContext } from './UserData';

export const NotifContext = createContext();

export const NotifContextProvider = (props) => {
  let { jwt, userData } = useContext(UserDataContext)
  let [isTrayOpen, setIsTrayOpen] = useState(false)
  let [notifications, setNotifications] = useState(null)
  let [error, setError] = useState(null)

  const reloadNotifs = async () => {
    let bearer = 'Bearer ' + jwt;
    let resp = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify({
        query: `query {
          notifications (where: {for_user: {id: "` + userData.id + `"}}) {
            title
            content
            post {
              id
            }
          }
        }`}
      ),
    }).then(res => res.json())
      .then(res => res.data).then(res => {
        setNotifications(res.notifications)
      })

    if (resp?.error?.length > 0) {
      setError("There was an error")
    }
  }

  useEffect(() => {
    if (isTrayOpen && userData) {
      reloadNotifs(); // actually just loading
    }
  }, [isTrayOpen, userData])

  return (<NotifContext.Provider value={{ setIsTrayOpen, isTrayOpen, notifications }}>
    {props.children}
  </NotifContext.Provider>);
}

export default NotifContextProvider;