import axios from "axios";
const getSpecificSeason = async (year, season) => {
  try {
    const fetchData = await axios.get(
      `https://api.jikan.moe/v4/seasons/${year}/${season}`
    );
    return fetchData.data;
  } catch (err) {
    throw new Error("fail get api data: ", err);
  }
};

export default getSpecificSeason;
