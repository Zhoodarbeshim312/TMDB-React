import scss from "./Footer.module.scss";
import logo from "../../../assets/images/footerLogo.svg";
const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.nav}>
            <img src={logo} alt="img" />
            <button>Join the Community</button>
          </div>
          <div className={scss.text}>
            <h3>The Basics</h3>
            <p>About TMDB</p>
            <p>Contact Us</p>
            <p>API Documentation</p>
            <p>API for Business</p>
            <p>System Status</p>
          </div>
          <div className={scss.text}>
            <h3>Get Involved</h3>
            <p>Contribution Bible</p>
            <p>Add New Movie</p>
            <p>Add New TV Show</p>
          </div>
          <div className={scss.text}>
            <h3>Community</h3>
            <p>Guidelines</p>
            <p>Discussions</p>
            <p>Leaderboard</p>
            <p>Support Forums</p>
          </div>
          <div className={scss.text}>
            <h3>Legal</h3>
            <p>Terms of Use</p>
            <p>API Terms of Use</p>
            <p>Privacy Policy</p>
            <p>DMCA Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
