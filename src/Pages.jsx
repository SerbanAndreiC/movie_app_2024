import { Route, Routes, BrowserRouter } from "react-router-dom";
import LogIn from "./components/Login/LogIn";
import Main from "./components/Main/Main";
import MovieDetails from "./components/MovieDetails/MovieDetails";


function Pages() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LogIn />} />
        <Route path="/details/:id" element={<MovieDetails/>} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Pages;