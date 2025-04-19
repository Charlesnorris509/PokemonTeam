import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <h2>Welcome to PokéTeam Builder!</h2>
        <p>Create and manage your custom Pokémon team with ease.</p>
        <div className="cta-buttons">
          <Link to="/add" className="cta-button">Add New Pokémon</Link>
          <Link to="/team" className="cta-button secondary">View My Team</Link>
        </div>      </div>
      <div className="features">
        <div className="feature">
          <h3>Create</h3>
          <p>Add your favorite Pokémon to your team with custom nicknames and attributes.</p>
          <Link to="/add" className="feature-btn">Create Pokémon</Link>
        </div>
        <div className="feature">
          <h3>Manage</h3>
          <p>Edit and update your Pokémon's details anytime.</p>
          <Link to="/team" className="feature-btn">Manage Team</Link>
        </div>
        <div className="feature">
          <h3>View</h3>
          <p>See your entire team at a glance or check individual Pokémon details.</p>
          <Link to="/team" className="feature-btn">View Team</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
