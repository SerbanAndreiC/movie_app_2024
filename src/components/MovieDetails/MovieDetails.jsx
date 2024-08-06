
import styles from "./styles.module.css";
import Background from "../Background/Background";
import { useParams } from "react-router-dom";
import { useEffect, useState,useCallback } from "react";
import { Link } from "react-router-dom";


function MovieDetails() {
  let params = useParams();
  const [details, setDetails] = useState({});

  const fetchDetails = useCallback (async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=3d9c99f340b79329065dd2e80e9c714e&language=en-US&page=1&append_to_response=videos`
    );
    const detailData = await data.json();
    setDetails(detailData);
  },[params.id]);

  useEffect(() => {
    fetchDetails();
  });

  return (
    <>

    <Background/>


      <div className={styles.detailPage}>
        <div className={styles.detailsPicSide}>
          <div className={styles.imgHolder}>
            <img
              src={"https://image.tmdb.org/t/p/w400" + details.backdrop_path}
              alt="not-ok"
              className={styles.detailsImg}
            />
          </div>
          <div className={styles.infoHolder}>
            <div className={styles.infoHolderGrid}>
              <div className={styles.detailsText}>
                <div className={styles.title}>{details.title}</div>
                <div className={styles.rates}>
                  <div>Release date: {details.release_date}</div>
                  <div className={styles.rateElem}>
                    {" "}
                    Rank: {Math.floor(details.vote_average)}
                  </div>
                  <div className={styles.rateElem}>
                    {" "}
                    Votes: {details.vote_count}
                  </div>
                  {details.budget === 0 ? (<div className={styles.rateElem}>Budget: N/A</div>):(<div className={styles.rateElem}>Budget: {details.budget /1000000} Mil $</div>)}
                  <div className={styles.rateElem}>
                    {" "}
                    Status: {details.status}
                  </div>
                </div>
              </div>
              <Link to={'/'}>
                <button className={styles.backButton}> Back to Browse</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.overview}>
                <div className={styles.overviewTitle}>Overview: </div>
                <p className={styles.overviewText}>{details.overview}</p>
              </div>

         {/* <iframe>{details.videos.results}</iframe>  */}
      </div>
    </>
  );
}

export default MovieDetails;
