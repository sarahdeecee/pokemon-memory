import { useEffect, useState } from 'react';
import './App.css';
import './App.scss';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@mui/material';
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
import Actions from './components/Actions';
import DialogOptions from './components/DialogOptions';

const capitalize = (string: string): string => {
  return string[0].toUpperCase() + string.slice(1,string.length);
}

const camelCase = (string: string): string => {
  const strArr = string.split(/-| /);
  const camelStrArr = [];
  for (let str of strArr) {
    camelStrArr.push(capitalize(str));
    if (strArr.indexOf(str) < strArr.length - 1) { // Re-add space if not last word
      camelStrArr.push(' ');
    }
  }
  return camelStrArr.join('');
}

type Pokemon = {
  name: string,
  id: number,
  generation: number,
  types?: string[],
  imgSrc?: string,
};

type GenSelect = {
  [key: string]: boolean
}

type DialogSet = {
  content: string,
  open: boolean
}

const hasDuplicate = (pokemonList: Pokemon[], pokemonId: number): boolean => {
  return (pokemonList.find(pokemon => pokemon.id === pokemonId)) ? true : false;
}

const pokemonFullList = [...pokemonGen1, ...pokemonListGen2, ...pokemonListGen3, ...pokemonListGen4, ...pokemonListGen5, ...pokemonListGen6, ...pokemonListGen7, ...pokemonListGen8, ...pokemonListGen9];
const totalPokemonCount = pokemonFullList.length;

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
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
  const [dialog, setDialog] = useState<DialogSet>({
    content: '',
    open: false
  });
  const [revealImg, setRevealImg] = useState<boolean>(false);

  // create pool from selected generations
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
            const newPokemonTypesArr: {slot: number, type: {name: string, url: string}}[] = result.types;
            const newPokemonTypes: string[] = newPokemonTypesArr.map(typeObj => camelCase(typeObj.type.name));
            // Add new pokemon to list
            const newPokemon: Pokemon = {...randomPokemon, name: camelCase(poolFromGenerations[randomNumber].name), imgSrc: newPokemonImg, types: newPokemonTypes};
            setCurrentPokemon(newPokemon);
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
    handleDialogClose();
    setPokemon([]);
    setCurrentPokemon(null);
    setAdd(false);
  }

  const handleDialog = (content: string) => {
    if (content === 'reset') {
      setDialog({...dialog, content: 'reset', open: true})
    } else if (content === 'select') {
      setDialog({...dialog, content: 'select', open: true})
    }
  }

  const handleDialogClose = () => {
    setDialog({...dialog, open: false});
  }

  const handleRevealImg = () => {
    revealImg ? setRevealImg(false) : setRevealImg(true);
  }

  const handleSelectPokemon = (id: number): void => {
    const selectedPokemon = pokemon.find(pokemon => pokemon.id === id);
    setCurrentPokemon(selectedPokemon ?? null);
  }

  const pokemonList = pokemon.map(pokemon => <Typography variant='h6' key={pokemon.id} align='center' onClick={() => handleSelectPokemon(pokemon.id)}>{pokemon.name}</Typography>);
  
  const revealOrHideButton = () => {
    return <ButtonMain func={handleRevealImg} label={revealImg ? "Hide" : "Reveal"} />;
  }
  const pokemonResults = <Results empty={pokemon.length === 0} currentPokemon={currentPokemon} reveal={revealImg} button={revealOrHideButton()} />

  return (
    <div className="App">
      <Header />
      <Grid container className="Main" sx={{height: '100%', my: '5vh', justifyContent: 'space-between'}}>
        <Grid item xs={12}>
          {pokemon.length === 0 && <Typography variant='h5'>Click 'Generate' to generate a Pokemon.</Typography>}
          {pokemonResults}
        </Grid>
        <Actions generations={generations} pokemon={pokemon} add={handleAddPokemon} reset={handleReset} options={handleDialog} />
        <Grid item xs={12} sx={{mt: '2vh', mb: '5vh'}}>
          {pokemon.length > 0 ? <Typography variant='h4'>Generated Pokemon:</Typography> : ''}
          {pokemonList}
        </Grid>
      </Grid>
      <DialogOptions handleDialogClose={handleDialogClose} dialog={dialog} handleReset={handleReset} generations={generations} setGenerations={setGenerations} />
    </div>
  );
}

export default App;
