import { useEffect, useState } from 'react';
import './App.css';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Typography } from '@mui/material';
import { pokemonGen1 } from './data/PokemonGen1';
import { pokemonListGen2 } from './data/PokemonGen2';
import { pokemonListGen3 } from './data/PokemonGen3';
import { pokemonListGen4 } from './data/PokemonGen4';
import { pokemonListGen5 } from './data/PokemonGen5';
import { pokemonListGen6 } from './data/PokemonGen6';
import { pokemonListGen7 } from './data/PokemonGen7';
import { pokemonListGen8 } from './data/PokemonGen8';
import { pokemonListGen9 } from './data/PokemonGen9';
import Options from './components/Options';

const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1,string.length);
}

type Pokemon = {name: string, id: number, generation: number};
type GenSelect = {
  [key: string]: boolean
}

const hasDuplicate = (pokemonList: Pokemon[], pokemonId: number): boolean => {
  return (pokemonList.find(pokemon => pokemon.id === pokemonId)) ? true : false;
}

const pokemonFullList = [...pokemonGen1, ...pokemonListGen2, ...pokemonListGen3, ...pokemonListGen4, ...pokemonListGen5, ...pokemonListGen6, ...pokemonListGen7, ...pokemonListGen8, ...pokemonListGen9];
const totalPokemonCount = pokemonFullList.length;

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [add, setAdd] = useState<boolean>(false);
  const [generations, setGenerations] = useState<GenSelect>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true,
  });
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);

  // create pool from selected generations
  const allGenerationsArr: string[] = Object.keys(Object.fromEntries(Object.entries(generations)));
  const selectedGenerations: number[] = Object.keys(Object.fromEntries(Object.entries(generations).filter(([generation, value]) => value === true))).map(genAsStr => Number.parseInt(genAsStr));

  // Select samples from generations
  const poolFromGenerations = pokemonFullList.filter(pokemon => selectedGenerations.includes(pokemon.generation));

  useEffect(() => {
    let randomNumber = Math.ceil(Math.random() * poolFromGenerations.length) - 1;
    
    if (add && pokemon.length < poolFromGenerations.length) {
      // if list already has ID number, get a new random number
      while (hasDuplicate(pokemon, poolFromGenerations[randomNumber].id)) {
        randomNumber = Math.ceil(Math.random() * poolFromGenerations.length);
      }

      const newPokemon: Pokemon = {...poolFromGenerations[randomNumber], name: capitalize(poolFromGenerations[randomNumber].name)};
      setPokemon([...pokemon, newPokemon]);
      setAdd(false);
    }
  }, [add]);

  const handleAddPokemon = () => {
    setAdd(true);
  }

  const handleReset = () => {
    setPokemon([]);
    setAdd(false);
  }

  const handleOptions = () => {
    setOptionsOpen(true);
  }

  const handleOptionsClose = () => {
    setOptionsOpen(false);
  }

  const pokemonList = pokemon.map(pokemon => <Typography variant='body1' key={pokemon.id} align='center'>{pokemon.name}</Typography>)
  
  return (
    <div className="App">
      <Typography variant='h3' component='h1' align='center'>Pokemon From Memory</Typography>
      {pokemonList}
      {!Object.values(generations).includes(true) && <Typography variant='body1'>Please select a generation.</Typography>}
      <Grid>
        <Grid item>
          <Button onClick={handleAddPokemon}>Next</Button>
        </Grid>
        <Grid item>
          <Button onClick={handleReset}>Reset</Button>
        </Grid>
        <Grid item>
          <Button onClick={handleOptions}>Options</Button>
        </Grid>
      </Grid>
      <Dialog onClose={handleOptionsClose} open={optionsOpen}>
        <DialogTitle>Select Generations</DialogTitle>
        <DialogContent>
          <Options generations={generations} setGenerations={setGenerations} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOptionsClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
