import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

function TeamList() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [teamRating, setTeamRating] = useState({ score: 0, rating: '', message: '' });

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    try {
      setLoading(true);
        const { data, error } = await supabase
        .from('pokemonteam')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        // Handle the case where the table might not exist yet
        if (error.code === '42P01') { // PostgreSQL code for undefined_table
          console.log('The poketeam table does not exist yet. This is normal if you haven\'t added any Pokémon.');
          setPokemon([]);
          return;
        }
        throw error;
      }
      
      setPokemon(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      // Use a more informative error message
      console.log('If this is your first time using the app, you may need to create the poketeam table in Supabase.');
    } finally {
      setLoading(false);
    }
  }

  // Calculate statistics for the team
  const calculateStats = (teamData) => {
    if (!teamData.length) {
      setStats({});
      setTeamRating({ score: 0, rating: 'N/A', message: 'Add Pokémon to see your team rating.' });
      return;
    }

    // Count Pokémon by type
    const typeCount = {};
    const categoryCount = {};
    let totalLevel = 0;
    let highestLevel = 0;
    
    teamData.forEach(p => {
      // Count types
      typeCount[p.type] = (typeCount[p.type] || 0) + 1;
      
      // Count categories
      if (p.category) {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
      }
      
      // Track levels
      totalLevel += p.level;
      highestLevel = Math.max(highestLevel, p.level);
    });
    
    const averageLevel = Math.round(totalLevel / teamData.length);
    
    // Type diversity (number of different types)
    const typeDiversity = Object.keys(typeCount).length;
    
    // Most common type
    const mostCommonType = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0];
    
    // Calculate team success rating
    const calculateTeamRating = () => {
      // Factors that influence rating:
      // - Team size (max 6)
      // - Type diversity
      // - Average level
      // - Presence of legendary Pokémon
      // - Balanced levels (standard deviation)
      
      let score = 0;
      
      // Team size rating (0-30 points)
      const sizeScore = Math.min(teamData.length, 6) * 5;
      score += sizeScore;
      
      // Type diversity rating (0-20 points)
      const diversityScore = Math.min(typeDiversity, 6) * 3.33;
      score += diversityScore;
      
      // Level rating (0-30 points)
      const levelScore = (averageLevel / 100) * 30;
      score += levelScore;
      
      // Legendary bonus (0-10 points)
      const legendaryCount = categoryCount['Legendary'] || 0;
      const legendaryScore = Math.min(legendaryCount, 2) * 5;
      score += legendaryScore;
      
      // Category variety bonus (0-10 points)
      const categoryVariety = Object.keys(categoryCount).length;
      const categoryScore = Math.min(categoryVariety, 5) * 2;
      score += categoryScore;
      
      // Round score
      score = Math.round(score);
      
      // Determine rating text
      let rating, message;
      if (score < 30) {
        rating = 'Beginner';
        message = 'Your team is just starting out. Keep catching more Pokémon!';
      } else if (score < 50) {
        rating = 'Novice';
        message = 'Your team is developing well. Try adding more type variety!';
      } else if (score < 70) {
        rating = 'Experienced';
        message = 'Your team is strong and balanced. Keep training to reach elite status!';
      } else if (score < 85) {
        rating = 'Elite';
        message = 'Your team is very powerful! You\'re ready for serious challenges!';
      } else {
        rating = 'Champion';
        message = 'Your team is championship material! Ready to take on the Pokémon League!';
      }
      
      return { score, rating, message };
    };
    
    const teamRating = calculateTeamRating();
    
    setStats({
      count: teamData.length,
      typeCount,
      categoryCount,
      averageLevel,
      highestLevel,
      typeDiversity,
      mostCommonType,
    });
    
    setTeamRating(teamRating);
  };

  if (loading) {
    return <div className="loading">Loading team...</div>;
  }

  return (
    <div className="team-list">
      <h2>My Pokémon Team</h2>
      
      {pokemon.length > 0 && (
        <div className="team-statistics">
          <h3>Team Statistics</h3>
          <div className="stats-container">
            <div className="stat-card">
              <h4>Team Size</h4>
              <p className="stat-value">{stats.count || 0} Pokémon</p>
            </div>
            <div className="stat-card">
              <h4>Average Level</h4>
              <p className="stat-value">{stats.averageLevel || 0}</p>
            </div>
            <div className="stat-card">
              <h4>Type Diversity</h4>
              <p className="stat-value">{stats.typeDiversity || 0} types</p>
            </div>
            {stats.mostCommonType && (
              <div className="stat-card">
                <h4>Most Common Type</h4>
                <p className="stat-value">
                  {stats.mostCommonType[0]} ({stats.mostCommonType[1]})
                </p>
              </div>
            )}
          </div>
          
          <div className="team-rating">
            <h3>Team Rating: {teamRating.rating}</h3>
            <div className="rating-score">
              <div className="rating-bar">
                <div 
                  className="rating-fill" 
                  style={{ width: `${Math.min(teamRating.score, 100)}%` }}
                ></div>
              </div>
              <span className="rating-number">{teamRating.score}/100</span>
            </div>
            <p className="rating-message">{teamRating.message}</p>
          </div>
        </div>
      )}
      
      {pokemon.length === 0 ? (
        <div className="empty-team">
          <p>Your team is empty. Add some Pokémon to get started!</p>
          <Link to="/add" className="cta-button">Add Pokémon</Link>
        </div>
      ) : (
        <div className="pokemon-grid">
          {pokemon.map((poke) => (
            <div key={poke.id} className="pokemon-card">
              <div className="pokemon-info">
                <h3>{poke.name}</h3>
                <p><strong>Species:</strong> {poke.species}</p>
                <p><strong>Type:</strong> {poke.type}</p>
                <p><strong>Level:</strong> {poke.level}</p>
                {poke.category && <p><strong>Category:</strong> {poke.category}</p>}
              </div>
              <div className="pokemon-actions">
                <Link to={`/pokemon/${poke.id}`} className="view-btn">View Details</Link>
                <Link to={`/edit/${poke.id}`} className="edit-btn">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamList;
