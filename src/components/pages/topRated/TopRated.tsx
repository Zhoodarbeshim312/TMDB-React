import { useEffect, useState } from "react";
import scss from "./TopRated.module.scss";
import type { IData, IResponse } from "../../../types";
import axios from "axios";
import { api_key } from "../../../API/api";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Card from "../../ui/card/Card";
const TopRated = () => {
  const [apiData, setApiData] = useState<IData[]>([]);
  const [count, setCount] = useState<number>(1);
  const getTopRated = async (key: string) => {
    try {
      const res = await axios.get<IResponse>(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=${count}`
      );
      setApiData(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTopRated(api_key);
  }, [count]);

  return (
    <section className={scss.TopRated}>
      <div className="container">
        <div className={scss.head}>
          <h1>Popular</h1>
          <div className={scss.btns}>
            <button onClick={() => setCount(count < 2 ? 1 : count - 1)}>
              <FiArrowLeft />
            </button>
            <h2>{count}</h2>
            <button onClick={() => setCount(count + 1)}>
              <FiArrowRight />
            </button>
          </div>
        </div>

        <div className={scss.content}>
          {apiData.map((el) => (
            <Card el={el} key={el.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRated;
