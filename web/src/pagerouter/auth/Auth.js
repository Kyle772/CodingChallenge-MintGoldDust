import React from 'react'
import poop from '../../assets/poop.png'
import './Auth.scss'
import '../../components/forms/Forms.scss'
import Login from './Login'
export default function Auth() {
  return (
    <React.Fragment>
      <section>
        <div className="container">
          <div className="card welcome">
            <img className="poop" src={poop} />
            <Login />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}
