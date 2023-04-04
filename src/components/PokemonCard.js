import React from "react";
// import "./PokemonCard.scss";

function PokemonCard({ pokemon }) {
  const { name, id, types, imageUrl } = pokemon;

  return (
    <div className="PokemonCard">
      <img src={imageUrl} alt={name} />
      <div className="PokemonCard__details">
        <h2 className="PokemonCard__name">
          #{id} {name}
        </h2>
        <div className="PokemonCard__types">
          {types.map((type) => (
            <span
              key={type}
              className={`PokemonCard__type PokemonCard__type--${type.toLowerCase()}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
