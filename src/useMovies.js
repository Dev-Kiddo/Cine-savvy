import { useState, useEffect } from "react";

const KEY = "5e93def5";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      // to fix the race condition-trigger multiple API request - using native browser API - abort controller - used in cleanup function to fix
      // This is actually a browser API
      const controller = new AbortController();

      callback?.(); //so in this callback is handeling the handle close movie()

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          // so here we need to pass controller as second arguement in fetch.
          const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

          if (!res.ok) throw new Error("Something Went Wrong with Fetch Movies");

          const data = await res.json();

          if (data?.Response === "False") throw new Error("Movie Not Found");

          setMovies(data.Search);
          setError("");
        } catch (error) {
          if (error.name !== "AbortError") {
            console.error(error.message);
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
          // setError("");
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // if one movie is searched - again we search the old one opend needts to close. we here handleCloseMovie() called.
      //   handleCloseMovie(); instead of this we have created a callback and called in the top
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
