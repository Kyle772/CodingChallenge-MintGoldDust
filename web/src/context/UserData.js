import React, { createContext, useEffect, useState } from 'react';
import Sidebar from '../app/sidebar/Sidebar.js';
export const UserDataContext = createContext();

export const UserDataContextProvider = (props) => {
  let [jwt, setJwt] = useState(null)
  let [userData, setUserData] = useState(null)
  let [error, setError] = useState("")
  let [updateUserData, setUpdateUserData] = useState(0)
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    function getCookie(name) {
      var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      let cookievalue = v ? v[2].toString() : null
      return cookievalue
    }

    setJwt(getCookie("jwt"))
  }, [document.cookie])

  useEffect(() => {
    async function getUserData(token) {
      let bearer = 'Bearer ' + token;
      let url = "/api/users/me";
      let result = await fetch(url, {
        method: 'GET',
        withCredentials: true,
        headers: {
          'Authorization': bearer
        }
      })
        .then(result => result.json());
      if (result !== null) {
        setIsReady(true)
        if (!result.error) {
          setUserData(result)
          setError("")
        } else {
          setUserData(false)
          setError("Please login again")
        }
      } else {
        setUserData(false)
        setError("Authentication service may be down; please check back later")
        setIsReady(true)
      }
    }

    if (jwt) {
      getUserData(jwt)
    } else {
      setUserData(false)
      setIsReady(true)
    }
  }, [jwt, updateUserData])

  return (<UserDataContext.Provider value={{ jwt: jwt, userData: userData, isReady: isReady, updateUserData: updateUserData, setUpdateUserData: setUpdateUserData }}>
    {error !== "" ? <React.Fragment>
      <Sidebar type={userData && userData.role ? userData.role.type : ""}></Sidebar>
      <section id="dashboard"><p className="context error message">{error}</p></section>
    </React.Fragment> : ""}
    {props.children}
  </UserDataContext.Provider>);
}

export default UserDataContextProvider;