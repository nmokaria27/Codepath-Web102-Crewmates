import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function CrewmateDetails() {
  const [crewmate, setCrewmate] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const DEFAULT_IMAGE_URL = "https://shimmering-stardust-c75334.netlify.app/assets/suspect.bdfacc7e.png";

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
      setCrewmate(data)
    } catch (error) {
      alert('Error fetching crewmate: ' + error.message)
    }
  }

  if (!crewmate) return <div>Loading...</div>

  // Determine message based on speed
  const speedMessage =
    crewmate.speed > 50
      ? "Wow, this Crewmate is super fast, that will be helpful! 🏃‍♂️💨"
      : "You may want to find a Crewmate with more speed, this one is kind of slow 🤔";

  return (
    <div className="crewmate-details">
      <h1>Crewmate: {crewmate.name}</h1>
      <h2>Stats:</h2>
      <p><strong>Color:</strong> {crewmate.color}</p>
      <p><strong>Speed:</strong> {crewmate.speed} mph</p>
      <p className="speed-message">{speedMessage}</p>
      <div className="actions">
        <Link to={`/update/${crewmate.id}`} className="button">Edit Crewmate</Link>
        <button onClick={() => deleteCrewmate()} className="button delete">Delete Crewmate</button>
      </div>
      <img src={DEFAULT_IMAGE_URL} alt="Crewmate illustration" className="crewmate-image" />
    </div>
  )

  async function deleteCrewmate() {
    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      navigate('/gallery')
    } catch (error) {
      alert('Error deleting crewmate: ' + error.message)
    }
  }
}
