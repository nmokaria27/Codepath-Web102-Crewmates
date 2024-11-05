import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

// Import components
import Home from './components/Home'
import CreateCrewmate from './components/CreateCrewmate'
import CrewmateGallery from './components/CrewmateGallery'
import CrewmateDetails from './components/CrewmateDetails'
import UpdateCrewmate from './components/UpdateCrewmate'

export default function App() {
  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
          <img 
            src="https://i.redd.it/an871k4o1sn51.png" 
            alt="Crewmate Logo" 
            className="logo"
          />
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create a Crewmate!</Link></li>
            <li><Link to="/gallery">Crewmate Gallery</Link></li>
          </ul>
        </nav>
        
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetails />} />
            <Route path="/update/:id" element={<UpdateCrewmate />} />
          </Routes>
        </main>

        <img 
          src="https://shimmering-stardust-c75334.netlify.app/assets/peeking.7c0ab599.png" 
          alt="Peeking Crewmate" 
          className="peeking-crewmate"
        />
      </div>
    </Router>
  )
}