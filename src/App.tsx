import { useEffect, useState } from 'react';
import './App.css';
import './App.scss';
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, Toolbar, Typography } from '@mui/material';
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
import Results from './components/Results';
import ButtonMain from './components/ButtonMain';
import Header from './components/Header';

const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1,string.length);
}

const camelCase = (string: string): string => {
  const strArr = string.split(' ');
  const camelStrArr = [];
  for (let str of strArr) {
    camelStrArr.push(str[0].toUpperCase() + str.slice(1,str.length));
    if (strArr.indexOf(str) < strArr.length - 1) { // Re-add space if not last word
      camelStrArr.push(' ')
    }
  }
  return camelStrArr.join('');
}

type Pokemon = {
  name: string,
  id: number,
  generation: number,
  imgSrc?: string
};
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
  const [revealImg, setRevealImg] = useState<boolean>(false);

  // create pool from selected generations
  const allGenerationsArr: string[] = Object.keys(Object.fromEntries(Object.entries(generations)));
  const selectedGenerations: number[] = Object.keys(Object.fromEntries(Object.entries(generations).filter(([generation, value]) => value === true))).map(genAsStr => Number.parseInt(genAsStr));

  // Select samples from generations
  const poolFromGenerations = pokemonFullList.filter(pokemon => selectedGenerations.includes(pokemon.generation));

  useEffect(() => {
    let randomNumber = Math.ceil(Math.random() * poolFromGenerations.length) - 1;
    
    if (add && pokemon.length < poolFromGenerations.length) {
      let randomPokemon = poolFromGenerations[randomNumber];
      // if list already has ID number, get a new random number
      while (hasDuplicate(pokemon, randomPokemon.id)) {
        randomNumber = Math.ceil(Math.random() * poolFromGenerations.length);
        randomPokemon = poolFromGenerations[randomNumber];
      }

      // fetch artwork from API
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon.id}/`)
        .then(res => res.json())
        .then(
          (result) => {
            const newPokemonImg: string = result.sprites.other["official-artwork"]["front_default"];
            // Add new pokemon to list
            const newPokemon: Pokemon = {...randomPokemon, name: capitalize(poolFromGenerations[randomNumber].name), imgSrc: newPokemonImg};
            setPokemon([...pokemon, newPokemon]);
            setAdd(false);
            },
            (error) => {
              console.log('Error >>>>> ', error);
            }
        );
    }
  }, [add]);

  const handleAddPokemon = () => {
    setRevealImg(false);
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

  const handleRevealImg = () => {
    revealImg ? setRevealImg(false) : setRevealImg(true);
  }

  const pokemonList = [...pokemon].slice(0,-1).map(pokemon => <Typography variant='h6' key={pokemon.id} align='center'>{pokemon.name}</Typography>)
  
  const revealOrHideButton = () => {
    return <ButtonMain func={handleRevealImg} label={revealImg ? "Hide" : "Reveal"} />;
  }
  const currentPokemon = <Results empty={pokemon.length === 0} currentPokemon={pokemon[pokemon.length - 1]} reveal={revealImg} button={revealOrHideButton()} />

  return (
    <div className="App">
      <Header />
      <Grid container className="Main" sx={{height: '100%', my: '5vh', justifyContent: 'space-between'}}>
        <Grid item xs={12}>
          {pokemon.length === 0 && <Typography variant='h5'>Click 'Generate' to generate a Pokemon.</Typography>}
          {pokemon && currentPokemon}
        </Grid>
        <Grid item xs={12} sx={{mt: '5vh'}}>
          {pokemon.length > 1 ? <Typography variant='h4'>Generated Pokemon:</Typography> : ''}
          {pokemonList}
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
      <Toolbar sx={{bottom: 0, width: 'inherit', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
        {!Object.values(generations).includes(true) && <Typography variant='body1'>Please select a generation.</Typography>}
          <ButtonMain func={handleAddPokemon} label="Generate" />
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            {pokemon.length > 0 && <ButtonMain func={handleReset} label="Reset" />}
            <ButtonMain func={handleOptions} label="Options" />
          </Box>
      </Toolbar>
    </div>
  );
}

export default App;
