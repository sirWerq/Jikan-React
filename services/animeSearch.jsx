import axios from "axios";

const animeSearch = async (page, limit, name) => {
  try {
    const res = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${name}&page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default animeSearch;
