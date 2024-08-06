import { useEffect, useState,useCallback } from "react";
import { Link } from "react-router-dom";
import Movie from "../Movie/Movie";
import styles from "./styles.module.css";

export default function List({movie}) {
  const [hero, setHero] = useState({});
  const [inc, setInc] = useState(951546);
  const [popular, setPopular] = useState([]);
  

  const fetchHero = useCallback( async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${inc}?api_key=3d9c99f340b79329065dd2e80e9c714e&language=en-US&page=1&append_to_response=videos`
    );
    const detailData = await data.json();
    setHero(detailData);
    console.log(detailData);
  },[inc]);


  useEffect(() => {
    fetchHero();
  }, [fetchHero]);

  const fetchPopular = useCallback (async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=3d9c99f340b79329065dd2e80e9c714e&language=en-US&page=1`
    );
    const movies = await data.json();
    setPopular(movies.results);
    console.log(movies.results);
  },[]);
  useEffect(() => {
    fetchPopular();
  },[fetchPopular]);

  return (
    <div className={styles.heroContainerEX}>
      <div className={styles.detailsPicSide}>
        <div className={styles.imgHolder}>
          <Link to={'/details/'+inc}>
            <img
              key={"h"+inc}
              src={"https://image.tmdb.org/t/p/w400" + hero.backdrop_path}
              alt="not-ok"
              className={styles.detailsImg}
            />
          </Link>
        </div>
        <div className={styles.infoHolder}>
          <div className={styles.infoHolderGrid}>
            <div className={styles.detailsText}>
              <div className={styles.title}>{hero.title}</div>
              <div className={styles.rates}>
                <div>Release date: {hero.release_date}</div>
                <div className={styles.rateElem}>
                  {" "}
                  Rank: {Math.floor(hero.vote_average) }
                </div>
                <div className={styles.rateElem}> Votes: {hero.vote_count}</div>
                {hero.budget === 0 ? (<div className={styles.rateElem}>Budget: N/A</div>):(<div className={styles.rateElem}>Budget: {hero.budget /1000000} Mil $</div>)}
                <div className={styles.rateElem}> Status: {hero.status}</div>
              </div>
            </div>
            <div className={styles.overview}>
              <div className={styles.overviewTitle}>Overview: </div>
              <p className={styles.overviewText}>{hero.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.holder}>
        <div className={styles.popularMoviesEX}>
          {popular.map((movie) => {
            return (
              <div
                onClick={() => {
                  setInc(movie.id);
                }}
              >
                <Movie key={"a"+movie.id} movie={movie} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}