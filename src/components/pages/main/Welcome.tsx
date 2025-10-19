import { useEffect, useRef, useState } from "react";
import scss from "./Welcome.module.scss";
import axios from "axios";
import { api_key } from "../../../API/api";
import type { IData, IResponse } from "../../../types";

interface TypedInstance {
  destroy: () => void;
}

const Welcome = () => {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<TypedInstance | null>(null);
  const [apiData, setApiData] = useState<IData[]>([]);
  const [currentBg, setCurrentBg] = useState<IData | null>(null);
  const [nextBg, setNextBg] = useState<IData | null>(null);
  const [fade, setFade] = useState(false);

  const getData = async (key: string) => {
    try {
      const res = await axios.get<IResponse>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      );
      setApiData(res.data.results);

      const first =
        res.data.results[Math.floor(Math.random() * res.data.results.length)];
      setCurrentBg(first);
      setNextBg(first);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    getData(api_key);

    import("typed.js").then((mod) => {
      if (!isMounted || !el.current) return;
      const Typed = mod.default;
      typed.current = new Typed(el.current, {
        strings: [
          "Welcome to The Movie Database.",
          "Discover millions of movies, TV shows and people behind them.",
          "Explore detailed information about actors, directors and writers.",
          "Find ratings, reviews and official trailers in one place.",
          "Your journey through cinema starts here.",
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: "|",
      });
    });

    return () => {
      isMounted = false;
      typed.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (apiData.length === 0) return;

    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * apiData.length);
      setNextBg(apiData[random]);
      setFade(true);
      setTimeout(() => {
        setCurrentBg(apiData[random]);
        setFade(false);
      }, 1000);
    }, 2000);

    return () => clearInterval(interval);
  }, [apiData]);

  return (
    <section className={scss.Welcome}>
      <div
        className={scss.bg}
        style={{
          backgroundImage: currentBg
            ? `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${currentBg.backdrop_path})`
            : "none",
        }}
      >
        {nextBg && (
          <div
            className={`${scss.bgOverlay} ${fade ? scss.fadeIn : ""}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${nextBg.backdrop_path})`,
            }}
          />
        )}
      </div>

      <div className="container">
        <div className={scss.content}>
          <h1>
            <span ref={el}></span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
