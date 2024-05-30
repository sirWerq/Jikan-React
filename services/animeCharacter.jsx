import axios from "axios";

const animeCharacter = async (id) => {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    );
    return res.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default animeCharacter;
