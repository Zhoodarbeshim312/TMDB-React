import scss from "./Header.module.scss";
import { MdOutlineMovieFilter } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <Link to={"/"}>
            <span>
              <MdOutlineMovieFilter />
            </span>
            TMDB Movie
          </Link>
          <nav className={scss.nav}>
            <Link to={"/"}>Main</Link>
            <Link to={"/popular"}>Popular</Link>
            <Link to={"/topRated"}>Top Rated</Link>
            <div className={scss.form}>
              <input type="text" placeholder="Search movie..." />
              <button>
                <IoIosSearch />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
