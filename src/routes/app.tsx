import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.scss';

//Routes pages
import { Home }   from "../pages/home";
import { Inicio } from '../pages/inicio'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
