import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useState,useCallback } from "react";
import eyeOn from "../../img/eye_on.png";
import eyeOff from "../../img/eye_off.png";
import Background from "../Background/Background";

export default function Login() {
  const [login, setLogin] = useState(true);
  const [viewPass, setViewPass] = useState(true);

const inputDef = (onClick)=> {
  onClick.preventDefault();
}

  const logHandler = useCallback( ()=>{
    setViewPass(true)
  },[])

  return (
    <div className={styles.login}>
      <Background/>
      <div className={styles.modal}>
        <span> Welcome to The Movie DataBase</span>
        {login ? <span> Please Log In</span> : <span> Please Sign Up</span>}
        <div className={styles.credentialsHolder}>
          <div className={styles.holder}>
            <span>Enter your E-mail address</span>
            <input type="email"className={styles.credentials} onClick={inputDef}/>
            <span className={styles.line}></span>
          </div>
          <div className={styles.holder}>
            <span>Enter Password</span>
            <input type={viewPass ? ("password"):("text")} className={styles.credentials}/>
            <span className={styles.line}></span>
          </div>
          {!login ? (
            <div className={styles.holder}>
              <span>Confirm Password</span>
              <input type={viewPass ? ("password"):("text")} className={styles.credentials} />
              <span className={styles.line}></span>
            </div>
          ) : (
            ""
          )}
        </div>
       <div  className={styles.eyeHolder}>
       {viewPass ? (
          <img src={eyeOn} alt="poza" className={styles.eye} onClick={()=>setViewPass(!viewPass)} />
        ) : (
          <img src={eyeOff} alt="poza" className={styles.eye}onClick={()=>setViewPass(!viewPass)} />
        )}
       </div>

        <div className={styles.buttonHolder}>
          <Link to="/">
            <button onClick={logHandler}>Login</button>
          </Link>
          {login ? (
            <button onClick={() => setLogin(!login)}>Sign Up</button>
          ) : (
            <button onClick={() => setLogin(!login)}>Back to Login</button>
          )}
        </div>
      </div>
    </div>
  );
}
