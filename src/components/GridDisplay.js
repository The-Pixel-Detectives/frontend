import React from 'react';
import { Box, Stack, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, openVideo } from "../services/api";
import FrameResult from "./FrameResult";

function GridDisplay({ searchResults }) {

	const secondsToHms = (d) => {
    d = Number(d);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

		var mDisplay = m > 0 ? m + "m" : "";
    var sDisplay = s > 0 ? s + "s" : "";
    return mDisplay + sDisplay;
	}

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
						<Box padding={2}>
              <Text>#{index} Video ID: <strong>{result.video_id}</strong></Text>
							<Text>Timestamps: {result.timestamps.map(item => secondsToHms(item)).join(', ')}</Text>
							<Text>Frame Indexes: {result.frame_indices.join(', ')}</Text>
              <Text>FPS: {result.fps}</Text>
							{/* <Text>Key Frame: {result.keyframes.join(', ')}</Text> */}
							{/* <Text>Score: {result.score}</Text> */}
							{/* <Text>Local file path: {result.local_file_path}</Text> */}
						</Box>
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
