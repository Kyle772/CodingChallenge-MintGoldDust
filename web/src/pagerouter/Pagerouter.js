import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Auth from '../pagerouter/auth/Auth'
import Logout from '../pagerouter/auth/Logout'
import Register from '../pagerouter/auth/Register'
import Feed from '../pagerouter/feed/Feed'
import Profile from '../pagerouter/profile/Profile'
import FourOFour from '../pagerouter/fourofour/FourOFour'

export default function Pagerouter() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/"><Auth /></Route>
        <Route exact path="/login"><Auth /></Route>
        <Route exact path="/logout"><Logout /></Route>
        <Route exact path="/register"><Register /></Route>
        <Route exact path="/feed"><Feed /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/profile/:pid"><Profile /></Route>
        <Route path="*"><FourOFour /></Route>
      </Switch>
    </React.Fragment>
  )
}
