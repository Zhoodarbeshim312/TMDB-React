import { useEffect, useState } from "react";
import scss from "./TopRatedes.module.scss";
import { api_key } from "../../../API/api";
import axios from "axios";
import type { IData, IResponse } from "../../../types";
import Card from "../../ui/card/Card";
const TopRatedes = () => {
  const [apiData, setApiData] = useState<IData[]>([]);
  const getPopular = async (key: string) => {
    try {
      const res = await axios.get<IResponse>(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`
      );
      setApiData(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPopular(api_key);
  }, []);
  return (
    <section className={scss.TopRatedes}>
      <div className="container">
        <h1>Top Rated</h1>
        <div className={scss.content}>
          {apiData.map((el) => (
            <Card el={el} key={el.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedes;
