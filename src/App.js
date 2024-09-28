import './App.css';
import DynamicTextInput from './components/DynamicsTextInput';
import SketchInput from './components/SketchInput';
import GridDisplay from './components/GridDisplay';
import { Flex, Container, Box, Center, Button } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { searchVideos, getVideoThumbnail } from './services/api'; // Import API functions
import CSVExport from './components/CSVExport';


function App() {
  // Refs to access methods in child components
  const textInputRef = useRef();
  const sketchInputRef = useRef();
  const keywordInputRef = useRef();
  const fuzzyInputRef = useRef();
  // State to hold the combined results and thumbnails
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle submit: collect inputs from both components and search
  const handleSubmit = async () => {
	setIsLoading(true)
    setSearchResults([])
    console.log('Submit button clicked');

    // Get text inputs and sketch files from both components
    const textInputs = textInputRef.current.getInputs();
    const videoId = textInputRef.current.getVideoId(); // Get Video ID
    const sketchFiles = sketchInputRef.current.getFiles();
    const isKeyword = textInputRef.current.getKeyword(); // Get Keyword state
    const isFuzzy = textInputRef.current.getFuzzy(); // Get Fuzzy state

    console.log('Text Inputs:', textInputs);
    console.log('Video ID:', videoId); // Log Video ID
    console.log('Sketch Files:', sketchFiles);
    console.log('Search by keyword', isKeyword);
    console.log('Search by Fuzzy', isFuzzy);

    // Combine text inputs, video ID, and sketches in a single API call
    const results = await searchVideos(videoId, sketchFiles, textInputs); // Pass the video ID to the API

	setIsLoading(false)
    // setSearchResults(results); // Update search results
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
			isLoading={isLoading}
          onClick={handleSubmit} // Call handleSubmit on click
        >
          Submit
        </Button>
      </Center>

      <Box width='100' my='4'>
        <CSVExport />
      </Box>

      <Box w='100%'>
        {/* Pass the search results to GridDisplay */}
        <GridDisplay searchResults={searchResults} />
      </Box>
    </Container>
  );
}

export default App;
