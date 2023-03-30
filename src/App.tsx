import { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@mui/material';

const totalPokemonCount = 1015;
const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1,string.length);
}

type Pokemon = {name: string, id: number};

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [reset, setReset] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);

  useEffect(() => {
    setAdd(false);
    const randomNumber = Math.ceil(Math.random()*totalPokemonCount);
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)
        .then(res => res.json())
        .then(
          (result) => {
            const newPokemon = {name: capitalize(result.name), id: result.id};
            setPokemon([...pokemon, newPokemon]);
            console.log(result.name);
          },
          (error) => {
            console.log('Error >>>>> ', error);
          }
        )
  }, [add]);

  const handleAddPokemon = () => {
    setAdd(true);
  }

  const handleReset = () => {
    setReset(true);
    setPokemon([]);
    setAdd(false);
  }

  const pokemonList = pokemon.map(pokemon => <p key={pokemon.id}>{pokemon.name}</p>)
  
  return (
    <div className="App">
      <p>Pokemon from Memory</p>
      <p>{pokemonList}</p>
      <Button onClick={handleAddPokemon}>Next</Button>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}

export default App;
