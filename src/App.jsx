import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import HomePage from "./components/HomePage";
import Error from "./components/Error";
import TopAnime from "./components/TopAnime";
import SeasonAnime from "./components/SeasonAnime";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="home?" element={<HomePage />} />
          <Route path="topAnime" element={<TopAnime />} />
          <Route path="seasonAnime" element={<SeasonAnime />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
