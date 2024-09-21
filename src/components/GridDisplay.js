import React from 'react';
import { Box, Stack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, openVideo } from "../services/api";
import FrameResult from "./FrameResult";

function GridDisplay({ searchResults }) {

  const handleVideoClick = async (videoID) => {
    console.log("Click!")
    try {
      await openVideo(videoID, '200');
    } catch (error) {
      console.error('Failed to download file', error);
    }
  };

  return (
    <Box mt={8} width="100%">
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
            <Text>Timestamps: {result.timestamps.join(', ')}</Text>
            {/* <Text>Key Frame: {result.keyframes.join(', ')}</Text> */}
            <Text>Score: {result.score}</Text>
            <Text>Local file path: {result.local_file_path}</Text>
						<Stack direction="row" gap={0} wrap="wrap" width="100%">
							{result.frame_indices.map((value, index) => <FrameResult
							group_id={result.group_id}
							video_id={result.video_id}
							frame_index={value}
							timestamp={result.timestamps[index]}
							/>)}
						</Stack>
          </Box>
        ))
      ) : (
        <Text>No results found.</Text>
      )}
    </Box>
  );
}

export default GridDisplay;
