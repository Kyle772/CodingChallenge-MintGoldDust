import React, { useContext, useState } from 'react'
import { UserDataContext } from '../../context/UserData'
import poop from '../../assets/poop.png'

export default function Register() {
  let { setJwt } = useContext(UserDataContext);
  let [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);

    if (formData.get("password") !== formData.get("cPassword")) {
      setError("Passwords do not match")
    } else if (formData.get("password").length < 6) {
      setError("Password must be at least 6 characters")
    } else {
      let resp = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
        mutation {
          register(
            input: { username: "` + formData.get("username").toLowerCase() + `", email: "` + formData.get("email").toLowerCase() + `", password: "` + formData.get("password") + `" }
            ) {
              jwt
              user {
                username
                email
              }
            }
          }`
        }),
      }).then(res => res.json())
        .then(res => res.data)

      if (resp?.error?.length > 0) {
        setError(resp.error)
      } else if (resp) {
        setJwt(resp.register.jwt)

        // getting cookie exp time
        let d = new Date();
        let exp = d.setTime(d.getTime() + (24 * 60 * 60 * 1000)); // 24 hours
        let shortExp = d.setTime(d.getTime() + (15 * 60 * 1000)); // 15 minutes
        let isSSL = window.location.protocol === "https:" ? " Secure;" : "";

        document.cookie = "jwt=" + resp.register.jwt + "; expires=" + shortExp + ";" + isSSL;

        window.location.href = "/feed";
      }
    }

  }

  return (
    <React.Fragment>
      <section>
        <div className="container">
          <div className="card welcome">
            <img className="poop" src={poop} />
            {error ? <React.Fragment>
              <p className="context error message">{error}<span className="close" onClick={(e) => setError("")}>X</span></p>
            </React.Fragment> : ""}
            <form id="Register" onSubmit={(e) => handleSubmit(e)}>
              <input type="email" pattern="[a-z0-9A-Z._%+-]+@[a-z0-9A-Z.-]+\.[a-z]{2,}$" name="email" placeholder="Email"></input>
              <input type="text" name="username" placeholder="Username"></input>
              <input type="password" name="password" placeholder="Password"></input>
              <input type="password" name="cPassword" placeholder="Confirm password"></input>
              <div className="button-con space">
                <a href="/login"><button type="button" className="button">Login</button></a>
                <button type="submit" className="button blurple">Register</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
