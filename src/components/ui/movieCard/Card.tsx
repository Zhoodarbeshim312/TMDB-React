import { useEffect, useState } from "react";
import scss from "./Card.module.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface AnimatedProgressProps {
  valueStart: number;
  valueEnd: number;
  duration: number;
  children: (value: number) => JSX.Element;
}

interface CardProps {
  el: Movie;
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

const Card: React.FC<CardProps> = ({ el }) => {
  const truncate = (text: string, length: number) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  const getColor = (percentage: number): string => {
    if (percentage >= 70) return "#21d07a";
    if (percentage >= 40) return "#d2d531";
    return "#db2360";
  };

  return (
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
  );
};

export default Card;
