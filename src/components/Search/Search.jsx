import styles from "./styles.module.css";
import search3 from "../../img/magnifier.svg";
import { useEffect, useState, useCallback } from "react";
import Movie from "../Movie/Movie";
import { Link } from "react-router-dom";

export default function Search() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [activeGen, setActiveGen] = useState(0);
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);

  

  const getMovies = useCallback( async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=3d9c99f340b79329065dd2e80e9c714e&language=en-US&query=${query}&page=1&include_adult=false`
    );
    const movies = await data.json();
    setResult(movies.results);
  },[query]);
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  useEffect(() => {
    getMovies();
  },[query,getMovies]);

  //filter
  const fetchPopular = useCallback(async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=3d9c99f340b79329065dd2e80e9c714e&language=en-US&page=5`
    );
    const movies = await data.json();
    setPopular(movies.results);
  }, []);

  useEffect(() => {
    fetchPopular();
  }, [fetchPopular]);

  useEffect(() => {
    if (activeGen === 0) {
      setFiltered(popular);
      return;
    }
      const filtered = popular.filter((movie) =>
        movie.genre_ids.includes(activeGen)
      );
    setFiltered(filtered);
    console.log(activeGen);
    console.log(filtered);
  },[activeGen,popular]);

  return (
    <div className={styles.search}>
     {query.length === 0 ?(
         <form onSubmit={getSearch} className={styles.searchForm}>
         <img
           src={search3}
           className={styles.label}
           alt="button"
           aria-label="input"
         />
         <input
           className={styles.searchBar}
           type="search"
           value={search}
           onChange={updateSearch}
         />
         <button className={styles.searchButton} type="submit">
           Search
         </button>
       </form>
     ):(
        <span className={styles.queryValue}> Cautare in curs: {query}</span>
     )}
      {query === "" ? (
        <div className={styles.resultHolder}>
          <div className={styles.noValue}>
            {" "}
            Introduceti titlul filmului pe care doriti sa il cautati in spatiul
            de mai sus, apoi apasati butonul de cautare{" "}
          </div>
          <div className={styles.filterOptionsContainer}>
            <div className={styles.filterMessage}>
              {" "}
              Recomandarile de astazi sunt{" "}
            </div>
            <div className={styles.filterButtons}>
              <button
                className={
                  activeGen === 0 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(0)}
              >
                All
              </button>
              <button
                className={
                  activeGen === 35 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(35)}
              >
                Comedy
              </button>
              <button
                className={
                  activeGen === 28 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(28)}
              >
                Action
              </button>
              <button
                className={
                  activeGen === 53 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(53)}
              >
                Thriller
              </button>
              <button
                className={
                  activeGen === 14 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(14)}
              >
                Fantasy
              </button>
              <button
                className={
                  activeGen === 878 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(878)}
              >
                Science Fiction
              </button>
              <button
                className={
                  activeGen === 80 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(80)}
              >
                Crime
              </button>
              <button
                className={
                  activeGen === 16 ? styles.active : styles.filterButton
                }
                onClick={() => setActiveGen(16)}
              >
                Animation
              </button>
            </div>
          </div>
          <div className={styles.holder}>
                {activeGen === 0 ? (
                    <div className={styles.filterContainer}>
                    {popular.map((movie) => {
                        return (
                          <div>
                            <Link to={"/details/" + movie.id}>
                              <Movie key={"f" + movie.id} movie={movie} />
                            </Link>
                          </div>
                        );
                      })}
                      </div>
                ):(
                    <div>
                    {filtered.length >>> 0 ? (
                        <div className={styles.filterContainer}>
                          {filtered.map((movie) => {
                            return (
                              <div>
                                <Link to={"/details/" + movie.id}>
                                  <Movie key={"f" + movie.id} movie={movie} />
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className={styles.filterContainerNR}>
                          Nu exista rezultate pentru aceasta categorie
                        </div>
                      )}
                    </div>
                )}
          </div>
        </div>
      ) : (
        <div className={styles.resultHolder}>
          <button className={styles.backButton} onClick={() => setQuery("")}>
            {" "}
            Reseteaza{" "}
          </button>
          {result.length >>> 0 ? (
            <div className={styles.container}>
              {result.map((movie) => {
                return (
                  <div>
                    <Link to={"/details/" + movie.id}>
                      <Movie key={"s" + movie.id} movie={movie} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.noResult}>
              {" "}
              Titlul cautat nu a fost gasit{" "}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
