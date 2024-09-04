import './App.css';
import DynamicTextInput from './components/DynamicsTextInput';
import SketchInput from './components/SketchInput';
import GridDisplay from './components/GridDisplay';
import { Flex, Container, Box, Center, Button } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { searchVideos, getVideoThumbnail } from './services/api'; // Import API functions

function App() {
  // Refs to access methods in child components
  const textInputRef = useRef();
  const sketchInputRef = useRef();
  // State to hold the combined results and thumbnails
  // const [thumbnails, setThumbnails] = useState([]);
  const [searchResults, setSearchResults] = useState([])

  // Handle submit: collect inputs from both components and search
  const handleSubmit = async () => {
    console.log('Submit button clicked');
    // Get text inputs and sketch files from both components
    const textInputs = textInputRef.current.getInputs();
    const sketchFiles = sketchInputRef.current.getFiles();

    console.log('Text Inputs:', textInputs);
    console.log('Sketch Files:', sketchFiles);

    // Combine text inputs and sketches in a single API call
    const results = await searchVideos(sketchFiles, textInputs);

    // Fetch thumbnails for each search result
    // if (searchResults.length > 0) {
    //   const thumbnailResults = await Promise.all(
    //     searchResults.map(async (result) => {
    //       const thumbnail = await getVideoThumbnail(result.video_id, result.frame_indices);
    //       return { video_id: result.video_id, thumbnail };
    //     })
    //   );
    //   setThumbnails(thumbnailResults); // Update thumbnails state
    // }
    setSearchResults(results)
  };

  return (
    <Container maxW="container.2xl" p={10}>
      <Flex w='100%' justify='space-around' align='top'>
        <Box w='50%' p='2'>
          {/* Attach ref to get inputs from DynamicTextInput */}
          <DynamicTextInput ref={textInputRef} />
        </Box>
        <Box w='50%' p='2'>
          {/* Attach ref to get inputs from SketchInput */}
          <SketchInput ref={sketchInputRef} />
        </Box>
      </Flex>
      <Center w='100%' py={8}>
        {/* Button to trigger combined search */}
        <Button
          size='md'
          height='48px'
          width='200px'
          colorScheme='orange'
          onClick={handleSubmit} // Call handleSubmit on click
        >
          Submit
        </Button>
      </Center>
      <Box w='100%'>
        {/* Pass the search results (thumbnails) to GridDisplay */}
        <GridDisplay searchResults={searchResults} />
      </Box>
    </Container>
  );
}

export default App;
