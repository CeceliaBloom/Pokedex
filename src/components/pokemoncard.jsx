import { useState, useEffect } from "react";
import "./pokemoncard.css"

export default function PokemonCard({ pokemonList }){
const [list,setList]=useState([]);

  /*function getPokemon(){
    fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json")
    .then((response)=>response.json())
    .then((data)=>setList(data.pokemon))
    .catch((error)=>console.error(error));
  }*/


  useEffect(() => {
   //getPokemon();
  }, []);
  
  return(
    <>  
      
  <div className="cardcontain">
    <div className="cardback">
    {pokemonList.map((pokemon) => (
      <div key={pokemon.id} className="pokemon-container">
        <div className="pokeimg">
          <img src={`${pokemon.img}`}/>
        </div>
        <div className="pokemoninfo">
          <ul>
            <li className="pokenum">{pokemon.num}</li>
            <li className="pokename">{pokemon.name}</li>
            <li className="head">Type:</li>
            <li className="poketype">{pokemon.type.join(", ")}</li>
            <li className="head">Weakneses:</li>
            <li className="pokeweak">{pokemon.weaknesses.join(", ")}</li>
          </ul>
        </div>
      </div>
    ))}
  </div>
  </div>


    </>
  )
}
