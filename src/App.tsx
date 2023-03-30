import { useEffect, useState } from 'react';
import './App.css';
import { Button, Typography } from '@mui/material';

const totalPokemonCount = 1015;
const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1,string.length);
}

type Pokemon = {name: string, id: number};

const hasDuplicate = (pokemonList: Pokemon[], pokemonId: number): boolean => {
  (pokemonList.find(pokemon => pokemon.id === pokemonId)) ? console.log('duplicate found') : console.log('no duplicate');
  return (pokemonList.find(pokemon => pokemon.id === pokemonId)) ? true : false;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [add, setAdd] = useState<boolean>(false);

  useEffect(() => {
    let randomNumber = Math.ceil(Math.random()*totalPokemonCount);
    
    if (add && pokemon.length < totalPokemonCount) {
      while (hasDuplicate(pokemon, randomNumber) && add) {
        randomNumber = Math.ceil(Math.random()*totalPokemonCount);
      }

      fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)
        .then(res => res.json())
        .then(
          (result) => {
            const newPokemon = {name: capitalize(result.name), id: result.id};
            setPokemon([...pokemon, newPokemon]);
            console.log(result.name);
            setAdd(false);
            },
            (error) => {
              console.log('Error >>>>> ', error);
            }
          )
    }
  }, [add]);

  const handleAddPokemon = () => {
    setAdd(true);
  }

  const handleReset = () => {
    setPokemon([]);
    setAdd(false);
  }

  const pokemonList = pokemon.map(pokemon => <Typography variant='body1' key={pokemon.id} align='center'>{pokemon.name}</Typography>)
  
  return (
    <div className="App">
      <Typography variant='h3' component='h1' align='center'>Pokemon From Memory</Typography>
      {pokemonList}
      <Button onClick={handleAddPokemon}>Next</Button>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  );
}

export default App;
