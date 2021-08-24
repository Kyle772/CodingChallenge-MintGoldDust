import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../../context/UserData';

export default function Logout() {
  let { setJwt } = useContext(UserDataContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      setJwt(null)
      window.location.href = "/login";
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <section>
        <div className="container">
          <p className="error message">You've been logged out!</p>
        </div>
      </section>
    </React.Fragment>
  )
}
