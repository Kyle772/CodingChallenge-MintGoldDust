import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../context/UserData'
import Post from '../../components/post/Post'
import poop from '../../assets/poop.png'
import './Profile.scss'

export default function Profile() {
  let { jwt, userData } = useContext(UserDataContext)
  let [error, setError] = useState(null)
  let [feed, setFeed] = useState(null)

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
        posts (where: {user: {username: "` + userData.username + `"}}) {
          id
            user {
              username
            }
            thought
            user_likes {
              id
            }
          }
        }`}
      ),
    }).then(res => res.json())
      .then(res => res.data)

    if (resp?.error?.length > 0) {
      setError("There was an error")
    } else if (resp) {
      setFeed(resp.posts)
    }
  }

  useEffect(() => {
    if (userData) {
      getFeed()
    }
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
              <h1>{userData?.username}</h1>
              <p>{userData?.email}</p>
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
