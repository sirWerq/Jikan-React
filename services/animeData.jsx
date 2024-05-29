import axios from "axios";

const animeData = async (page, limit) => {
  try {
    const fetchData = await axios.get(
      `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${limit}`
    );
    return fetchData.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default animeData;
