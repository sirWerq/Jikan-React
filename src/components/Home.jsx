import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [searchAnime, setSearchAnime] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setToggleHamburger((toggleHamburger) => !toggleHamburger);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchAnime}`);
  };

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const season_data = {
    1: "winter",
    2: "winter",
    3: "spring",
    4: "spring",
    5: "spring",
    6: "summer",
    7: "summer",
    8: "summer",
    9: "fall",
    10: "fall",
    11: "fall",
    12: "winter",
  };
  const season = season_data[currentMonthIndex];

  return (
    <>
      <nav className="relative w-full flex justify-center items-center border-b-2 bg-transparent backdrop-blur-sm z-10">
        <div className="flex items-center justify-between p-2 container">
          <NavLink
            to="/"
            className="text-lg font-semibold md:text-xl text-center"
          >
            <span>Rifqx</span>
            <span>Amia</span>
          </NavLink>
          <div className="block md:order-3">
            <form onSubmit={handleSearch}>
              <Input
                type="text"
                placeholder="Search"
                value={searchAnime}
                onChange={(e) => setSearchAnime(e.target.value)}
              />
            </form>
          </div>
          <div
            onClick={handleToggle}
            className={`${
              toggleHamburger ? "hamburger-toggle" : ""
            } cursor-pointer md:hidden`}
          >
            <span className="hamburger-icon origin-top-left transition ease-in-out duration-300"></span>
            <span className="hamburger-icon transition ease-in-out duration-300"></span>
            <span className="hamburger-icon origin-bottom-left transition ease-in-out duration-300"></span>
          </div>

          <div
            className={`${
              toggleHamburger ? "block" : "hidden"
            } absolute top-full right-2 flex flex-col w-44 rounded-xl shadow-xl md:relative md:block md:w-auto md:rounded-none md:shadow-none md:text-lg bg-white`}
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                `p-3 text-center ${isActive ? "bg-stone-300" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/topanime?page=1"
              className={({ isActive }) =>
                `p-3 text-center ${isActive ? "bg-stone-300" : ""}`
              }
            >
              Top Anime
            </NavLink>
            <NavLink
              to={`/seasonanime/${year}/${season}`}
              className={({ isActive }) =>
                `p-3 text-center ${isActive ? "bg-stone-300" : ""}`
              }
            >
              Season
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="flex justify-center">
        <div className="container p-3">
          <Outlet />
        </div>
      </div>
      <footer className="w-full h-24">
        <div className="container h-full flex justify-center items-center">
          <span>
            GitHub: <a href="https://github.com/sirWerq">SirWerq</a>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Home;
