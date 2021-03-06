import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../context/UserData'
import Post from '../../components/post/Post'
import poop from '../../assets/poop.png'
import './Profile.scss'

export default function Profile() {
  let { jwt, userData } = useContext(UserDataContext)
  let [error, setError] = useState(null)
  let [feed, setFeed] = useState(null)
  let [user, setUser] = useState(null)

  const getFeed = async () => {
    let bearer = 'Bearer ' + jwt;
    let resp = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify({
        query: `query {
        posts (where: {user: {username: "` + window.location.pathname.split("/").slice(-1) + `"}}) {
          id
          thought
          user {
            username
          }
          user_likes {
            id
          }
        }
        users (where: {username: "` + window.location.pathname.split("/").slice(-1) + `"}) {
          username
          email
        }
      }`}
      ),
    }).then(res => res.json())
      .then(res => res.data)
      .then(res => {
        console.log(res)
        setFeed(res.posts)
        setUser(res.users[0])
      })

    if (resp?.error?.length > 0) {
      setError("There was an error")
    }
  }

  useEffect(() => {
    if (userData) {
      getFeed()
    }
    console.log(window.location.pathname.split("/"))
  }, [userData])

  return (
    <React.Fragment>
      <section>
        <div className="profile container">
          <div className="profile card">
            <div className="photo">
              <img src={poop} />
            </div>
            <div className="info">
              <h1>{user?.username}</h1>
              <p>{user?.email}</p>
            </div>
          </div>
          {feed?.map(post => {
            return (
              <Post key={post.id} post={post} setFeed={setFeed} />
            )
          })}
        </div>
      </section>
    </React.Fragment>
  )
}
