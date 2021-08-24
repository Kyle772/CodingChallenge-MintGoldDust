import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../../context/UserData'
import './Feed.scss'
import Post from '../../components/post/Post'
import Notification, { NotificationTray } from '../../components/notification/Notification'

export default function Feed() {
  let { jwt, userData } = useContext(UserDataContext)
  let [error, setError] = useState(null)
  let [feed, setFeed] = useState(null)
  let [notifications, setNotifications] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    let bearer = 'Bearer ' + jwt;
    let resp = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify({
        query: `
        mutation {
          createPost(
            input: {data: {thought: "` + formData.get("thoughts") + `", user: "` + userData.id + `"}}
            ) { 
              post {
                thought
                user {
                  username
                }
                user_likes {
                  username
                }
              }
            }
          }`
      }),
    })
      .then(res => res.json())
      .then(res => res.data)

    if (resp?.error?.length > 0) {
      setError(resp.error)
    } else if (resp) {
      setError("Message posted!")
      reloadFeed()
    }
  }

  const reloadFeed = async () => {
    let bearer = 'Bearer ' + jwt;
    let resp = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify({
        query: `query {
          posts (where: {id: "` + window.location.pathname.split("/").slice(-1) + `"}) {
            id
            thought
            user {
              username
            }
            user_likes {
              id
            }
          }
        }`}
      ),
    }).then(res => res.json())
      .then(res => res.data).then(res => {
        setFeed(res.posts)
      })

    if (resp?.error?.length > 0) {
      setError("There was an error")
    }
  }

  useEffect(() => {
    if (jwt) {
      reloadFeed(); // actually just loading
    }
  }, [jwt])


  return (
    <React.Fragment>
      <section className="feed">
        <div className="container">
          {feed?.map(post => {
            return (
              <Post post={post} setFeed={setFeed} />
            )
          })}
        </div>
      </section>
    </React.Fragment>
  )
}
