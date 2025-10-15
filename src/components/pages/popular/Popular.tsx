import React from "react";
import { useEffect, useState } from "react";
import scss from "./Popular.module.scss";
import axios from "axios";
import { type IData, type IResponse } from "../../../../types";
import { api_key } from "../../../API/api";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import loader from "../../../assets/images/loading.svg";

interface AnimatedProgressProps {
  valueStart: number;
  valueEnd: number;
  duration: number;
  children: (value: number) => JSX.Element;
}

const AnimatedProgressProvider: React.FC<AnimatedProgressProps> = ({
  valueStart,
  valueEnd,
  duration,
  children,
}) => {
  const [value, setValue] = useState<number>(valueStart);

  useEffect(() => {
    let start: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;
      setValue(valueStart + eased * (valueEnd - valueStart));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [valueStart, valueEnd, duration]);

  return children(value);
};

const Popular = () => {
  const [apiData, setApiData] = useState<IData[]>([]);
  const [component, setComponent] = useState<boolean>(false);
  const getColor = (percentage: number): string => {
    if (percentage >= 70) return "#21d07a";
    if (percentage >= 40) return "#d2d531";
    return "#db2360";
  };

  const [page, setPage] = useState(1);

  const getData = async (key: string) => {
    try {
      const res = await axios.get<IResponse>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`
      );
      setApiData(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setComponent(false);
    getData(api_key);

    const timer = setTimeout(() => {
      setComponent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [page]);

  const truncate = (text: string, length: number) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  return (
    <>
      <section
        style={{
          display: component ? "flex" : "none",
        }}
        className={scss.Popular}
      >
        <div className="container">
          <div className={scss.btns}>
            <button onClick={() => setPage(page <= 1 ? 1 : page - 1)}>
              <FaArrowLeft />
            </button>
            <button onClick={() => setPage(page + 1)}>
              <FaArrowRight />
            </button>
          </div>
          <div className={scss.content}>
            {apiData.map((el) => (
              <div key={el.id} className={scss.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w440_and_h660_face/${el.poster_path}`}
                  alt={el.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "10px 10px 0 0",
                    objectFit: "contain",
                  }}
                />
                <h3>
                  <AnimatedProgressProvider
                    valueStart={0}
                    valueEnd={el.vote_average * 10}
                    duration={1.4}
                  >
                    {(value) => {
                      const roundedValue = Math.round(value);
                      return (
                        <CircularProgressbar
                          value={value}
                          text={`${roundedValue}%`}
                          styles={buildStyles({
                            pathColor: getColor(roundedValue),
                            textColor: "#fff",
                            trailColor: "#2f2f2f",
                            pathTransition: "none",
                            textSize: "25px",
                          })}
                        />
                      );
                    }}
                  </AnimatedProgressProvider>
                </h3>
                <div className={scss.text}>
                  <h4>{truncate(el.title, 20)}</h4>
                  <p>{el.release_date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div
        style={{
          display: component ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
        className={scss.loader}
      >
        <img src={loader} alt="img" />
      </div>
    </>
  );
};

export default Popular;
