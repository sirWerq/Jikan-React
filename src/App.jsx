import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HomePage from "./components/HomePage";
import Error from "./components/Error";
import TopAnime from "./components/TopAnime";
import SeasonAnime from "./components/SeasonAnime";
import DetailsAnime from "./components/DetailsAnime";
import SearchPage from "./components/SearchPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<HomePage />} />
          <Route path="topanime" element={<TopAnime />} />
          <Route path="seasonanime/:year/:season" element={<SeasonAnime />} />
          <Route path="detailsanime/:id" element={<DetailsAnime />} />
          <Route path="search/:name" element={<SearchPage />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
