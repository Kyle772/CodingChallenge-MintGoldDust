import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Auth from '../pagerouter/auth/Auth'
import Feed from '../pagerouter/feed/Feed'
import Profile from '../pagerouter/profile/Profile'

export default function Pagerouter() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/"><Auth /></Route>
        <Route exact path="/feed"><Feed /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/profile/:pid"><Profile /></Route>
      </Switch>
    </React.Fragment>
  )
}
