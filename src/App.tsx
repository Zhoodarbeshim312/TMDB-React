import type { ReactElement } from "react";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import MainPage from "./components/pages/MainPage";
import PopularPage from "./components/pages/PopularPage";
import TopRatedPage from "./components/pages/TopRatedPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  interface IRoutes {
    id: number;
    path: string;
    element: ReactElement;
  }
  const routes: IRoutes[] = [
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
      path: "/topRated",
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
