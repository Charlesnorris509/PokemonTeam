import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { 
  simulateBattle, 
  commonTeamCompositions,
  getTypeCoverage,
  calculatePowerLevel
} from '../utils/battleMechanics';

function BattleSimulator() {
  const [userTeam, setUserTeam] = useState([]);
  const [selectedOpponent, setSelectedOpponent] = useState(0);
  const [battleResults, setBattleResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [typeCoverage, setTypeCoverage] = useState(null);
  const [powerRanking, setPowerRanking] = useState([]);

  // Fetch user's team from database
  useEffect(() => {
    fetchUserTeam();
  }, []);

  // When team or opponent changes, recalculate battle results
  useEffect(() => {
    if (userTeam.length > 0) {
      simulateBattleWithOpponent();
      calculateTeamStats();
    }
  }, [userTeam, selectedOpponent]);

  async function fetchUserTeam() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('pokemonteam')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      setUserTeam(data || []);
    } catch (error) {
      console.error('Error fetching your team:', error);
    } finally {
      setLoading(false);
    }
  }

  // Calculate battle results against selected opponent
  function simulateBattleWithOpponent() {
    if (userTeam.length === 0) {
      setBattleResults(null);
      return;
    }

    const opponentTeam = commonTeamCompositions[selectedOpponent].team;
    const results = simulateBattle(userTeam, opponentTeam);
    setBattleResults(results);
  }

  // Calculate additional team statistics
  function calculateTeamStats() {
    // Type coverage analysis
    setTypeCoverage(getTypeCoverage(userTeam));
    
    // Individual Pokémon power ranking
    const ranking = [...userTeam].map(p => ({
      ...p,
      powerLevel: calculatePowerLevel(p)
    })).sort((a, b) => b.powerLevel - a.powerLevel);
    
    setPowerRanking(ranking);
  }

  // Handle opponent team selection
  function handleOpponentChange(e) {
    setSelectedOpponent(parseInt(e.target.value));
  }

  // Render the type coverage information
  function renderTypeCoverage() {
    if (!typeCoverage) return null;
    
    // Find types that your team is strong against (have super effective moves against)
    const strongAgainst = Object.entries(typeCoverage.superEffective)
      .filter(([_, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));

    // Find types that your team is weak against (no super effective moves against or they have super effective moves against you)
    const weakAgainst = Object.entries(typeCoverage.notVeryEffective)
      .filter(([_, count]) => count > userTeam.length / 2) // More than half your team is not effective
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
      
    return (
      <div className="type-coverage">
        <h3>Type Coverage Analysis</h3>
        
        <div className="coverage-section">
          <h4>Strong Against</h4>
          {strongAgainst.length > 0 ? (
            <ul className="type-list">
              {strongAgainst.map(({ type, count }) => (
                <li key={type}>
                  <span className={`type-badge ${type.toLowerCase()}`}>{type}</span>
                  <span className="count-badge">{count} Pokémon</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No particular type advantages found.</p>
          )}
        </div>
        
        <div className="coverage-section">
          <h4>Weak Against</h4>
          {weakAgainst.length > 0 ? (
            <ul className="type-list">
              {weakAgainst.map(({ type, count }) => (
                <li key={type}>
                  <span className={`type-badge ${type.toLowerCase()}`}>{type}</span>
                  <span className="count-badge">{count} Pokémon</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No major type weaknesses found.</p>
          )}
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading team data...</div>;
  }

  if (userTeam.length === 0) {
    return (
      <div className="battle-simulator empty-team">
        <h2>Battle Simulator</h2>
        <p>You don't have any Pokémon in your team yet. Add some Pokémon to simulate battles!</p>
        <Link to="/add" className="cta-button">Add Pokémon</Link>
      </div>
    );
  }

  return (
    <div className="battle-simulator">
      <h2>Battle Simulator</h2>
      
      <div className="battle-section">
        <div className="team-section user-team">
          <h3>Your Team ({userTeam.length} Pokémon)</h3>
          <div className="team-power">
            <span className="power-label">Team Power:</span>
            <span className="power-value">{userTeam.reduce((total, p) => total + calculatePowerLevel(p), 0)}</span>
          </div>
          <div className="pokemon-list">
            {powerRanking.map((pokemon) => (
              <div key={pokemon.id} className="pokemon-battle-card">
                <div className="pokemon-name">{pokemon.name}</div>
                <div className="pokemon-details">
                  <span className={`type-badge ${pokemon.type.toLowerCase()}`}>{pokemon.type}</span>
                  <span className="level-badge">Lv. {pokemon.level}</span>
                </div>
                <div className="power-meter">
                  <div className="power-label">Power</div>
                  <div className="power-bar">
                    <div 
                      className="power-fill" 
                      style={{ width: `${Math.min(pokemon.powerLevel, 100)}%` }}
                    ></div>
                  </div>
                  <div className="power-value">{pokemon.powerLevel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="vs-section">
          <div className="vs-icon">VS</div>
          {battleResults && (
            <div className="win-probability">
              <div className="probability-label">Win Chance</div>
              <div className="probability-value">{battleResults.winProbability}%</div>
              <div className="probability-bar">
                <div 
                  className="probability-fill"
                  style={{ width: `${battleResults.winProbability}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="team-section opponent-team">
          <div className="opponent-selector">
            <label htmlFor="opponent-select">Select Opponent:</label>
            <select 
              id="opponent-select" 
              value={selectedOpponent} 
              onChange={handleOpponentChange}
            >
              {commonTeamCompositions.map((composition, index) => (
                <option key={index} value={index}>
                  {composition.name} ({composition.team.length} Pokémon)
                </option>
              ))}
            </select>
          </div>
          
          <h3>{commonTeamCompositions[selectedOpponent].name}</h3>
          <p className="opponent-description">{commonTeamCompositions[selectedOpponent].description}</p>
          
          <div className="team-power">
            <span className="power-label">Team Power:</span>
            <span className="power-value">
              {commonTeamCompositions[selectedOpponent].team.reduce((total, p) => total + calculatePowerLevel(p), 0)}
            </span>
          </div>
          
          <div className="pokemon-list">
            {commonTeamCompositions[selectedOpponent].team.map((pokemon, index) => (
              <div key={index} className="pokemon-battle-card opponent">
                <div className="pokemon-name">{pokemon.name}</div>
                <div className="pokemon-details">
                  <span className={`type-badge ${pokemon.type.toLowerCase()}`}>{pokemon.type}</span>
                  <span className="level-badge">Lv. {pokemon.level}</span>
                </div>
                <div className="power-meter">
                  <div className="power-label">Power</div>
                  <div className="power-bar">
                    <div 
                      className="power-fill" 
                      style={{ width: `${Math.min(calculatePowerLevel(pokemon), 100)}%` }}
                    ></div>
                  </div>
                  <div className="power-value">{calculatePowerLevel(pokemon)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="battle-analysis">
        <h3>Battle Analysis</h3>
        {battleResults ? (
          <div className="analysis-details">
            <div className="analysis-item">
              <span className="analysis-label">Type Advantage:</span>
              <span className="analysis-value">
                {battleResults.userTeamAdvantage > battleResults.opponentTeamAdvantage ? (
                  <span className="positive">+{(battleResults.userTeamAdvantage - battleResults.opponentTeamAdvantage).toFixed(1)}%</span>
                ) : (
                  <span className="negative">{(battleResults.userTeamAdvantage - battleResults.opponentTeamAdvantage).toFixed(1)}%</span>
                )}
              </span>
            </div>
            
            <div className="analysis-item">
              <span className="analysis-label">Power Comparison:</span>
              <span className="analysis-value">
                {battleResults.userTeamPower > battleResults.opponentTeamPower ? (
                  <span className="positive">+{battleResults.userTeamPower - battleResults.opponentTeamPower} points</span>
                ) : (
                  <span className="negative">{battleResults.userTeamPower - battleResults.opponentTeamPower} points</span>
                )}
              </span>
            </div>
            
            <div className="analysis-item">
              <span className="analysis-label">Team Size Factor:</span>
              <span className="analysis-value">
                {userTeam.length >= commonTeamCompositions[selectedOpponent].team.length ? (
                  <span className="positive">Advantage</span>
                ) : (
                  <span className="negative">Disadvantage</span>
                )}
              </span>
            </div>
          </div>
        ) : (
          <p>Select an opponent team to see battle analysis.</p>
        )}
      </div>
      
      {renderTypeCoverage()}
      
      <div className="battle-recommendations">
        <h3>Team Recommendations</h3>
        {typeCoverage && (
          <div className="recommendations-list">
            {userTeam.length < 6 && (
              <div className="recommendation">
                <span className="recommendation-icon">➕</span>
                <span className="recommendation-text">Your team has {userTeam.length} Pokémon. Consider adding more Pokémon (up to 6) for better coverage.</span>
              </div>
            )}
            
            {Object.entries(typeCoverage.superEffective).filter(([_, count]) => count === 0).length > 8 && (
              <div className="recommendation">
                <span className="recommendation-icon">⚠️</span>
                <span className="recommendation-text">Your team has limited type coverage. Consider adding Pokémon with different types.</span>
              </div>
            )}
            
            {userTeam.length > 1 && 
             userTeam.filter(p => p.level > 50).length === 0 && (
              <div className="recommendation">
                <span className="recommendation-icon">📈</span>
                <span className="recommendation-text">Train your Pokémon to higher levels to improve your battle chances.</span>
              </div>
            )}
            
            {userTeam.filter(p => p.category === 'Legendary').length === 0 && (
              <div className="recommendation">
                <span className="recommendation-icon">⭐</span>
                <span className="recommendation-text">Consider adding Legendary Pokémon to significantly increase team power.</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="battle-actions">
        <Link to="/team" className="back-btn">Back to My Team</Link>
        <Link to="/add" className="edit-btn">Add New Pokémon</Link>
      </div>
    </div>
  );
}

export default BattleSimulator;
