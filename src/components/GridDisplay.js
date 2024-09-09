import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { API_BASE_URL } from "../services/api"


function GridDisplay({ searchResults }) {
  return (
    <Box mt={8} width="100%">
      {/* SimpleGrid to display thumbnails in a grid format */}
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              bg="gray.100"
            >
            <Text>Video ID: {result.video_id}</Text>
            <Text>Frame Indexes: {result.frame_indices.join(', ')}</Text>
            <Text>Key Frame: {result.keyframes.join(', ')}</Text>
            <Text>Score: {result.score}</Text>
            <Text>Local file path: {result.local_file_path}</Text>
		  <Image
			  src={`${API_BASE_URL}/thumbnail?group_id=${result.group_id}&video_id=${result.video_id}&frame_indices=${result.display_keyframe > 0 ? result.keyframes.join(',') : result.frame_indices.join(',')}&is_keyframe=${result.display_keyframe ? 'true' : 'false'}`}
			alt={`Thumbnail for video ${result.video_id}`}
			objectFit="contain"
			width="100%"
			minHeight="200px"
			maxHeight="300px"
		  />
            </Box>
          ))
        ) : (
          <Text>No results found.</Text>
        )}
    </Box>
  );
}

export default GridDisplay;
