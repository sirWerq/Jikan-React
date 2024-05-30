/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import animeDetail from "../../services/animeDetail";
import animeCharacter from "../../services/animeCharacter";

import SkeletonDetailsAnime from "./SkeletonDetailsAnime";

const DetailsAnime = () => {
  const [animeData, setAnimeData] = useState([]);
  const [characters, setCharacters] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const DetailsApiRes = await animeDetail(id);
        const CharacterApiRes = await animeCharacter(id);
        setAnimeData(DetailsApiRes.data);
        setCharacters(CharacterApiRes.data);
      } catch (err) {
        console.error("fail get api data: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <SkeletonDetailsAnime />
      ) : (
        <div className="w-full h-full">
          <div className="border-b-2">
            <h1 className="font-bold">{animeData.title}</h1>
            <h2 className="font-semibold text-slate-500">
              {animeData.title_english}
            </h2>
          </div>
          <div>
            <div className="py-3 grid grid-cols-1 md:grid-cols-1fr-3fr gap-4">
              <div className="flex flex-wrap rounded-sm gap-2 border">
                <img
                  src={`${animeData.images.webp.image_url}`}
                  alt={animeData.title}
                  className="w-full"
                />
                <div className="px-2">
                  <h4 className="font-semibold">More Information</h4>
                  <p className="text-sm">Type: {animeData.type}</p>
                  <p className="text-sm">Episodes: {animeData.episodes}</p>
                  <p className="text-sm">
                    Aired: {formatDate(animeData.aired.from)} to{" "}
                    {animeData.aired.to ? formatDate(animeData.aired.to) : "?"}
                  </p>
                  <p className="text-sm">
                    Premiered:{" "}
                    <span className="first-letter:uppercase inline-block">
                      {animeData.season} {animeData.year}
                    </span>
                  </p>
                  <p className="text-sm">
                    Broadcast: {animeData.broadcast.string}
                  </p>
                  <p className="text-sm">
                    Producers:{" "}
                    {animeData.producers.map((producer, index) => (
                      <span key={index}>
                        {producer.name}
                        {index !== animeData.producers.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm">
                    Studios: {animeData.studios.map((studio) => studio.name)}
                  </p>
                  <p className="text-sm">Source: {animeData.source}</p>
                  <p className="text-sm">
                    Genres:{" "}
                    {animeData.genres.map((genre, index) => (
                      <span key={index}>
                        {genre.name}
                        {index !== animeData.genres.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm">
                    Themes:{" "}
                    {animeData.themes.length === 0 ? (
                      <span>Not found</span>
                    ) : (
                      animeData.themes.map((theme, index) => (
                        <span key={index}>
                          {theme.name}
                          {index !== animeData.themes.length - 1 ? ", " : ""}
                        </span>
                      ))
                    )}
                  </p>
                  <p className="text-sm">Duration: {animeData.duration}</p>
                  <p className="text-sm">Rating: {animeData.rating}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="border-y-2 flex items-center justify-center gap-24 p-10 rounded-md">
                  <div>
                    <p className="bg-slate-200 px-3">Score</p>
                    <p className="text-center">#{animeData.score}</p>
                  </div>
                  <p>Ranked: #{animeData.rank}</p>
                  <p>Popularity: #{animeData.popularity}</p>
                  <p>Members: #{animeData.members}</p>
                </div>
                <div className="border-y-2 gap-24 p-5 rounded-md">
                  <p>synopsis: {animeData.synopsis}</p>
                </div>
              </div>
            </div>
            <div>
              <div className="border-y-2 gap-24 p-5 rounded-md">
                <h3 className="font-semibold">Characters and Voice Actors</h3>
                <table className="table-auto border-collapse border border-slate-400 w-full">
                  <tbody>
                    {characters.map((chara, index) => (
                      <tr key={index} className="flex border border-slate-400">
                        <td className="flex w-[50%] justify-start gap-3">
                          <div>
                            <img
                              src={chara.character.images.jpg.image_url}
                              alt={chara.character.name}
                              className="w-[100px] h-[100px] border"
                            />
                          </div>
                          <div>
                            <p>{chara.character.name}</p>
                            <p>{chara.role}</p>
                          </div>
                        </td>
                        <td className="flex w-[50%] justify-end gap-3">
                          <div className="text-end">
                            <p>
                              {chara.voice_actors.slice(0, 1).map((va) => {
                                return va.person.name;
                              })}
                            </p>
                            <p>
                              {" "}
                              {chara.voice_actors
                                .slice(0, 1)
                                .map((va) => va.language)}
                            </p>
                          </div>
                          <div>
                            <img
                              src={chara.voice_actors.slice(0, 1).map((va) => {
                                return va.person.images.jpg.image_url;
                              })}
                              alt={chara.voice_actors.map(
                                (va) => va.person.name
                              )}
                              className="w-[100px] h-[100px] border"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsAnime;
