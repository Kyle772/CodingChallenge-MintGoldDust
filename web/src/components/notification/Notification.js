import React, { useContext } from 'react'
import "./Notification.scss"
import { NotifContext } from '../../context/Notifications'

export default function Notification(props) {
  return (
    <React.Fragment>
      <div className="card">
        <a href={"/feed/post/" + props?.notification?.post.id}>
          <h3>{props?.notification?.title}</h3>
          <p>{props?.notification?.content}</p>
        </a>
        <a className="button blurple" href={"/feed/post/" + props?.notification?.post.id}>Go To Post</a>
      </div>
    </React.Fragment>
  )
}

export function NotificationIndic(props) {
  let { setIsTrayOpen, isTrayOpen } = useContext(NotifContext)

  return (
    <div onClick={(e) => {
      setIsTrayOpen(!isTrayOpen)
    }} className="notif-indic">
      <i className="fas fa-bells"></i>
    </div>
  )
}


export function NotificationTray(props) {
  let { isTrayOpen, notifications } = useContext(NotifContext)

  return (
    <React.Fragment>
      <div className={"notifications" + (isTrayOpen ? " active" : "")}>
        {notifications?.map(notif => {
          return (
            <Notification notification={notif} />
          )
        })}
      </div>
    </React.Fragment>
  )
}

