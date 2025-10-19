import type { IData } from "../../../types";
import scss from "./Card.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ICardProps {
  el: IData;
}

const Card = ({ el }: ICardProps) => {
  const getColor = (percentage: number) => {
    if (percentage >= 70) return "#21d07a";
    if (percentage >= 40) return "#d2d531";
    return "#db2360";
  };
  return (
    <div key={el.id} className={scss.card}>
      <img
        src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${el.poster_path}`}
        alt={el.title}
      />
      <div className={scss.info}>
        <div className={scss.rating}>
          <CircularProgressbar
            value={Math.round(el.vote_average * 10)}
            text={`${Math.round(el.vote_average * 10)}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: getColor(Math.round(el.vote_average * 10)),
              trailColor: "#204529",
              textSize: "25px",
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
