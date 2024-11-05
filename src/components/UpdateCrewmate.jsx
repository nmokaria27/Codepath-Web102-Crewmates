import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function UpdateCrewmate() {
  const [name, setName] = useState('')
  const [speed, setSpeed] = useState('')
  const [color, setColor] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCrewmate()
  }, [id])

  async function fetchCrewmate() {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      setName(data.name)
      setSpeed(data.speed)
      setColor(data.color)
    } catch (error) {
      alert('Error fetching crewmate: ' + error.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const { error } = await supabase
        .from('crewmates')
        .update({ name, speed: parseFloat(speed), color })
        .eq('id', id)
      
      if (error) throw error
      navigate(`/crewmate/${id}`)
    } catch (error) {
      alert('Error updating crewmate: ' + error.message)
    }
  }

  return (
    <div className="update-crewmate">
      <h2>Update Your Crewmate :)</h2>
      <img src={`/crewmate-group.png`} alt="Crewmate Group" className="crewmate-group" />
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
          <label htmlFor="speed">Speed (mph):</label>
          <input
            type="number"
            id="speed"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            required
            step="0.1"
          />
        </div>
        <div className="form-group">
          <label>Color:</label>
          <div className="radio-group">
            {['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'].map((c) => (
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
            ))}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="button">Update Crewmate</button>
          <button type="button" className="button delete" onClick={() => navigate(`/crewmate/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}