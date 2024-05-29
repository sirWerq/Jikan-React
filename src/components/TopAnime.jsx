import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import animeData from "../../services/animeData";

import SkeletonTabelTopAnime from "./SkeletonTabelTopAnime";

const TopAnime = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [parameter, setParameter] = useSearchParams();
  const [paginationAnime, setPaginationAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const page = parseInt(parameter.get("page")) || 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await animeData(page, 25);
        setTopAnime(res.data);
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
        <SkeletonTabelTopAnime />
      ) : (
        <div className="mt-3 border rounded-md p-2 shadow-md">
          <h1 className="text-lg font-semibold p-4">Top Anime</h1>
          <div>
            <Table>
              <TableCaption className="font-semibold">
                <Button variant="outline" size="icon">
                  <div
                    onClick={handleDecrementClick}
                    className="border h-full w-full flex justify-center items-center"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </div>
                </Button>
                <Button variant="outline" size="icon">
                  <div
                    onClick={handleIncrementClick}
                    className="border h-full w-full flex justify-center items-center"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Button>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Rank</TableHead>
                  <TableHead className="text-center">Anime</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center">Episodes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topAnime.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{`${data.rank}`}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={`${data.images.webp.small_image_url}`}
                          alt={`${data.title}`}
                          className="w-[40px] h-[50px]"
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>{`${data.title}`}</TooltipTrigger>
                            <TooltipContent className="p-0 text-start w-[500px]">
                              <div className="bg-black w-full">
                                <p className="font-semibold text-white p-2">{`${data.title}`}</p>
                              </div>
                              <div className="p-1">
                                <p>
                                  {data.synopsis.length > 200
                                    ? `${data.synopsis.substring(0, 200)}...`
                                    : `${data.synopsis}`}
                                </p>
                                <p>
                                  Genres:{" "}
                                  {`${data.genres.map((genre) => {
                                    return genre.name;
                                  })}`}
                                </p>
                                <br></br>
                                <p>Status: {`${data.status}`}</p>
                                <p>Type: {`${data.type}`}</p>
                                <p>Source: {`${data.source}`}</p>
                                <p>Scored By: {`${data.scored_by}`}</p>
                                <p>Year: {`${data.year}`}</p>
                                <p>Season: {`${data.season}`}</p>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{`${data.score}`}</TableCell>
                    <TableCell className="text-center">{`${data.episodes}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default TopAnime;
