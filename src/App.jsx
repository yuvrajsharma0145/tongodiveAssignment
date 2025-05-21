import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GetApi from './GetApi'
import CreateUser from './CreateUser'

function App() {


  return (
    <>
      <div>
        <h3>Api fetching</h3>

        <GetApi />
        <CreateUser />
      </div>

    </>
  )
}

export default App
