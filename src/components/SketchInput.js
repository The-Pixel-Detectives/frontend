import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Flex, Box, Text, Image, Input, IconButton, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const SketchInput = forwardRef((props, ref) => {
  const [images, setImages] = useState({ sketch: null, optionalSketch: null });
  const [files, setFiles] = useState({ sketch: null, optionalSketch: null });

  const sketchFileRef = useRef(null);
  const optionalSketchFileRef = useRef(null);

  const handleImageChange = (event, inputType) => {
    const file = event.target.files[0];
    if (file) {
      setImages((prevImages) => ({
        ...prevImages,
        [inputType]: URL.createObjectURL(file),
      }));
      setFiles((prevFiles) => ({
        ...prevFiles,
        [inputType]: file,
      }));
      console.log(`Updated ${inputType} file:`, file);
    }
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getFiles: () => Object.values(files).filter(Boolean), // Method to get files
  }));

  return (
    <VStack spacing={4} width="100%">
      <Flex justifyContent="space-between" width="100%">
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
                objectFit="contain"
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
                objectFit="contain"
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
    </VStack>
  );
});

export default SketchInput;
