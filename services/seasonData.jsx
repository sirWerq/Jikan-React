import axios from "axios";
const seasonData = async (page, limit) => {
  try {
    const fetchData = await axios.get(
      `https://api.jikan.moe/v4/seasons/now?page=${page}&limit=${limit}`
    );
    return fetchData.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default seasonData;
