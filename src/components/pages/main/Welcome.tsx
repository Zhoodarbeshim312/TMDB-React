import { useEffect, useRef } from "react";
import scss from "./Welcome.module.scss";

interface TypedInstance {
  destroy: () => void;
}
const Welcome = () => {
  const el = useRef<HTMLSpanElement | null>(null);
  const typed = useRef<TypedInstance | null>(null);
  useEffect(() => {
    let isMounted = true;
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
  return (
    <section className={scss.Welcome}>
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
