import React from "react";
import SearchContext from "./SearchContext";

export default function SearchContextProvider({ children }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
