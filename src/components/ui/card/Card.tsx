import { useState, useEffect } from "react";
import type { IData } from "../../../types";
import scss from "./Card.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import loading from "../../../assets/images/loading.svg";

interface ICardProps {
  el: IData;
}

const Card = ({ el }: ICardProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const getColor = (percentage: number) => {
    if (percentage >= 70) return "#21d07a";
    if (percentage >= 40) return "#d2d531";
    return "#db2360";
  };

  useEffect(() => {
    let start = 0;
    const end = Math.round(el.vote_average * 10);
    const step = end / 1;
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setProgress(Math.round(start));
    }, 16);
    return () => clearInterval(interval);
  }, [el.vote_average]);

  return (
    <div className={scss.card}>
      <div className={scss.imgWrapper}>
        {!imgLoaded && (
          <img className={scss.imgPlaceholder} src={loading} alt="img" />
        )}
        <img
          src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${el.poster_path}`}
          alt={el.title}
          style={{
            opacity: imgLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      <div className={scss.info}>
        <div className={scss.rating}>
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: getColor(progress),
              trailColor: "#204529",
              strokeLinecap: "round",
            })}
          />
        </div>
        <h4>{el.title.slice(0, 20)}</h4>
        <p>{el.release_date}</p>
      </div>
    </div>
  );
};

export default Card;
