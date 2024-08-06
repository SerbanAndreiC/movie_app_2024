import styles from "./styles.module.css";
import Browse from "../Browse/Browse";
import List from "../List/List";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import { useState } from "react";
import Background from "../Background/Background";
import profile from "../../img/profile.jpg";
import angle from "../../img/col.svg";
import search3 from "../../img/search.png";
import home from "../../img/home.png";
import fav from "../../img/fav.png";
import thumb from "../../img/key.png";
import Search from "../Search/Search";

export default function Main() {
  const [openMenu, setOpenMenu] = useState(true);
  const [openBrowse, setOpenBrowse] = useState(true);
  const [openList, setOpenList] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const openB = () => {
    setOpenBrowse(true);
    setOpenSearch(false);
    setOpenList(false);
    setOpenProfile(false);
  };
  const openS = () => {
    setOpenSearch(true);
    setOpenBrowse(false);
    setOpenList(false);
    setOpenProfile(false);
  };
  const openL = () => {
    setOpenBrowse(false);
    setOpenSearch(false);
    setOpenList(true);
    setOpenProfile(false);
  };
  const openP = () => {
    setOpenBrowse(false);
    setOpenSearch(false);
    setOpenList(false);
    setOpenProfile(true);
  };
  const navHandler = () => {
    setOpenMenu(!openMenu);
    console.log(openMenu);
  };

  return (
    <div className={styles.main}>
      <Background/>
      <div className={styles.menu}>
        <div className={!openMenu ? styles.option : styles.optionSample}>
          <img
            src={profile}
            alt="poza"
            className={styles.profile}
            onClick={openP}
          />
          <span
            className={!openMenu ? styles.description : styles.descriptionNone} onClick={openP}
          >
            Profil
          </span>
        </div>
        <div className={!openMenu ? styles.option : styles.optionSample}>
          <img
            src={home}
            alt="button"
            className={styles.menuButton}
            onClick={openB}
          />
          <span
            className={!openMenu ? styles.description : styles.descriptionNone} onClick={openB}
          >
            Browse
          </span>
        </div>
        <div className={!openMenu ? styles.option : styles.optionSample}>
          <img
            src={search3}
            alt="button"
            className={styles.menuButton}
            onClick={openS}
          />
          <span
            className={!openMenu ? styles.description : styles.descriptionNone} onClick={openS}
          >
            Search
          </span>
        </div>
        <div className={!openMenu ? styles.option : styles.optionSample}>
          <img src={fav} alt="list" className={styles.menuButton} onClick={openL} />
          <span
            className={!openMenu ? styles.description : styles.descriptionNone} onClick={openL}
          >
            List
          </span>
        </div>
        <div className={!openMenu ? styles.option : styles.optionSample}>
          <Link to={'/login'}>
            <img src={thumb} alt="thumb" className={styles.logOutButton} />
            </Link>
            <Link to={'/login'}>
            <span
              className={
                !openMenu ? styles.description : styles.descriptionNone
              }
            >
              Sign Out
            </span>
            </Link>
          
        </div>
        <div className={!openMenu ? styles.option : styles.optionSample}>
          <img src={angle} alt="angle" className={!openMenu ?(styles.colapsButton):(styles.colapsButtonR)} onClick={navHandler} />
          <span
            className={!openMenu ? styles.description : styles.descriptionNone} onClick={navHandler}
          >
            Colaps
          </span>
        </div>
      </div>
      <div className={openMenu ? styles.data : styles.dataSmall}>
        {openProfile ? <Profile /> : ""}
        {openBrowse ? <Browse /> : ""}
        {openSearch ? <Search /> : ""}
        {openList ? <List /> : ""}
      </div>
    </div>
  );
}
