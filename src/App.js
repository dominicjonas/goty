import react, { useState, useRef } from 'react'
import { initializeApp } from '@firebase/app'
import { firebaseConfig } from './firebase'

import SignIn from './auth/SignIn'
import SignOut from './auth/SignOut'

import { useAuthState } from 'react-firebase-hooks/auth'
//import { useCollectionData } from 'react-firebase-hooks/firestore'

import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

//  initialize firebase app
initializeApp(firebaseConfig)
// init services
const db = getFirestore()
const auth = getAuth()

// collection refs

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Goals Of The Year</h1>
        <SignOut />
      </header>
      <section>
        {user ? <h1>This is the users goty page</h1> : <SignIn />}
      </section>
    </div>
  )
}

export default App
