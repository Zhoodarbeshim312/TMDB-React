import axios from "axios";
import scss from "./Details.module.scss";
import { useEffect, useState } from "react";
import { api_key } from "../../../API/api";
import { useParams } from "react-router-dom";
import { RxDotFilled } from "react-icons/rx";
import type { Genre, IDetails } from "../../../types";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { MdFavoriteBorder, MdOutlineBookmarkBorder } from "react-icons/md";
const Details = () => {
  const [apiData, setApiData] = useState<IDetails | null>(null);
  const { movieId } = useParams<{ movieId: string }>();
  const [progress, setProgress] = useState<number>(0);

  const getDetails = async (key: string) => {
    const res = await axios.get<IDetails>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`
    );
    setApiData(res.data);
  };

  useEffect(() => {
    let start = 0;
    const end = Math.round((apiData?.vote_average ?? 0) * 10);
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
  }, [apiData?.vote_average]);

  useEffect(() => {
    getDetails(api_key);
    window.scrollTo(0, 0);
  }, []);
  console.log(apiData);
  const getColor = (percentage: number) => {
    if (percentage >= 70) return "#21d07a";
    if (percentage >= 40) return "#d2d531";
    return "#db2360";
  };
  return (
    <section
      style={{
        backgroundImage: ` url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${apiData?.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
      }}
      className={scss.Details}
    >
      <div className="container">
        <div className={scss.content}>
          <div className={scss.preview}>
            <img
              src={`https://media.themoviedb.org/t/p/w440_and_h660_face/${apiData?.poster_path}`}
              alt="img"
            />
          </div>
          <div className={scss.info}>
            <h1>
              {apiData?.title}{" "}
              <span>({apiData?.release_date.slice(0, 4)})</span>
            </h1>
            <p>
              {apiData?.release_date}({" "}
              {apiData?.origin_country.map((el) => el + ", ")} )
              <RxDotFilled />
              {apiData?.genres.map((el: Genre) => el.name + " ")}
              <RxDotFilled />
              {apiData?.runtime &&
                `${Math.floor(apiData.runtime / 60)}h ${apiData.runtime % 60}m`}
            </p>
            <p>{apiData?.tagline ? <i>" {apiData.tagline} "</i> : null}</p>
            <p>{apiData?.overview}</p>
            <div className={scss.actions}>
              <div className={scss.rating}>
                <CircularProgressbar
                  value={progress}
                  text={`${progress}%`}
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: getColor(progress),
                    trailColor: "#204529",
                    strokeLinecap: "round",
                    textSize: "25px",
                  })}
                />
              </div>
              <button>
                <MdFavoriteBorder />
              </button>
              <button>
                <MdOutlineBookmarkBorder />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Details;
