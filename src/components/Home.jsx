import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to the Crewmate Creator!</h1>
      <p>
        Here is where you can create your very own set of crewmates before sending them off into space!
      </p>
      <div className="images-container">
        <img 
          src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png" 
          alt="Crewmates Group" 
          className="crewmates-image"
        />
        <img 
          src="https://shimmering-stardust-c75334.netlify.app/assets/spaceship.3d8f767c.png" 
          alt="UFO" 
          className="ufo-image"
        />
      </div>
      <Link to="/create" className="button">
        Create a Crewmate
      </Link>
    </div>
  )
}