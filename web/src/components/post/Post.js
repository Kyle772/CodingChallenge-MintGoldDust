import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../../context/UserData'
import "./Post.scss"

export default function Post(props) {
  let { jwt, userData } = useContext(UserDataContext)
  let [userLikes, setUserLikes] = useState(null)
  let [error, setError] = useState(null)

  useEffect(() => {
    setUserLikes(props.post.user_likes)
  }, [])

  const likePost = async (pid) => {
    let bearer = 'Bearer ' + jwt;
    let resp = await fetch('/api/posts/like/' + pid, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify({}),
    }).then(response => response.json())
      .then(response => setUserLikes(response.user_likes))

    if (resp?.error?.length > 0) {
      setError(resp.error)
    }
  }

  const unlikePost = async (pid) => {
    let bearer = 'Bearer ' + jwt;
    let resp = await fetch('/api/posts/unlike/' + pid, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer
      },
      body: JSON.stringify({}),
    }).then(response => response.json())
      .then(response => setUserLikes(response.user_likes))

    if (resp?.error?.length > 0) {
      setError(resp.error)
    }
  }


  return (
    <React.Fragment>
      { userData ?
        <div className="post card">
          {error ? <React.Fragment>
            <p className="context error message">{error}<span className="close" onClick={(e) => setError("")}>X</span></p>
          </React.Fragment> : ""}
          <div className="user">
            <a href={"/profile/" + (props?.post?.user?.username === userData.username ? "me" : props?.post?.user?.username)}>
              {props?.post?.user?.username}
            </a>
          </div>
          <div className="thought">{props?.post?.thought}</div>
          <div className="likes">
            {userLikes?.length > 0 && userLikes.filter(user => user.id === userData.id).length > 0
              ? <button
                onClick={() => unlikePost(props?.post?.id)}
                className="button blurple">{userLikes?.length} <i className="fas fa-heart-square"></i>
              </button>
              : <button
                onClick={() => likePost(props?.post?.id)}
                className="button">{userLikes?.length} <i className="fal fa-heart-square"></i>
              </button>
            }
          </div>
        </div>
        : ""}
    </React.Fragment >
  )
}
