import React from 'react'

const Goal = ({ text, completed, userId, goals, setGoals, goal, id }) => {
  const handleDelete = () => {
    setGoals(goals.filter((el) => el.goalId !== goal.goalId))
  }

  return (
    <div className='goal-container'>
      <li className='goal-item'>
        <p>{text}</p>
        <p>user id: {userId}</p>
      </li>
      <button>
        <i className='fas fa-check'></i>
      </button>
      <button onClick={handleDelete}>
        <i className='far fa-trash-alt'></i>
      </button>
    </div>
  )
}

export default Goal
