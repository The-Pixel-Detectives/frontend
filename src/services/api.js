// src/services/api.js
import axios from "axios";

// Set up the base URL for your API
export const API_BASE_URL = "http://172.25.234.37:8000"; // Adjust the URL to match your backend server
// export const API_BASE_URL = "http://localhost:8000"; // Adjust the URL to match your backend server

// Function to search videos
export const searchVideos = async (sketches, textQueries) => {
	const image_ids = []
	console.log(sketches)
	if (sketches.length > 0) {
		for (let i = 0; i < sketches.length; i++) {
			let id = await uploadImage(sketches[i]);
			console.log("ID", id)
			image_ids.push(id);
		}
	}

	try {
		const response = await axios.post(`${API_BASE_URL}/search`, {
			image_ids: image_ids,
			text_queries: textQueries,
			top_k: 20,
		});
		return response.data.videos; // Access 'videos' property from the response
	} catch (error) {
		console.error("Error searching videos:", error);
		return [];
	}
};


const uploadImage = async (image) => {
	const formData = new FormData()
	formData.append("file", image)
	try {
		const response = await axios.post(`${API_BASE_URL}/upload-image`, formData);
		return response.data.id;
	} catch (error) {
		console.error("Error searching videos:", error);
		return null;
	}

}
