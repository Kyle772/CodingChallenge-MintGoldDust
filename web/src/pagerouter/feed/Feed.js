import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../../context/UserData'
import './Feed.scss'
import Post from '../../components/post/Post'

export default function Feed() {
  let { jwt, userData } = useContext(UserDataContext)
  let [error, setError] = useState(null)
  let [feed, setFeed] = useState(null)

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
        posts {
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
    if (jwt) {
      reloadFeed(); // actually just loading
    }
  }, [jwt])


  return (
    <React.Fragment>
      <section className="feed">
        <div className="container">
          <div className="card">
            <div className="intro">Welcome back {userData ? userData.username : <div className="short-text-placeholder"></div>},</div>
            <form onSubmit={(e) => handleSubmit(e)} id="Thoughts">
              <textarea name="thoughts" class="thoughts"></textarea>
              <button type="submit" className="button blurple">Yeet</button>
            </form>
          </div>
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
