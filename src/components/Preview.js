import React, { useState, useEffect } from 'react';
import { Box, Input, Button, Image, VStack, Text, SimpleGrid} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { fetchVideoPreview } from '../services/api'; // Import the API call function

function useQuery() {
  return new URLSearchParams(useLocation().search); // Hook to get URL query params
}

function Preview() {
  const [groupId, setGroupId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [startIndex, setStartIndex] = useState('');
  const [endIndex, setEndIndex] = useState('');
  const [numSkipFrames, setNumSkipFrames] = useState('');
  const [images, setImages] = useState([]); // Initialize as an empty array

  const query = useQuery(); // Extract query parameters

  useEffect(() => {
    // Set initial values from query parameters when the component loads
    setGroupId(query.get('group_id') || '');
    setVideoId(query.get('video_id') || '');
  }, [query]);

  // Function to fetch images based on input values
  const handleFetchImages = async () => {
    const images = await fetchVideoPreview(groupId, videoId, startIndex, endIndex, numSkipFrames);
    setImages(images || []); // Ensure we set images as an array even if the API returns undefined
  };

  return (
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold">Video Preview</Text>
      <SimpleGrid columns={2} spacing={4} mt={4}>
  <Box>
    <Text>Group ID:</Text>
    <Input
      placeholder="Enter group ID"
      value={groupId}
      onChange={(e) => setGroupId(e.target.value)}
    />
  </Box>

  <Box>
    <Text>Video ID:</Text>
    <Input
      placeholder="Enter video ID"
      value={videoId}
      onChange={(e) => setVideoId(e.target.value)}
    />
  </Box>

  <Box>
    <Text>Start Index:</Text>
    <Input
      placeholder="Enter start index"
      value={startIndex}
      onChange={(e) => setStartIndex(e.target.value)}
    />
  </Box>

  <Box>
    <Text>End Index:</Text>
    <Input
      placeholder="Enter end index"
      value={endIndex}
      onChange={(e) => setEndIndex(e.target.value)}
    />
  </Box>

  <Box>
    <Text>Number of Skip Frames:</Text>
    <Input
      placeholder="Enter number of skip frames"
      value={numSkipFrames}
      onChange={(e) => setNumSkipFrames(e.target.value)}
    />
  </Box>


    
</SimpleGrid>

  <Button colorScheme="blue" onClick={handleFetchImages} width="100%">
      Fetch Images
    </Button>

      {/* Display the images fetched from the API */}
      <Box mt={8}>
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <Image key={index} src={image} alt={`Preview ${index}`} mb={4}  objectFit="contain"
            width="100%"
            minHeight="200px"
            maxHeight="300px" />
          ))
        ) : (
          <Text>No images to display.</Text>
        )}
      </Box>
    </Box>
  );
}

export default Preview;
