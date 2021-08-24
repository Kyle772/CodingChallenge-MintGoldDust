import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Auth from '../pagerouter/auth/Auth'
import Logout from '../pagerouter/auth/Logout'
import Register from '../pagerouter/auth/Register'
import Feed from '../pagerouter/feed/Feed'
import SingleFeed from '../pagerouter/feed/SingleFeed'
import Profile from '../pagerouter/profile/Profile'
import Me from '../pagerouter/profile/Me'
import FourOFour from '../pagerouter/fourofour/FourOFour'
import RoleLocked from '../utilities/RoleLocked'

export default function Pagerouter() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/"><Auth /></Route>
        <Route exact path="/login"><Auth /></Route>
        <Route exact path="/logout"><Logout /></Route>
        <Route exact path="/register"><Register /></Route>
        <Route exact path="/feed/post/:pid"><RoleLocked role="authenticated" redir={Auth}>
          <SingleFeed />
        </RoleLocked></Route>
        <Route exact path="/feed"><RoleLocked role="authenticated" redir={Auth}>
          <Feed />
        </RoleLocked></Route>
        <Route exact path="/profile"><RoleLocked role="authenticated" redir={Auth}>
          <Profile />
        </RoleLocked></Route>
        <Route exact path="/profile/me"><RoleLocked role="authenticated" redir={Auth}>
          <Me />
        </RoleLocked></Route>
        <Route exact path="/profile/:pid"><RoleLocked role="authenticated" redir={Auth}>
          <Profile />
        </RoleLocked></Route>
        <Route path="*"><FourOFour /></Route>
      </Switch>
    </React.Fragment>
  )
}
