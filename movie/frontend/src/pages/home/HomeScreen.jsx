import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";

const HomeScreen = () => {
	const { contentType } = useContentStore();

	return (
		<>
			<div className="min-h-screen w-full py-10 bg-gradient-to-r from-[#e1bee7] via-[#d38cd1] to-[#6b21a8] text-[#4B0082]">
			<Navbar />

				{/* Welcome Section */}
				<div className="flex flex-col items-center justify-center text-center py-16">
					<h1 className="text-4xl md:text-6xl font-extrabold">Welcome to MovieFlix</h1>
					<p className="mt-4 text-lg max-w-2xl">
						Discover trending {contentType === "movie" ? "movies" : "TV shows"} and explore a wide range of top-rated content.
					</p>

					
				</div>
				<MovieSlider />
			</div>

			{/* Trending Movies Section
			<div className="flex flex-col gap-10">
				
			</div> */}
		</>
	);
};

export default HomeScreen;
