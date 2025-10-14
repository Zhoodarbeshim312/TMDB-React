import type { FC } from "react";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <Footer />
    </div>
  );
};
export default App;
