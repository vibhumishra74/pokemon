import React, { useState, useEffect } from "react";
import PokemonLists from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import SearchBar from "./components/SearchBar";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { fetchData } from "./utils";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    async function fetchPokemonList() {
      
      const data = await fetchData("https://pokeapi.co/api/v2/pokemon?limit=151");
      console.log(data, 'data')
      setPokemonList(data.results);
    }

    fetchPokemonList();
  }, []);
  console.log(pokemonList, 'pokemonList')
  async function handlePokemonSelect(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setSelectedPokemon(data);
  }

  function handleSearchTermChange(term) {
    setSearchTerm(term);
  }

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())
  );


  return (
    <div className="App">
   

      <Routes>
        <Route
          path="/"
          element={
            <>
               <header>
        <h1>Pokemon App</h1>
        <SearchBar onSearchTermChange={handleSearchTermChange} />
      </header>
            <PokemonLists
              pokemonList={filteredPokemonList}
              onPokemonSelect={handlePokemonSelect}
              />
              </>
          }
        />
        <Route
          path="/detail/:id"
          element={<PokemonDetail pokemons={selectedPokemon} />}
        />
      </Routes>
      <footer>
        <p>hello footer</p>
      </footer>
    </div>
  );
}

export default App;
