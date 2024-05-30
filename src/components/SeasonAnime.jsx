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
import { useSearchParams, NavLink } from "react-router-dom";
import seasonData from "../../services/seasonData";
import SkeletonCardSeasonAnime from "./SkeletonCardSeasonAnime";

const SeasonAnime = () => {
  const [seasonAnime, setSeasonAnime] = useState([]);
  const [paginationAnime, setPaginationAnime] = useState([]);
  const [parameter, setParameter] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const page = parseInt(parameter.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await seasonData(page, 24);
        setSeasonAnime(res.data);
        setPaginationAnime(res.pagination);
      } catch (err) {
        throw new Error("fail fetch data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

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

  return (
    <>
      {loading ? (
        <SkeletonCardSeasonAnime />
      ) : (
        <div className="mt-3 border rounded-md p-2 shadow-md">
          <h1 className="text-lg font-semibold p-4 text-center">This Season</h1>
          <div className="w-full h-full grid lg:grid-cols-3 md:grid-cols-2 gap-3">
            {seasonAnime.map((anime, index) => (
              <div className="shadow-sm h-[370px]" key={index}>
                <Card className="h-full">
                  <CardHeader className="h-[20%] p-4 text-center">
                    <CardTitle className="hover:overflow-auto overflow-hidden">
                      <NavLink
                        to={`/detailsanime/${anime.mal_id}`}
                      >{`${anime.title}`}</NavLink>
                    </CardTitle>
                  </CardHeader>
                  <div className="flex h-[60%]">
                    <CardContent className="flex-1 w-full">
                      <img
                        src={`${anime.images.webp.image_url}`}
                        alt={`${anime.title}`}
                        className="h-[200px] w-[200px] rounded-md"
                      />
                    </CardContent>
                    <CardContent className="flex-[2] hover:overflow-auto overflow-hidden">
                      <p>Synopsis: {`${anime.synopsis}`}</p>
                    </CardContent>
                  </div>
                  <div className="flex justify-center items-center mt-4">
                    <CardFooter>
                      <p>⭐: {`${anime.score}`}</p>
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
