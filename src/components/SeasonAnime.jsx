import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSearchParams, NavLink, useParams } from "react-router-dom";
import getSpecificSeason from "../../services/getSpecificSeason";
import SkeletonCardSeasonAnime from "./SkeletonCardSeasonAnime";

const SeasonAnime = () => {
  const [seasonAnime, setSeasonAnime] = useState([]);
  const [paginationAnime, setPaginationAnime] = useState([]);
  const [parameter, setParameter] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const page = parseInt(parameter.get("page")) || 1;
  const { year, season } = useParams();

  function getLeftRightButtonSeason(month, season, year) {
    const seasonData = ["winter", "spring", "summer", "fall"];
    let right = {};
    const currIndex = seasonData.indexOf(season);
    let left = {};

    if (currIndex === 0) {
      left = { fall: parseInt(year) - 1 };
    } else {
      left = { [seasonData[currIndex - 1]]: parseInt(year) };
    }

    for (let i = currIndex + 1; i < currIndex + 3; i++) {
      let currYear = parseInt(year);
      let index = i;
      if (index > 3) {
        index -= 4;
        currYear += 1;
      }
      right[seasonData[index]] = currYear;
    }

    return [left, right];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getSpecificSeason(year, season, page);
        setSeasonAnime(res.data);
        setPaginationAnime(res.pagination);
      } catch (err) {
        throw new Error("fail fetch data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, season, year]);

  const handleIncrementClick = () => {
    if (paginationAnime.has_next_page) {
      const newPage = page + 1;
      setParameter({ page: newPage });
    } else {
      setParameter({ page: 1 });
    }
  };

  const handleDecrementClick = () => {
    if (page <= 1) {
      setParameter({ page: paginationAnime.last_visible_page });
    } else {
      const newPage = page - 1;
      setParameter({ page: newPage });
    }
  };

  const currentMonth = new Date().getMonth() + 1;
  const [left, right] = getLeftRightButtonSeason(currentMonth, season, year);
  const leftSeason = Object.keys(left)[0];
  const leftYear = left[leftSeason];
  const rightSeasons = Object.keys(right);
  const rightYears = Object.values(right);

  return (
    <>
      {loading ? (
        <SkeletonCardSeasonAnime />
      ) : year < 1917 || year > 2024 ? (
        <p>data error</p>
      ) : (
        <div className="mt-3 border rounded-md p-2 shadow-md">
          <div className="flex justify-around mb-4">
            <NavLink to={`/seasonanime/${leftYear}/${leftSeason}`}>
              {leftSeason.charAt(0).toUpperCase() + leftSeason.slice(1)}{" "}
              {leftYear}
            </NavLink>
            <NavLink to={`/seasonanime/${year}/${season}`}>
              {season.charAt(0).toUpperCase() + season.slice(1)} {year}
            </NavLink>
            <NavLink to={`/seasonanime/${rightYears[0]}/${rightSeasons[0]}`}>
              {rightSeasons[0].charAt(0).toUpperCase() +
                rightSeasons[0].slice(1)}{" "}
              {rightYears[0]}
            </NavLink>
            <NavLink to={`/seasonanime/${rightYears[1]}/${rightSeasons[1]}`}>
              {rightSeasons[1].charAt(0).toUpperCase() +
                rightSeasons[1].slice(1)}{" "}
              {rightYears[1]}
            </NavLink>
          </div>
          <h1 className="text-lg font-semibold p-4 text-center">
            Season: {season} {year}
          </h1>
          <div className="w-full h-full grid lg:grid-cols-3 md:grid-cols-2 gap-3">
            {seasonAnime.map((anime, index) => (
              <div className="shadow-sm h-[400px]" key={index}>
                <Card className="h-full">
                  <CardHeader className="p-4 flex justify-center items-center text-center h-[30%]">
                    <CardTitle>
                      <NavLink to={`/detailsanime/${anime.mal_id}`}>
                        {anime.title}
                      </NavLink>
                    </CardTitle>
                  </CardHeader>
                  <div className="flex h-[50%]">
                    <CardContent className="flex-1 w-full">
                      <img
                        src={anime.images.webp.image_url}
                        alt={anime.title}
                        className="h-[200px] w-[200px] rounded-md"
                      />
                    </CardContent>
                    <CardContent className="flex-[2] hover:overflow-auto overflow-hidden">
                      <p>Synopsis: {anime.synopsis}</p>
                    </CardContent>
                  </div>
                  <div className="flex justify-center items-center mt-4 h-[20%]">
                    <CardFooter>
                      <p>⭐: {anime.score}</p>
                    </CardFooter>
                    <CardFooter>
                      <p>
                        📺:{" "}
                        {anime.season
                          ? anime.season.charAt(0).toUpperCase() +
                            anime.season.slice(1)
                          : "No Season Info"}{" "}
                        {anime.year}
                      </p>
                    </CardFooter>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrementClick}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrementClick}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SeasonAnime;
