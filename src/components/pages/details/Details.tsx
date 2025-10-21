import axios from "axios";
import scss from "./Details.module.scss";
import { useEffect, useState } from "react";
import { api_key } from "../../../API/api";
import { useParams } from "react-router-dom";
import type { IDetails } from "../../../types";
const Details = () => {
  const [apiData, setApiData] = useState<IDetails | null>(null);
  const { movieId } = useParams<{ movieId: string }>();
  const getDetails = async (key: string) => {
    const res = await axios.get<IDetails>(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`
    );
    setApiData(res.data);
  };
  useEffect(() => {
    getDetails(api_key);
  }, []);
  console.log(apiData);

  return (
    <section className={scss.Details}>
      <div className="container">
        <div className={scss.content}>
          <h1>{apiData?.id}</h1>
        </div>
      </div>
    </section>
  );
};

export default Details;
