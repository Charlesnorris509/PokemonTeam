import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

function EditPokemon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    type: '',
    level: 1,
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      
      setFormData({
        ...data,
        category: data.category || '' // Handle case where category might be null
      });
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      alert('Error fetching Pokémon details. Redirecting to team page.');
      navigate('/team');
    } finally {
      setLoading(false);
    }
  }

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
    setSaving(true);
    
    try {      const { error } = await supabase
        .from('pokemonteam')
        .update(formData)
        .eq('id', id);
      
      if (error) throw error;
      
      navigate(`/pokemon/${id}`);
    } catch (error) {
      console.error('Error updating Pokemon:', error);
      alert('Error updating Pokémon. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to remove this Pokémon from your team?')) {
      return;
    }
    
    try {
      setSaving(true);
        const { error } = await supabase
        .from('pokemonteam')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      navigate('/team');
    } catch (error) {
      console.error('Error deleting Pokemon:', error);
      alert('Error removing Pokémon from team. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading Pokémon data...</div>;
  }

  return (
    <div className="edit-pokemon">
      <h2>Edit Pokémon</h2>
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

        <div className="form-buttons">
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            className="delete-btn" 
            onClick={handleDelete}
            disabled={saving}
          >
            Remove from Team
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPokemon;
