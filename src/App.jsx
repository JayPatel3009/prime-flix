import { useState } from 'react'
import PropTypes from 'prop-types'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const hasLiked = true;

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className='card' >
      <h2>{ title }</h2>
      <button onClick={ () => setHasLiked(!hasLiked) }>
        { hasLiked ? '💖' : '🤍' }
      </button>
    </div>
  )
}

const App = () => {
  return (
    <div className="card-container">
      <Card title = "Avengers: Infinity War" rating = { 5 } isCool = { true } />
      <Card title = "The Lion King" />
      <Card title = "Avatar: The Way of Water" />
    </div>
  )
}

export default App
