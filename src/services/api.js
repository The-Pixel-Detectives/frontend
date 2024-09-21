// src/services/api.js
import axios from "axios";

// Set up the base URL for your API
export const API_BASE_URL = "http://172.25.234.37:8000"; // Adjust the URL to match your backend server
export const HA_API_BASE_URL = "http://10.247.209.215:8000"
// export const API_BASE_URL = "http://localhost:8000"; // Adjust the URL to match your backend server

// Function to search videos
export const searchVideos = async (videoID, sketches, textQueries) => {
	const image_ids = []
	console.log(sketches)
	if (sketches.length > 0) {
		for (let i = 0; i < sketches.length; i++) {
			let id = await uploadImage(sketches[i]);
			console.log("ID", id)
			image_ids.push(id);
		}
	}
  console.log('In api.js', textQueries)
	try {
		const response = await axios.post(`${API_BASE_URL}/search`, {
			image_ids: image_ids,
			text_queries: textQueries,
			top_k: 20,
      video_id: videoID
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

export const fetchVideoPreview = async (groupId, videoId, startIndex, endIndex, numSkipFrames) => {
    try {
        // Make the GET request to fetch the video preview as binary data
        const response = await axios.get(`${API_BASE_URL}/get-video-preview`, {
            params: {
                group_id: groupId,
                video_id: videoId,
                start_index: startIndex,
                end_index: endIndex,
                num_skip_frames: numSkipFrames,
            },
            responseType: 'blob', // Important to set response type as blob for binary data
        });

        console.log('Full API response:', response); // Log the full response object

        // Create a URL from the binary data (blob) and return it
        const imageUrl = URL.createObjectURL(response.data);
        return [imageUrl]; // Return as an array since we're handling one or more images
    } catch (error) {
        console.error("Error fetching video preview:", error);
        return [];
    }
};

export const translateQuery = async (query, numFrames) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/translate`, {
      query: query,
      num_frames: numFrames,
    });
    return response.data.sentences;  // Access the 'sentences' array from the response
  } catch (error) {
    console.error('Error during translation:', error);
    throw error;  // Re-throw the error to be handled in the component
  }
};


export const exportFrames = async (videoId, startTime, first_frame_end_time, endTime, filename, qa) => {
  try {
    const response = await axios.get(`${HA_API_BASE_URL}/export-csv`, {
      params: {
        video_id: videoId,
        start_time: startTime,
        first_frame_end_time: first_frame_end_time,
        end_time: endTime,
        filename: filename,
        qa: qa
      },
      responseType: 'blob'  
    });

    // Create a link to download the CSV file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.csv`);  // Set filename for download
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  } catch (error) {
    console.error('Error during frame export:', error);
    throw error;
  }
};

