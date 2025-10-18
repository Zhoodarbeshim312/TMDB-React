import { Link } from "react-router-dom";
import scss from "./Footer.module.scss";
import { MdOutlineMovieFilter } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <nav className={scss.nav}>
            <h3>The Basics</h3>
            <ul>
              <li>About TMDB</li>
              <li>Contact Us</li>
              <li>API Documentation</li>
              <li>API for Business</li>
              <li>System Status</li>
            </ul>
          </nav>
          <nav className={scss.nav}>
            <h3>Get Involved</h3>
            <ul>
              <li>Contribution Bible</li>
              <li>Add New Movie</li>
              <li>Add New TV Show</li>
            </ul>
          </nav>
          <nav className={scss.nav}>
            <h3>Community</h3>
            <ul>
              <li>Guidelines</li>
              <li>Discussions</li>
              <li>Leaderboard</li>
              <li>Support Forums</li>
            </ul>
          </nav>
          <nav className={scss.nav}>
            <h3>Legal</h3>
            <ul>
              <li>Terms of Use</li>
              <li>API Terms of Use</li>
              <li>Privacy Policy</li>
              <li>DMCA Policy</li>
            </ul>
          </nav>
          <nav className={scss.links}>
            <Link to={"/"}>
              <span>
                <MdOutlineMovieFilter />
              </span>
              TMDB Movie
            </Link>
            <div className={scss.link}>
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
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
