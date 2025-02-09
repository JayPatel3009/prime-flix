import { useEffect, useState } from 'react'
import './App.css'

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} has been liked: ${ hasLiked }`);
  }, [hasLiked]);

  useEffect(() => {
    console.log('Card Rendered');
  });

  return (
    <div className='card' onClick={ () => setCount(count + 1) }>
      <h2>{ title } <br /> { count || null }</h2>
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
