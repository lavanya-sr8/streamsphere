import { fetchFromIMDB } from "../services/tmdb.service.js";

async function fetchAndHandleResponse(url, endpointType, req, res) {
	try {
		const data = await fetchFromIMDB(url);
		console.log(`Fetched ${endpointType} data:`, data);

		if (!data || !data.results || data.results.length === 0) {
			return res.status(404).json({ success: false, message: `No ${endpointType} results found` });
		}

		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		console.error(`Error fetching ${endpointType}:`, error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getTrendingTv(req, res) {
	const url = "https://imdb236.p.rapidapi.com/imdb/most-popular-tv";
	await fetchAndHandleResponse(url, "trending TV", req, res);
}

export async function getTvDetails(req, res) {
	const { id } = req.params;
	const url = `https://imdb236.p.rapidapi.com/imdb/${id}`;
	await fetchAndHandleResponse(url, `TV details for ID: ${id}`, req, res);
}

// export async function getTvsByCategory(req, res) {
// 	const { category } = req.params;
// 	try {
// 		const data = await fetch(`https://imdb236.p.rapidapi.com/imdb/${category}`);
// 		res.status(200).json({ success: true, content: data.results });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }
