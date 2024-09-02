import React from 'react';
import { Flex, Box, Text, Image, Input, IconButton} from '@chakra-ui/react';
import { useState, useRef } from 'react';
import { AddIcon  }from '@chakra-ui/icons'


function SketchInput() {
    const [images, setImages] = useState({ sketch: null, optionalSketch: null });
    const sketchFileRef = useRef(null); // Ref to handle sketch input file click
    const optionalSketchFileRef = useRef(null); // Ref to handle optional sketch input file click
  

    const handleImageChange = (event, inputType) => {
        const file = event.target.files[0];
        if (file) {
          setImages((prevImages) => ({
            ...prevImages,
            [inputType]: URL.createObjectURL(file),
          }));
        }
      };

  return (
    <Flex justifyContent="space-between" width="100%" mb={4}>
          {/* Sketch Input */}
          <Box width="48%" p={2} borderRadius="md" position="relative" bg="white">
            <Text mb={2}>Sketch Input</Text>
            <Box
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={() => sketchFileRef.current.click()}
              width="100%"
              height="200px"
              position="relative"
              bg="gray.100"
            >
              {images.sketch ? (
                <Image
                  src={images.sketch}
                  alt="Sketch Preview"
                  objectFit="contain" // Ensure the image is fully contained within the container
                  width="100%"
                  height="100%"
                />
              ) : (
                <IconButton
                  aria-label="Add image"
                  icon={<AddIcon />}
                  size="lg"
                  variant="outline"
                />
              )}
            </Box>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'sketch')}
              ref={sketchFileRef}
              display="none"
            />
          </Box>

          {/* Optional Sketch Input */}
          <Box width="48%" p={2} borderRadius="md" position="relative" bg="white">
            <Text mb={2}>Optional Sketch Input</Text>
            <Box
              borderWidth="1px"
              borderRadius="md"
              overflow="hidden"
              display="flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              onClick={() => optionalSketchFileRef.current.click()}
              width="100%"
              height="200px"
              position="relative"
              bg="gray.100"
            >
              {images.optionalSketch ? (
                <Image
                  src={images.optionalSketch}
                  alt="Optional Sketch Preview"
                  objectFit="contain" // Ensure the image is fully contained within the container
                  width="100%"
                  height="100%"
                />
              ) : (
                <IconButton
                  aria-label="Add image"
                  icon={<AddIcon />}
                  size="lg"
                  variant="outline"
                />
              )}
            </Box>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'optionalSketch')}
              ref={optionalSketchFileRef}
              display="none"
            />
          </Box>
    </Flex>
  );
}

export default SketchInput;
