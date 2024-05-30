import axios from "axios";

const animedetail = async (id) => {
  try {
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
    return res.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default animedetail;
