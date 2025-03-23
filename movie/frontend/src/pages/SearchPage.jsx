import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setContentType(tab);
    setResults([]); 
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term!");
      return;
    }

    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(Array.isArray(res.data.content) ? res.data.content : []);
    } catch (error) {
      console.error("API Error:", error.response);
      setResults([]);
      if (error.response?.status === 404) {
        toast.error("Nothing found, make sure you are searching under the right category");
      } else {
        toast.error("An error occurred, please try again later");
      }
    }
  };

  const filteredResults = results.filter(
    (result) =>
      result.primaryTitle != null &&
      result.primaryImage != null &&
      result.startYear != null &&
      result.genres != null
  );

  return (
    <div className="bg-[#E6E6FA] min-h-screen text-black">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          {["movie", "tv"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 rounded ${activeTab === tab ? "bg-[#4B0082]" : "bg-gray-800"} hover:bg-purple-900 text-white`}
              onClick={() => handleTabClick(tab)}
            >
              {tab === "movie" ? "Movies" : "TV Shows"}
            </button>
          ))}
        </div>

        <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search for a ${activeTab}`}
            className="w-full p-2 rounded bg-gray-200 text-black"
          />
          <button className="bg-[#4B0082] hover:bg-purple-900 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {filteredResults.length === 0 ? (
          <p className="text-center text-gray-500">No results found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredResults.map((result) => {
              const {
                id,
                primaryTitle,
                originalTitle,
                startYear,
                genres,
                averageRating,
                numVotes,
                primaryImage,
              } = result;
              return (
                <div key={id} className="bg-[#957da5] p-4 rounded text-white">
                  <Link to={`/watch/${id}`} onClick={() => setContentType(activeTab)}>
                    <img src={primaryImage} alt={primaryTitle} className="w-full h-auto rounded" />
                    <h2 className="mt-2 text-xl font-bold">{primaryTitle || originalTitle}</h2>
                    <p className="text-gray-300">{startYear ? `Released: ${startYear}` : "Release date unknown"}</p>
                    <p className="text-gray-300">Genres: {genres.length ? genres.join(", ") : "N/A"}</p>
                    {averageRating !== "N/A" && (
                      <p className="text-yellow-400">⭐ {averageRating} ({numVotes !== "N/A" ? numVotes : "No votes"})</p>
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

export default SearchPage;
