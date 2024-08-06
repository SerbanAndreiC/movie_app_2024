import styles from "./styles.module.css";


export default function Movie({movie}) {
    return (
        <div className={styles.card}>
           
            <div className={styles.titleContainer}>
              <div className={styles.title}>{movie.title}</div>
            </div>
           
            <img
              src={"https://image.tmdb.org/t/p/w400" + movie.backdrop_path}
              alt="ceva"
            />
           
        </div>
      );
    
}


