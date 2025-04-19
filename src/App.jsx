import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from './supabase.js';
import './App.css';

// Pages
import Home from './pages/Home';
import AddPokemon from './pages/AddPokemon';
import TeamList from './pages/TeamList';
import PokemonDetail from './pages/PokemonDetail';
import EditPokemon from './pages/EditPokemon';
import BattleSimulator from './pages/BattleSimulator';
// Database setup
import { setupDatabase } from './utils/setupDatabase';

function App() {
  const [dbStatus, setDbStatus] = useState({ checked: false, message: 'Checking database...' });
  
  // Check database on component mount
  useEffect(() => {
    async function checkDatabase() {
      const status = await setupDatabase();
      setDbStatus({ checked: true, message: status.message, success: status.success });
      
      if (!status.success) {
        // Show a message to the user if database setup failed
        alert(status.message);
      }
    }
    
    checkDatabase();
  }, []);
  
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>PokéTeam Builder</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/team">My Team</Link>
            <Link to="/add">Add Pokémon</Link>
            <Link to="/battle">Battle Simulator</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPokemon />} />
            <Route path="/team" element={<TeamList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/edit/:id" element={<EditPokemon />} />
            <Route path="/battle" element={<BattleSimulator />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; {new Date().getFullYear()} PokéTeam Builder</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
