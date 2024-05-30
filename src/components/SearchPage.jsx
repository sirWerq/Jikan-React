/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useSearchParams, NavLink } from "react-router-dom";
import animeSearch from "../../services/animeSearch";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SkeletonSearch from "./SkeletonSearch";

const SearchPage = () => {
  const [animeData, setAnimeData] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [parameter, setParameter] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const page = parseInt(parameter.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await animeSearch(page, 10, name);
        setAnimeData(res.data);
        setPaginationData(res.pagination);
      } catch (err) {
        console.error("fail get api data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleDecrementClick = () => {
    const newPage = page - 1;
    setParameter({ page: newPage });
  };

  const handleIncrementClick = () => {
    const newPage = page + 1;
    setParameter({ page: newPage });
  };

  return (
    <>
      {loading ? (
        <SkeletonSearch />
      ) : (
        <div className="w-full h-full">
          <div className="p-2">
            <h2 className="font-semibold border-b-2">search results: {name}</h2>
          </div>
          {animeData.length <= 0 ? (
            <div className="flex gap-4 w-full p-2 border-b-2">
              <p>Anime Not Found</p>
            </div>
          ) : (
            animeData.map((anime, index) => (
              <div key={index} className="flex gap-4 w-full p-2 border-b-2">
                <div className="md:w-[10%] w-[30%]">
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-full h-[200px]"
                  />
                </div>
                <div className="md:w-[90%] w-[70%]">
                  <NavLink
                    to={`/detailsanime/${anime.mal_id}`}
                    className="font-semibold mb-2"
                  >
                    {anime.title}
                  </NavLink>
                  <p className="text-sm">{`${anime.type} (${anime.episodes})`}</p>
                  <p className="text-sm">Scored: {anime.score}</p>
                  <p className="text-sm">{anime.members} members</p>
                </div>
              </div>
            ))
          )}
          <div className="w-full flex justify-center items-center">
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              onClick={handleDecrementClick}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!paginationData.has_next_page}
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

export default SearchPage;
