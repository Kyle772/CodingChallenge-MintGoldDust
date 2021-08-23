import React from 'react';
import './App.scss';
import Header from '../app/Header'
import Pagerouter from '../pagerouter/Pagerouter'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Pagerouter />
    </div>
  )
}
