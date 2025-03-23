import { fetchFromIMDB, fetchTrailerFromYouTube } from '../services/tmdb.service.js';

// async function fetchAndRespond(url, res, processData) {
//   try {
//     const response = await fetchFromIMDB(url);
//     // if (!response || !Array.isArray(response.results) || response.results.length === 0) {
//       if (!response || typeof response !== 'object') {
//     return res.status(404).json({ success: false, message: 'No results found' });
//     }

//     const result = processData ? processData(response) : response;
//     return res.status(200).json({ success: true, content: result });
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// }

async function fetchAndRespond(url, res) {
  try {
    const response = await fetchFromIMDB(url);
    // if (!response || !Array.isArray(response.results) || response.results.length === 0) {
      if (!response || typeof response !== 'object') {
    return res.status(404).json({ success: false, message: 'No results found' });
    }

    const result = response;
    return res.status(200).json({ success: true, content: result });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

export async function getTrendingMovie(req, res) {
  const url = 'https://imdb236.p.rapidapi.com/imdb/india/top-rated-indian-movies';
  await fetchAndRespond(url, res, (results) => {
    const randomMovie = results[Math.floor(Math.random() * results.length)];
    return { featured: randomMovie, list: results };
  });
}

export async function getTrendingTamil(req, res) {
  const url = 'https://imdb236.p.rapidapi.com/imdb/india/trending-tamil';
  await fetchAndRespond(url, res, (results) => {
    const randomMovie = results[Math.floor(Math.random() * results.length)];
    return { featured: randomMovie, list: results };
  });
}

export async function getMovieDetails(req, res) {
  console.log('Request movie details:',req);
  const { id } = req.params;
  const url = `https://imdb236.p.rapidapi.com/imdb/${id}`;
  // await fetchAndRespond(url, res, (result) => {
  //   const description = result.description || 'Description not found';
  //   return { description };
  // });

  const details = await fetchAndRespond(url, res);
  return details;
}

export const getMovieTrailer = async (req, res) => {
  try {
      // Retrieve ID from request parameters
      const { id } = req.params;

      if (!id) {
          return res.status(400).json({ success: false, message: "Missing required ID." });
      }

      // Fetch movie details from Trakt API
      let imdbResponse;
      try {
          imdbResponse = await fetchFromIMDB(`https://imdb236.p.rapidapi.com/imdb/${id}`);
          console.log('Response from IMDb for trailer: ',imdbResponse);
      } catch (error) {
          // Handle specific errors from Trakt API
          if (error.response?.status === 404) {
              return res.status(404).json({ success: false, message: "Movie not found. Invalid ID." });
          }
          throw error; // Re-throw unexpected errors for generic handling
      }

      const movieTitle = imdbResponse.primaryTitle;
      const movieYear = imdbResponse.startYear;
      console.log('Year: ',movieYear);
      console.log('Title: ',movieTitle);

      // Fallback to YouTube
      const youtubeTrailer = await fetchTrailerFromYouTube(movieTitle, movieYear);
      if (youtubeTrailer) {
          return res.json({ success: true, trailer: youtubeTrailer });
      }

      // No trailer found
      return res.status(404).json({ success: false, message: "Trailer for the requested movie is not currently available." });
  } catch (error) {
      console.error("Error fetching movie trailer:", error.message);

      if (error.response?.status === 404) {
          return res.status(404).json({ success: false, message: "Movie not found. Invalid ID." });
      }

      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
