import { useEffect, useState } from 'react';
import './App.css';

const totalPokemonCount = 1015;

function App() {
  const [pokemon, setPokemon] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    const randomNumber = Math.ceil(Math.random()*totalPokemonCount);
      if (!reset) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}/`)
          .then(res => res.json())
          .then(
            (result) => {
              setPokemon(result.name);
              console.log(result.name);
            },
            (error) => {
              console.log('Error >>>>> ', error);
            }
          )
      }
  }, [reset])
  
  return (
    <div className="App">
      <p>{pokemon}</p>
    </div>
  );
}

export default App;
