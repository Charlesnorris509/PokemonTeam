import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function AddPokemon() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    type: 'Normal',
    level: 1,
    category: '' // Added category field
  });
  const [loading, setLoading] = useState(false);

  // Pokemon categories with their available types
  const pokemonCategories = {
    '': ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting',
         'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost',
         'Dragon', 'Dark', 'Steel', 'Fairy'],
    'Starter': ['Fire', 'Water', 'Grass'],
    'Legendary': ['Dragon', 'Psychic', 'Flying', 'Ice', 'Fire', 'Electric'],
    'Fossil': ['Rock', 'Ground', 'Water', 'Flying', 'Bug', 'Steel'],
    'Evolution': ['Normal', 'Fire', 'Water', 'Electric', 'Psychic', 'Fighting'],
    'Wild': ['Normal', 'Bug', 'Grass', 'Ground', 'Flying', 'Poison']
  };

  // Get available types based on selected category
  const getAvailableTypes = () => {
    return pokemonCategories[formData.category || ''] || pokemonCategories[''];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      // When category changes, reset type to the first available type for the category
      const availableTypes = pokemonCategories[value] || pokemonCategories[''];
      setFormData({
        ...formData,
        category: value,
        type: availableTypes[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'level' ? parseInt(value) : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Attempting to add Pokemon with data:', formData);
      const { data, error } = await supabase
        .from('pokemonteam')
        .insert([formData])
        .select();
      
      if (error) {
        console.error('Supabase error details:', error);
        throw error;
      }
      
      console.log('Pokemon added successfully:', data);
      navigate('/team');
    } catch (error) {
      console.error('Error adding Pokemon:', error);
      // Show more specific error message to help with debugging
      alert(`Error adding Pokemon: ${error.message || error}. Please check console for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-pokemon">
      <h2>Add New Pokémon</h2>
      <form onSubmit={handleSubmit} className="pokemon-form">
        <div className="form-group">
          <label htmlFor="name">Nickname:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="species">Species:</label>
          <input
            id="species"
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
            placeholder="e.g., Pikachu"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Any Category</option>
            <option value="Starter">Starter</option>
            <option value="Legendary">Legendary</option>
            <option value="Fossil">Fossil</option>
            <option value="Evolution">Evolution</option>
            <option value="Wild">Wild</option>
          </select>
          <small>Category will limit available types</small>
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            {getAvailableTypes().map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="level">Level (1-100):</label>
          <input
            id="level"
            type="number"
            name="level"
            min="1"
            max="100"
            value={formData.level}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Adding...' : 'Add to Team'}
        </button>
      </form>
    </div>
  );
}

export default AddPokemon;
