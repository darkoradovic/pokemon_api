import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const fetch = () => {
    const url = "https://pokeapi.co/api/v2/pokemon"
}

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    
  );
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [loading, setLoading] = useState(true);

  /* axios.get("https://pokeapi.co/api/v2/pokemon").then(res => console.log(res.data.results)); */

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPage, {
        cancelToken: new axios.CancelToken(c => (cancel = c))
      })
      .then(res => {
        setLoading(false);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setPokemons(res.data.results.map(p => p.name));
      });
    return () => {
      cancel();
    };
    console.log();
  }, [currentPage]);

  function goToNextPage() {
    setCurrentPage(nextPage);
  }

  function goToPrevPage() {
    setCurrentPage(prevPage);
  }

  if (loading) return "Loading...";

  return (
    <div>
      {pokemons.map(pokemon => {
        return <div key={pokemon}>{pokemon}</div>;
      })}
      <Pagination
        goToNextPage={nextPage ? goToNextPage : null}
        goToPrevPage={prevPage ? goToPrevPage : null}
      />
    </div>
  );
};

export default PokemonList;
