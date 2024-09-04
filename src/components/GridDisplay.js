import React from 'react';
import { Box, SimpleGrid, Image, Text } from '@chakra-ui/react';

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
                src={`http://172.25.234.37:8000/thumbnail?group_id=${result.group_id}&video_id=${result.video_id}&frame_indices=${result.keyframes.join(',')}&is_keyframe=true`} // Thumbnail URL from search results
                alt={`Thumbnail for video ${result.video_id}`}
                objectFit="cover"
                width="100%"
                height="100%"
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
