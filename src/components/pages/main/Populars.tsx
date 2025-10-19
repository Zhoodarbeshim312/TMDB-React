import axios from "axios";
import scss from "./Populars.module.scss";
import { useEffect, useState } from "react";
import type { IData, IResponse } from "../../../types";
import { api_key } from "../../../API/api";
import Card from "../../ui/card/Card";

const Populars = () => {
  const [apiData, setApiData] = useState<IData[]>([]);
  const getPopular = async (key: string) => {
    try {
      const res = await axios.get<IResponse>(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
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
    <section className={scss.Populars}>
      <div className="container">
        <h1>Popular</h1>
        <div className={scss.content}>
          {apiData.map((el) => (
            <Card el={el} key={el.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Populars;
