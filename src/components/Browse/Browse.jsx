import styles from "./styles.module.css";
import Movie from "../Movie/Movie";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Browse() {
  var increment = 1;
  const [page, setPage] = useState(1);
  const [browse, setBrowse] = useState([]);

  const nextPage = () => {
    // increment=increment + 1
    setPage(page + 1);
    console.log(increment);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  const fetchPopular1 = useCallback(async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=3d9c99f340b79329065dd2e80e9c714e&language=en-US&page=${page}`
    );
    const movies = await data.json();
    setBrowse(movies.results);
  }, [page]);

  useEffect(() => {
    fetchPopular1();
  });

  return (
    <div className={styles.browse}>
      <div className={styles.container}>
        {browse.map((movie) => {
          return (
            <div>
              <Link to={"/details/" + movie.id}>
                <Movie key={"1" + movie.id} movie={movie} />
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles.pages}>
        {/* <p>You are currently on page : {page} </p>  */}
        <div className={styles.pageHolder}>
          {page === 1 ? (
            <button className={styles.pageButtonsDez}> Previews Page </button>
          ) : (
            <button className={styles.pageButtons} onClick={prevPage}>
              {" "}
              Previews Page{" "}
            </button>
          )}
          {page}
          <button className={styles.pageButtons} onClick={nextPage}>
            {" "}
            Next Page{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
