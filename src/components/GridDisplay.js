import React from 'react';
import { Box, SimpleGrid, Image, Text } from '@chakra-ui/react';

function GridDisplay({ searchResults }) {
  return (
    <Box mt={8} width="100%">
      {/* SimpleGrid to display thumbnails in a grid format */}
      <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={4} width="100%">
        {searchResults.length > 0 ? (
          searchResults.map((result, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="gray.100"
              height="150px"
            >
              <Image
                src={result.thumbnail} // Thumbnail URL from search results
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
      </SimpleGrid>
    </Box>
  );
}

export default GridDisplay;
