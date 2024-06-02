import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import img1 from "./../assets/1.jpg";
import img2 from "./../assets/2.jpg";
import img3 from "./../assets/3.jpg";
import img4 from "./../assets/4.jpg";
import img5 from "./../assets/5.jpeg";

const imageList = [img1, img2, img3, img4, img5];

import animeData from "../../services/animeData";
import seasonData from "../../services/seasonData";

import SkeletonTabelHome from "./SkeletonTabelHome";
import SkeletonCardHome from "./SkeletonCardHome";

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

const HomePage = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [seasonAnime, setSeasonAnime] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [loadingCard, setLoadingCard] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const anime = await animeData(1, 5);
        const season = await seasonData(1, 6);
        setTopAnime(anime.data);
        setSeasonAnime(season.data);
      } catch (err) {
        throw new Error("fail fetch data: ", err);
      } finally {
        setLoadingTable(false);
        setLoadingCard(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[150px] md:h-[500px] mySwiper rounded-lg"
      >
        {imageList.map((image, index) => (
          <SwiperSlide
            key={index}
            style={{ backgroundImage: `url(${image})` }}
            className="w-full h-full bg-cover bg-center"
          ></SwiperSlide>
        ))}
      </Swiper>
      <div>
        {loadingTable ? (
          <SkeletonTabelHome />
        ) : (
          <div className="mt-3 border rounded-md p-2 shadow-md">
            <h1 className="text-lg font-semibold p-4">Top Anime</h1>
            <div>
              <Table>
                <TableCaption className="font-semibold">
                  <NavLink to="/topanime?page=1">See More!</NavLink>
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
                      <TableCell className="text-center">
                        {`${data.rank}`}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center gap-2">
                          <img
                            src={`${data.images.webp.small_image_url}`}
                            alt={`${data.title}`}
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                {" "}
                                <NavLink
                                  to={`/detailsanime/${data.mal_id}`}
                                >{`${data.title}`}</NavLink>
                              </TooltipTrigger>
                              <TooltipContent className="p-0 text-start w-[500px]">
                                <div className="bg-black w-full">
                                  <p className="font-semibold text-white p-2">{`${data.title}`}</p>
                                </div>
                                <div className="p-1">
                                  <p>
                                    {data.synopsis.length > 200
                                      ? `${data.synopsis.substring(0, 200)}...`
                                      : `${data.synopsis}`}
                                    <NavLink
                                      to={`/detailsanime/${data.mal_id}`}
                                      className="text-sky-500"
                                    >
                                      read more
                                    </NavLink>
                                  </p>
                                  <br></br>
                                  <p>
                                    Genres:{" "}
                                    {`${data.genres.map((genre) => {
                                      return genre.name;
                                    })}`}
                                  </p>
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
        {loadingCard ? (
          <SkeletonCardHome />
        ) : (
          <div className="mt-3 border rounded-md p-2 shadow-md">
            <h1 className="text-lg font-semibold p-4">This Season</h1>
            <div className="w-full h-full grid lg:grid-cols-3 md:grid-cols-2 gap-3">
              {seasonAnime.map((anime, index) => (
                <div className="shadow-sm h-[370px]" key={index}>
                  <Card className="h-full">
                    <CardHeader className="h-[20%] p-4 text-center">
                      <CardTitle>
                        {" "}
                        <NavLink
                          to={`detailsanime/${anime.mal_id}`}
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
                          {`${
                            anime.season.charAt(0).toUpperCase() +
                            anime.season.slice(1)
                          } ${anime.year}`}
                        </p>
                      </CardFooter>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center p-2">
              <NavLink
                to={`http://localhost:5173/seasonAnime/${year}/${season}`}
              >
                See More!
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
