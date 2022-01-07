import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

import { initializeApp } from '@firebase/app'
import { firebaseConfig } from './firebase'

import SignIn from './auth/SignIn'

import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from 'firebase/auth'
import GoalDisplay from './components/GoalDisplay'

//  initialize firebase app
initializeApp(firebaseConfig)
// init services
const auth = getAuth()

// collection refs

function App() {
  const [user] = useAuthState(auth)

  const titleRef = useRef()
  const yearRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.75, ease: 'power1.out' }
    })
    if (!user) {
      tl.fromTo(
        titleRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      )
      tl.fromTo(
        yearRef.current,
        { scale: 100 },
        { scale: 1, duration: 5 },
        '<'
      )
    }
    return
  })

  return (
    <div className='app container'>
      <header className='app-header'>
        <h1 className='title' ref={titleRef}>
          Goals Of The Year
        </h1>
      </header>
      <h2 className='year' ref={yearRef}>
        2022
      </h2>
      <section>
        {user ? <GoalDisplay titleRef={titleRef} /> : <SignIn />}
      </section>
    </div>
  )
}

export default App
