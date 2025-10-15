import type { FC, JSX } from "react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import PopularPage from "./components/pages/PopularPage";
import TopRatedPage from "./components/pages/TopRatedPage";

const App: FC = () => {
  interface IRoute {
    id: number;
    path: string;
    element: JSX.Element;
  }
  const routes: IRoute[] = [
    {
      id: 1,
      path: "/",
      element: <MainPage />,
    },
    {
      id: 2,
      path: "/popular",
      element: <PopularPage />,
    },
    {
      id: 3,
      path: "/top-rated",
      element: <TopRatedPage />,
    },
  ];
  return (
    <div className="app">
      <Header />
      <Routes>
        {routes.map((el) => (
          <Route key={el.id} path={el.path} element={el.element} />
        ))}
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
