import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function CrewmateGallery() {
  const [crewmates, setCrewmates] = useState([])
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    fetchCrewmates()
  }, [])

  async function fetchCrewmates() {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
      
      if (error) throw error
      setCrewmates(data)
      calculateStatistics(data)
    } catch (error) {
      alert('Error fetching crewmates: ' + error.message)
    }
  }

  function calculateStatistics(crewmates) {
    const colorCount = {}
    let totalSpeed = 0
    let crewmateCount = crewmates.length

    crewmates.forEach((crewmate) => {
      colorCount[crewmate.color] = (colorCount[crewmate.color] || 0) + 1
      totalSpeed += crewmate.speed
    })

    const averageSpeed = crewmateCount > 0 ? totalSpeed / crewmateCount : 0
    const successMetric = averageSpeed > 25 ? "High Success" : "Low Success"

    setStatistics({
      colorCount,
      averageSpeed,
      successMetric,
    })
  }

  if (crewmates.length === 0) {
    return (
      <div className="empty-gallery">
        <h2>Your Crewmate Gallery!</h2>
        <p>You haven't made a crewmate yet!</p>
        <Link to="/create" className="button">Create one here!</Link>
      </div>
    )
  }

  return (
    <div className="crewmate-gallery">
      <h2>Your Crewmate Gallery!</h2>
      
      <div className="summary">
        <h3>Summary Statistics:</h3>
        <p><strong>Average Speed:</strong> {statistics.averageSpeed.toFixed(2)} mph</p>
        <p><strong>Success Metric:</strong> {statistics.successMetric}</p>
        <h4>Color Distribution:</h4>
        <ul>
          {Object.entries(statistics.colorCount).map(([color, count]) => (
            <li key={color}>{color}: {count}</li>
          ))}
        </ul>
      </div>

      <div className="gallery">
        {crewmates.map((crewmate) => (
          <div
            key={crewmate.id}
            className="crewmate-card"
            style={{
              boxShadow: `0px 4px 15px ${crewmate.color.toLowerCase()}`, // Set shadow color
            }}
          >
            <img
              src={crewmate.imageUrl || "https://shimmering-stardust-c75334.netlify.app/assets/crewmate.ce385016.png"} 
              alt={`${crewmate.color} Crewmate`}
              className="crewmate-image"
            />
            <h3>{crewmate.name}</h3>
            <p>Speed: {crewmate.speed} mph</p>
            <p>Color: {crewmate.color}</p>
            <p>Category: {crewmate.category}</p>
            <Link to={`/crewmate/${crewmate.id}`} className="button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
