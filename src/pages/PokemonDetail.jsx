import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  async function fetchPokemon() {
    try {
      setLoading(true);
        const { data, error } = await supabase
        .from('pokemonteam')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
      alert('Error fetching Pokémon details. Please try again.');
      navigate('/team');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="loading">Loading Pokémon details...</div>;
  }

  if (!pokemon) {
    return <div className="error">Pokémon not found.</div>;
  }

  // Generate a fun fact based on the Pokémon type
  const getFunFact = (type) => {
    const facts = {
      'Normal': 'Normal-type Pokémon are typically adaptable and can learn a wide variety of moves.',
      'Fire': 'Fire-type Pokémon are known for their passion and offensive power!',
      'Water': 'Water-type Pokémon can dive deep in the ocean and withstand extreme water pressure.',
      'Electric': 'Electric-type Pokémon can generate electricity from their cheeks or other body parts!',
      'Grass': 'Grass-type Pokémon often have healing abilities and can photosynthesize.',
      'Ice': 'Ice-type Pokémon can survive in extremely cold temperatures.',
      'Fighting': 'Fighting-type Pokémon train their bodies rigorously every day.',
      'Poison': 'Poison-type Pokémon are immune to being poisoned themselves.',
      'Ground': 'Ground-type Pokémon are immune to electric attacks!',
      'Flying': 'Flying-type Pokémon can soar high above the clouds.',
      'Psychic': 'Psychic-type Pokémon have powerful mental abilities and some can see the future.',
      'Bug': 'Bug-type Pokémon typically evolve earlier than other types.',
      'Rock': 'Rock-type Pokémon have excellent defense against physical attacks.',
      'Ghost': 'Ghost-type Pokémon can pass through walls and solid objects.',
      'Dragon': 'Dragon-type Pokémon are often considered the most powerful and majestic of all types.',
      'Dark': 'Dark-type Pokémon are immune to psychic attacks and often have tricky abilities.',
      'Steel': 'Steel-type Pokémon have the most resistances of any type!',
      'Fairy': 'Fairy-type Pokémon are immune to dragon attacks and often have magical powers.'
    };
    
    return facts[type] || 'This Pokémon is very special!';
  };

  // Get category description
  const getCategoryDescription = (category) => {
    if (!category) return null;
    
    const descriptions = {
      'Starter': 'Starter Pokémon are the first companions given to new trainers at the beginning of their journey.',
      'Legendary': 'Legendary Pokémon are extremely rare and powerful creatures often featured in myths and legends.',
      'Fossil': 'Fossil Pokémon are ancient species that have been resurrected from fossils using advanced technology.',
      'Evolution': 'Evolution Pokémon have undergone transformations to become stronger versions of themselves.',
      'Wild': 'Wild Pokémon are commonly found in their natural habitats throughout various regions.'
    };
    
    return descriptions[category] || null;
  };

  return (
    <div className="pokemon-detail">
      <div className="pokemon-header">
        <h2>{pokemon.name}</h2>
        <p className="species">{pokemon.species}</p>
      </div>
      
      <div className="pokemon-stats">
        <div className="stat">
          <span className="stat-label">Type:</span>
          <span className={`type-badge ${pokemon.type.toLowerCase()}`}>{pokemon.type}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Level:</span>
          <span className="stat-value">{pokemon.level}</span>
        </div>
        {pokemon.category && (
          <div className="stat">
            <span className="stat-label">Category:</span>
            <span className="stat-value">{pokemon.category}</span>
          </div>
        )}
      </div>
      
      <div className="pokemon-fun-fact">
        <h3>Fun Fact</h3>
        <p>{getFunFact(pokemon.type)}</p>
      </div>
      
      {pokemon.category && getCategoryDescription(pokemon.category) && (
        <div className="pokemon-category-info">
          <h3>About {pokemon.category} Pokémon</h3>
          <p>{getCategoryDescription(pokemon.category)}</p>
        </div>
      )}
      
      <div className="pokemon-actions">
        <Link to={`/edit/${pokemon.id}`} className="edit-btn">Edit Pokémon</Link>
        <Link to="/team" className="back-btn">Back to Team</Link>
      </div>
    </div>
  );
}

export default PokemonDetail;
