import React from 'react'
import { firebaseConfig } from '../firebase'
import { initializeApp } from '@firebase/app'

import { deleteDoc, doc, getFirestore } from 'firebase/firestore'

// initialize firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

const Goal = ({ text, userId, goalId }) => {
  const handleDelete = (e) => {
    // setGoals(goals.filter((el) => el.goalId !== goal.goalId))
    const docRef = doc(db, 'goals', goalId)
    deleteDoc(docRef).then(() => {
      console.log(`Goal id: ${goalId} '${text}' has been deleted`)
    })
  }

  return (
    <div className='goal-container'>
      <li className='goal-item'>
        <p className='goal-text'>{text}</p>
        <button className='complete-btn'>
          <i className='fas fa-check'></i>
        </button>
        <button onClick={handleDelete} className='delete-btn'>
          <i className='far fa-trash-alt'></i>
        </button>
      </li>
    </div>
  )
}

export default Goal
