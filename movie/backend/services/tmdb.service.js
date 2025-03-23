import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

async function fetchFromIMDB(url) {
  const options = {
    method: 'GET',
    url: url, 
    headers: {
      'x-rapidapi-key': ENV_VARS.TMDB_API_KEY,
      'x-rapidapi-host': 'imdb236.p.rapidapi.com',
    },
  };

  try {
    console.log("Fetching from IMDb:", url);
    const response = await axios.request(options);
    // console.log(response.data);
    console.log("IMDb API Response:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message); 
  }
}


async function fetchfrommovie(url) {
  const options = {
    method: 'GET',
    url: url, 
    headers: {
      'x-api-key': ENV_VARS.MOVIEGLU_API_KEY,
      'authoization':'Basic RkZBVTo5RFJyVFQ0NG5rQ3I=',
      
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw new Error(error.message); 
  }
}

export const fetchTrailerFromYouTube = async (movieTitle, movieYear) => {
  try {

    console.log("YOUTUBE_API_KEY:", ENV_VARS.YOUTUBE_API_KEY);

    const query = `${movieTitle} ${movieYear} official trailer`
      const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`,
          {
              params: {
                  q: query,
                  part: "snippet",
                  maxResults: 1,
                  key: "AIzaSyDEz2n4yHcUPDGrmphEQb-R3dUR88nnRFs",
              },
          }
      );
      console.log('Response for fetching trailer:',response.data);
      
      const videoId = response.data?.items?.[0]?.id?.videoId;
      return videoId ? `https://www.youtube.com/watch?v=${videoId}` : null;
  } catch (error) {
      console.error("Error fetching trailer from YouTube:", error.response?.data || error.message);
      return null;
  }
};


export { fetchFromIMDB, fetchfrommovie };
export default fetchFromIMDB;
