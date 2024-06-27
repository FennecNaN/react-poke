import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    if (searchTerm) {
      const fetchPokemon = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
          if (!response.ok) {
            throw new Error('Pokemon no encontrado');
          }
          const data = await response.json();
          setPokemon(data);
        } catch (err) {
          setError(err.message);
          setPokemon(null);
        }
        setLoading(false);
      };

      fetchPokemon();
    } else {
      setPokemon(null);
      setError('');
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <h1>Buscador de Pokémon shiny</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Introduce el nombre"
      />
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {pokemon && (
        <div>
          <h3>{pokemon.name}</h3>
          <img src={pokemon.sprites.front_shiny} />
        </div>
      )}
    </div>
  );
}

export default App;
