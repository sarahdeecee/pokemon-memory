import { useEffect, useState } from 'react';
import './App.css';
import './App.scss';
import { Box, Stack, Typography } from '@mui/material';
import { pokemonGen1 } from './data/PokemonGen1';
import { pokemonListGen2 } from './data/PokemonGen2';
import { pokemonListGen3 } from './data/PokemonGen3';
import { pokemonListGen4 } from './data/PokemonGen4';
import { pokemonListGen5 } from './data/PokemonGen5';
import { pokemonListGen6 } from './data/PokemonGen6';
import { pokemonListGen7 } from './data/PokemonGen7';
import { pokemonListGen8 } from './data/PokemonGen8';
import { pokemonListGen9 } from './data/PokemonGen9';
import Results from './components/Results';
import ButtonMain from './components/ButtonMain';
import Header from './components/Header';
import Actions from './components/Actions';
import DialogOptions from './components/DialogOptions';
import { Pokemon, GenSelect, DialogSet } from './types/Types';

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

const hasDuplicate = (pokemonList: Pokemon[], pokemonId: number): boolean => {
  return (pokemonList.find(pokemon => pokemon.id === pokemonId)) ? true : false;
}

const pokemonFullList = [...pokemonGen1, ...pokemonListGen2, ...pokemonListGen3, ...pokemonListGen4, ...pokemonListGen5, ...pokemonListGen6, ...pokemonListGen7, ...pokemonListGen8, ...pokemonListGen9];
// const totalPokemonCount = pokemonFullList.length;

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
  const [vetoPokemon, setVetoPokemon] = useState<Pokemon[]>([]);

  // create pool from selected generations
  const selectedGenerations: number[] = Object.keys(Object.fromEntries(Object.entries(generations).filter(([generation, value]) => value === true))).map(genAsStr => Number.parseInt(genAsStr));

  // Select samples from generations
  const poolFromGenerations = pokemonFullList.filter(pokemon => selectedGenerations.includes(pokemon.generation))
  // Add camel case to pokemon names in pool
  poolFromGenerations.forEach(pokemon => pokemon.name = camelCase(pokemon.name));
  
  const countDuplicates = (array1: any[], array2: any[]) => array1.filter(elem => array2.includes(elem)).length;
  const allPoolPulled: boolean = !(poolFromGenerations.length > (pokemon.length + vetoPokemon.length - countDuplicates(pokemon, vetoPokemon))) ? true : false;

  useEffect(() => {
    let randomNumber = Math.ceil(Math.random() * poolFromGenerations.length) - 1;
    
    if (add && !allPoolPulled) {
      let randomPokemon = poolFromGenerations[randomNumber];

      // if ID number was pulled or vetoed, get a new random number
      while (hasDuplicate([...pokemon, ...vetoPokemon], randomPokemon.id)) {
        randomNumber = Math.ceil(Math.random() * poolFromGenerations.length) - 1;
        randomPokemon = poolFromGenerations[randomNumber];
      }

      // fetch artwork from API
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon.id}/`)
        .then(res => res.json())
        .then(
          (result) => {
            // get relevant info from API
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
  }, [add, vetoPokemon]);

  const handleAddPokemon = () => {
    if (Object.values(generations).includes(true)) {
      setRevealImg(false);
      setAdd(true);
    }
  }

  const handleReset = () => {
    handleDialogClose();
    setPokemon([]);
    setVetoPokemon([]);
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
  console.log('veto: ',vetoPokemon);
  return (
    <Stack className="App" useFlexGap>
      <Header />
      <Box className="Main" sx={{padding: 3}}>
        
        {pokemon.length === 0 && <Typography variant='h5'>Click 'Generate' to generate a Pokemon.</Typography>}
        {pokemonResults}
      
        <Actions generations={generations} pokemon={pokemon} add={handleAddPokemon} reset={handleReset} options={handleDialog} allPoolPulled={allPoolPulled} />

        {pokemon.length > 0 ? <Typography variant='h4'>Generated Pokemon:</Typography> : ''}
        {pokemonList}
        
      <DialogOptions handleDialogClose={handleDialogClose} dialog={dialog} handleReset={handleReset} generations={generations} setGenerations={setGenerations} pool={poolFromGenerations} veto={vetoPokemon} setVeto={setVetoPokemon} />
      </Box>
    </Stack>
  );
}

export default App;
