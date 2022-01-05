import React, { useState } from 'react'
import Form from './Form'
import Goal from './Goal'
import { initializeApp } from '@firebase/app'
import { firebaseConfig } from '../firebase'

import { getAuth } from 'firebase/auth'
import { useEffect } from 'react/cjs/react.development'

// initialize firebase app
initializeApp(firebaseConfig)

// init services
const auth = getAuth()

const GoalDisplay = () => {
  const [userCred, setUserCred] = useState({})
  const [goals, setGoals] = useState([])

  // dont need this useEffect, just to see the user details
  useEffect(() => {
    setUserCred(auth.currentUser)
    return () => {}
  }, [])

  return (
    <div>
      <h1>Goals to be displayed here upon login</h1>
      <h2>Current signed in user: {userCred.displayName}</h2>
      <Form
        setGoals={setGoals}
        goals={goals}
        currentUserUID={auth.currentUser.uid}
      />
      <div className='gaols-container'>
        <ul className='goal-list'>
          {goals.map((goal, index) => (
            <Goal
              key={index}
              text={goal.text}
              completed={goal.completed}
              userId={goal.userId}
              goalId={goal.goalId}
              goals={goals}
              setGoals={setGoals}
              goal={goal}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GoalDisplay
