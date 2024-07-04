"use client";

import { createContext, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

export const SearchContext = createContext();

export function SearchProvider ({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  async function fetchSearchResults (e) {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?searchQuery=${searchQuery}`);
      const data = await response.json();

      router.push(`/search?searchQuery=${searchQuery}`);
      setSearchResults(data);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SearchContext.Provider value={{ 
      searchQuery, 
      setSearchQuery, 
      searchResults,
      setSearchResults,
      fetchSearchResults
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);