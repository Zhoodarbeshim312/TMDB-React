import scss from "./Header.module.scss";
import { MdOutlineMovieFilter } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Pivot as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { useState } from "react";
const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
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
          <h5>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </h5>
        </div>
        <div
          style={{
            display: isOpen ? "flex" : "none",
          }}
          className={scss.menu}
        >
          <Link to={"/"}>
            <span>
              <MdOutlineMovieFilter />
            </span>
            TMDB Movie
          </Link>
          <nav className={scss.nav}>
            <Link onClick={() => setOpen(false)} to={"/"}>
              Main
            </Link>
            <Link onClick={() => setOpen(false)} to={"/popular"}>
              Popular
            </Link>
            <Link onClick={() => setOpen(false)} to={"/topRated"}>
              Top Rated
            </Link>
            <div className={scss.links}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/zhoodarbeshim312/"
              >
                <FaInstagram />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Zhoodarbeshim312"
              >
                <FiGithub />
              </a>
            </div>
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
