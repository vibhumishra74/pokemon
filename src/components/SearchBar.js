import React, { useState } from "react";

import "./SearchBar.scss";

function SearchBar({ onSearchTermChange }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchTermChange(searchValue?.trim()?.toLowerCase());
    setSearchValue("");
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  console.log('searchValue', searchValue)

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search for a Pokemon"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
