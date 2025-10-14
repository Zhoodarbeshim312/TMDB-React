import { NavLink } from "react-router-dom";
import scss from "./Header.module.scss";
import { IoSearchOutline } from "react-icons/io5";
import logo from "../../../assets/images/logo.svg";
const Header = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <img src={logo} alt="img" />
          <nav className={scss.nav}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/popular">Popular</NavLink>
            <NavLink to="/top-rated">Top Rated</NavLink>
            <select>
              <option value="">Language</option>
              <option value="en">EN</option>
              <option value="ru">RU</option>
            </select>
            <div className={scss.form}>
              <input type="text" placeholder="Search movie..." />
              <button>
                <IoSearchOutline />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
