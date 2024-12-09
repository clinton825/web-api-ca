import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleSearch = () => {
    onSearch(term);
  };

  return (
    <div style={{ display: "flex", gap: "10px", paddingBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search movies..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{ flex: "1", padding: "10px" }}
      />
      <button onClick={handleSearch} style={{ padding: "10px" }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
