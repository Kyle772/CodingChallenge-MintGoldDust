import React, { useContext, useState, useEffect } from 'react'
import { UserDataContext } from '../../context/UserData'

export default function Post(props) {
  let { userData } = useContext(UserDataContext)
  let [updateKey, setUpdateKey] = useState(0)

  useEffect(() => {
    setUpdateKey(updateKey + 1);
  }, [props?.post?.user_likes])

  return (
    <React.Fragment>
      { userData ?
        <div key={updateKey} className="post card">
          <div className="user">{props?.post?.user?.username}</div>
          <div className="thought">{props?.post?.thought}</div>{props?.post?.id}
          <div className="likes">{props?.post?.user_likes?.length}
            {console.log(props?.post?.user_likes) && props?.post?.user_likes.filter(user => user.id === userData.id).length > 0
              ? <button
                onClick={() => props.unlikePost(props?.post?.id)}
                className="button blurple">UnTHUMB
              </button>
              : <button
                onClick={() => props.likePost(props?.post?.id)}
                className="button blurple">THUMB
              </button>
            }
          </div>
        </div>
        : ""}
    </React.Fragment >
  )
}
