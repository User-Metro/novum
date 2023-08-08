import { Routes, Route, BrowserRouter } from "react-router-dom";

//Routes pages
import { Home } from "../pages/home";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/carrusell" element={<FormStep />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
