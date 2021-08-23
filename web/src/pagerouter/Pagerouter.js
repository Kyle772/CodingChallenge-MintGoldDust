import React from 'react'

export default function Pagerouter() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/"><Auth /></Route>
        <Route exact path="/feed"><Feed /></Route>
        <Route exact path="/profile"><Profile /></Route>
        <Route exact path="/profile/:pid"><Profile /></Route>
      </React.Fragment>
    </div>
  )
}
