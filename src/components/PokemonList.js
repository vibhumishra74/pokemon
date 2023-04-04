import React from "react";
import "./PokemonList.scss";
import { useNavigate } from "react-router-dom";

function PokemonList({ pokemonList, onPokemonSelect }) {
  const navigate = useNavigate();
  return (
    <div className="PokemonList">
        
      {pokemonList.map((pokemon) => (
        <div
          key={pokemon?.name}
          className="PokemonList-item"
          onClick={() => {
            onPokemonSelect(pokemon?.name);
            navigate(`/detail/${pokemon.url.match(/\/\d+\//)[0].slice(1, -1)}`);
          }}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
              .match(/\/\d+\//)[0]
              .slice(1, -1)}.png`}
            alt={`${pokemon.name} sprite`}
          />
          {console.log("cscs", pokemon.url.match(/\/\d+\//)[0])}
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}

export default PokemonList;
