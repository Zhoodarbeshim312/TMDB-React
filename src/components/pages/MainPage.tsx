import { useEffect, useState, type CSSProperties } from "react";
import Populars from "./main/Populars";
import TopRatedes from "./main/TopRatedes";
import Welcome from "./main/Welcome";
import loading from "../../assets/images/loading.svg";

const MainPage = () => {
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSections(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerStyle: CSSProperties = {
    opacity: showSections ? 1 : 0,
    transition: "opacity 1s ease-in-out",
  };

  const loaderStyle: CSSProperties = {
    opacity: showSections ? 0 : 1,
    transition: "opacity 1s ease-in-out",
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  };

  return (
    <>
      <Welcome />

      <div style={loaderStyle}>
        <img
          src={loading}
          alt="loading"
          style={{ width: "80px", height: "80px" }}
        />
      </div>

      <div style={containerStyle}>
        <Populars />
        <TopRatedes />
      </div>
    </>
  );
};

export default MainPage;
