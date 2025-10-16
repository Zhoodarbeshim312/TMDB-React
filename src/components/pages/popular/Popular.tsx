import React from "react";
import { useEffect, useState } from "react";
import scss from "./Popular.module.scss";
import axios from "axios";
import { type IData, type IResponse } from "../../../../types";
import { api_key } from "../../../API/api";
import "react-circular-progressbar/dist/styles.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import loader from "../../../assets/images/loading.svg";
import Card from "../../ui/movieCard/Card";

const Popular = () => {
  const [apiData, setApiData] = useState<IData[]>([]);
  const [component, setComponent] = useState<boolean>(false);

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
              <Card el={el} key={el.id} />
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
