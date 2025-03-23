import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const options = {
          method: "GET",
          url: "https://imdb236.p.rapidapi.com/imdb/india/top-rated-indian-movies",
          headers: {
            "X-RapidAPI-Key": "f5d7f1772bmsh97386152575fc8ap1a4e40jsnf068ede79e9d",
            "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const movieData = response?.data || [];

        if (!Array.isArray(movieData) || movieData.length === 0) {
          throw new Error("No movies found in API response.");
        }

        setMovies(movieData.slice(0, 20));
        setFilteredResults(movieData.slice(0, 20));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = movies.filter((movie) =>
      movie?.primaryTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResults(filtered);
  };

  return (
    <div className="bg-[#E6E6FA] min-h-screen text-black">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredResults.length === 0 ? (
          <p className="text-center text-gray-500">No results found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredResults.map((movie) => {
              const {
                id,
                primaryTitle,
                startYear,
                genres,
                averageRating,
                numVotes,
                primaryImage,
              } = movie;

              return (
                <div key={id} className="bg-[#957da5] p-4 rounded text-white">
                  <Link to={`/watch/${id}`}>
                    <img
                      src={primaryImage || "https://dummyimage.com/300x450/333/ffffff&text=No+Image"}
                      alt={primaryTitle || "Unknown Title"}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">{primaryTitle || "Unknown Title"}</h2>
                    <p className="text-gray-300">{startYear ? `Released: ${startYear}` : "Release date unknown"}</p>
                    <p className="text-gray-300">
                      Genres: {genres && genres.length ? genres.join(", ") : "N/A"}
                    </p>
                    {averageRating !== "N/A" && (
                      <p className="text-yellow-400">
                        ⭐ {averageRating} ({numVotes !== "N/A" ? numVotes : "No votes"})
                      </p>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopRatedMovies;