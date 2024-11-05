import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function CreateCrewmate() {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Warrior') // Set a default category
  const [speed, setSpeed] = useState('')
  const [color, setColor] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .insert([{ name, category, speed: parseFloat(speed), color }])
      
      if (error) throw error
      navigate('/gallery')
    } catch (error) {
      alert('Error creating crewmate: ' + error.message)
    }
  }

  // Define attribute restrictions based on the selected category
  const categories = {
    Warrior: { speedRange: [5, 50], colors: ['Red', 'Green', 'Blue'] },
    Mage: { speedRange: [1, 20], colors: ['Purple', 'Yellow', 'Blue'] },
  }

  const restrictedColors = categories[category]?.colors || []
  const [minSpeed, maxSpeed] = categories[category]?.speedRange || [1, 100]

  return (
    <div className="create-crewmate">
      <h2>Create a New Crewmate</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Warrior">Warrior</option>
            <option value="Mage">Mage</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="speed">Speed (mph):</label>
          <input
            type="number"
            id="speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
            min={minSpeed}
            max={maxSpeed}
          />
          <small>Speed range for {category}: {minSpeed} - {maxSpeed}</small>
        </div>
        <div className="form-group">
          <label>Color:</label>
          <div className="radio-group">
            {restrictedColors.length > 0 ? (
              restrictedColors.map((c) => (
                <label key={c}>
                  <input
                    type="radio"
                    value={c}
                    checked={color === c}
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
                  {c}
                </label>
              ))
            ) : (
              <p>No colors available for this category.</p>
            )}
          </div>
        </div>
        <button type="submit" className="button">Create Crewmate</button>
      </form>
    </div>
  )
}
