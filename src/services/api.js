
// src/services/api.js

import axios from 'axios';

// Set up the base URL for your API
const API_BASE_URL = 'http://localhost:8000';  // Adjust the URL to match your backend server

// Function to search videos
export const searchVideos = async (sketches, textQueries) => {
  const formData = new FormData();
  sketches.forEach((sketch) => {
    formData.append('sketches', sketch);
  });
  textQueries.forEach((query) => {
    formData.append('text_queries', query);
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/search`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.videos;  // Access 'videos' property from the response
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

// Function to get video thumbnail
export const getVideoThumbnail = async (videoId, frameIndices) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/thumbnail`, {
      params: { video_id: videoId, frame_indices: frameIndices.join(',') },  // Pass frame indices as a comma-separated string
      responseType: 'blob',  // Expect an image response
    });

    // Convert the blob to an object URL to display the image
    const imageObjectURL = URL.createObjectURL(response.data);
    return imageObjectURL;
  } catch (error) {
    console.error('Error getting video thumbnail:', error);
    return '';
  }
};