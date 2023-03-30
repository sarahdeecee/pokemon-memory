import { useEffect, useState } from 'react';
import './App.css';
import { Button, Typography } from '@mui/material';
import { pokemonGen1 } from './data/PokemonGen1';
import { pokemonListGen2 } from './data/PokemonGen2';
import { pokemonListGen3 } from './data/PokemonGen3';
import { pokemonListGen4 } from './data/PokemonGen4';
import { pokemonListGen5 } from './data/PokemonGen5';
import { pokemonListGen6 } from './data/PokemonGen6';
import { pokemonListGen7 } from './data/PokemonGen7';
import { pokemonListGen8 } from './data/PokemonGen8';
import { pokemonListGen9 } from './data/PokemonGen9';

const totalPokemonCount = 1015;
const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1,string.length);
}

type Pokemon = {name: string, id: number, generation: number};

const hasDuplicate = (pokemonList: Pokemon[], pokemonId: number): boolean => {
  (pokemonList.find(pokemon => pokemon.id === pokemonId)) ? console.log('duplicate found') : console.log('no duplicate');
  return (pokemonList.find(pokemon => pokemon.id === pokemonId)) ? true : false;
}

const inGeneration = (poolList: Pokemon[], pokemonName: string): boolean => {
  return (poolList.find(pokemon => pokemon.name === pokemonName)) ? true : false;
}

const pokemonFullList = [...pokemonGen1, ...pokemonListGen2, ...pokemonListGen3, ...pokemonListGen4, ...pokemonListGen5, ...pokemonListGen6, ...pokemonListGen7, ...pokemonListGen8, ...pokemonListGen9];

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [add, setAdd] = useState<boolean>(false);
  const [pool, setPool] = useState<Pokemon[]>(pokemonFullList);
  const [generations, setGenerations] = useState<Object>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });

  // create pool from selected generations
  const selectedGenerations: number[] = Object.keys(Object.fromEntries(Object.entries(generations).filter(([generation, value]) => value === true))).map(genAsStr => Number.parseInt(genAsStr));
  console.log('Gens: ',selectedGenerations);

  // Select samples from generations
  const poolFromGenerations = pokemonFullList.filter(pokemon => selectedGenerations.includes(pokemon.generation));

  // useEffect(() => {
  //   let randomNumber = Math.ceil(Math.random()*totalPokemonCount);
    
  //   if (add && pokemon.length < totalPokemonCount) {
  //     // if list already has ID number, get a new random number
  //     while (hasDuplicate(pokemon, randomNumber)) {
  //       randomNumber = Math.ceil(Math.random()*totalPokemonCount);
  //     }

  //     fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)
  //       .then(res => res.json())
  //       .then(
  //         (result) => {
  //           const newPokemon = {name: capitalize(result.name), id: result.id};
  //           setPokemon([...pokemon, newPokemon]);
  //           console.log(result.name);
  //           setAdd(false);
  //           },
  //           (error) => {
  //             console.log('Error >>>>> ', error);
  //           }
  //         )
  //   }
  // }, [add]);

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
      <Button>Options</Button>
    </div>
  );
}

export default App;
