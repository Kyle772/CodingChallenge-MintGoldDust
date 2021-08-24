import React, { useContext, useState } from 'react'
import { UserDataContext } from '../../context/UserData'

export default function Login() {
  let { setJwt } = useContext(UserDataContext);
  let [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    let resp = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
        mutation {
          login(
            input: { identifier: "` + formData.get("username").toLowerCase() + `", password: "` + formData.get("password") + `" }
            ) {
              jwt
            }
          }`
      }),
    })
      .then(res => res.json())
      .then(res => res.data)

    if (resp?.error?.length > 0) {
      setError(resp.error)
    } else if (resp) {
      setJwt(resp.login.jwt)

      // getting cookie exp time
      let d = new Date();
      let exp = d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
      let shortExp = d.setTime(d.getTime() + (15 * 60 * 1000)); // 15 minutes
      let isSSL = window.location.protocol === "https:" ? " Secure;" : "";
      // check remember me
      if (formData.get("rememberMe")) {
        document.cookie = "jwt=" + resp.login.jwt + "; expires=" + exp + ";" + isSSL;
      } else {
        document.cookie = "jwt=" + resp.login.jwt + "; expires=" + shortExp + ";" + isSSL;
      }

      window.location.href = "/feed";
    }
  }

  return (
    <React.Fragment>
      <form id="Login" onSubmit={(e) => handleSubmit(e)}>
        <input name="username" type="text" placeholder="Username"></input>
        <input name="password" type="password" placeholder="Password"></input>
        <div className="button-con space">
          <a href="/register"><button type="button" className="button">Register</button></a>
          <button type="submit" className="button blurple">Login</button>
        </div>
      </form>
    </React.Fragment >
  )
}