import React, { useEffect, useState } from "react";

// import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { capitalize } from "../helpers/helpers";
import "./PokemonDetail.scss";
import { Card } from "antd";
import { fetchData } from "../utils";

const PokemonDetail = ({ pokemons }) => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  // console.log("matc", pokemons?.id,'idd',id);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        
        const parse = await fetchData( `https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log('parse', parse)
        setPokemon(parse);
      } catch (error) {
        console.error(error);
      }
    };
    getPokemon();
  }, [id]);

  const renderTypes = () => {
    return pokemon?.types.map((type, index) => (
      <div
        className={`PokemonDetail__type PokemonDetail__type--${type?.type?.name}`}
        key={index}
      >
        {type?.type?.name}
      </div>
    ));
  };

  const renderStats = () => {
    return pokemon?.stats.map((stat, index) => (
      <div className="PokemonDetail__stat" key={index}>
        <div className="PokemonDetail__stat-name">
          {capitalize(stat?.stat?.name)}:
        </div>
        <div className="PokemonDetail__stat-bar">
          <div
            className={` ${stat?.base_stat > 70?"PokemonDetail__stat-bar-value-70":stat?.base_stat > 60?"PokemonDetail__stat-bar-value-60":"PokemonDetail__stat-bar-value"}`}
            style={{ width: `${stat?.base_stat}%` }}
          ></div>
        </div>
        <div className="PokemonDetail__stat-value">{stat?.base_stat}</div>
      </div>
    ));
  };

  return (
    <div className="PokemonDetail">
      {pokemon && (
        <>
          <div className="PokemonDetail__header">
            <div className="PokemonDetail__name">
              {capitalize(pokemon?.name)}
            </div>
            <div className="PokemonDetail__number">
              #{pokemon?.id?.toString().padStart(3, "0")}
            </div>
          </div>
          <img
            className="PokemonDetail__image"
            src={pokemon?.sprites?.other["official-artwork"]?.front_default}
            alt={pokemon?.name}
          />
          <div className="PokemonDetail__types">{renderTypes()}</div>
          <div className="PokemonDetail__stats">{renderStats()}</div>
          <Link to="/">Back to List</Link>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
