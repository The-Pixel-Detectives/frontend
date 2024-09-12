import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, VStack, HStack, IconButton, Box, Input, Textarea } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

// Simulating the API call for translation
const simulateTranslationApiCall = async (vietnameseText) => {
  // Simulating an API that takes the Vietnamese text and returns an array of translated strings
  return vietnameseText.split('.').map((sentence, idx) => `Translated sentence ${idx + 1}: ${sentence.trim()}`);
};

const DynamicTextInput = forwardRef((props, ref) => {
  const { onSubmit } = props; // Accept the onSubmit function from App.js as a prop
  const [inputs, setInputs] = useState([]); // Dynamic input fields for translations
  const [vietnamesePrompt, setVietnamesePrompt] = useState(''); // Vietnamese input field
  const [videoId, setVideoId] = useState(''); // Video ID input field

  // Function to handle adding a new empty input field
  const handleAddInput = (translatedText = '') => {
    setInputs([...inputs, translatedText]); // Add new input (empty or with value)
  };

  // Handle translation using a simulated API call
  const handleTranslate = async () => {
    try {
      const translatedArray = await simulateTranslationApiCall(vietnamesePrompt); // Simulate API call
      setInputs(translatedArray); // Display the translated array in the text areas
      console.log('Original Vietnamese Input:', vietnamesePrompt);
      console.log('Translated Array:', translatedArray); // Log the translated array
    } catch (error) {
      console.error("Error during translation:", error);
    }
  };

  // Function to handle input field changes
  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    console.log(`Updated Input at index ${index}:`, newInputs);
  };

  // Function to remove a specific input field
  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1); // Remove the specific field
    setInputs(newInputs);
    console.log(`Input removed at index ${index}. Remaining inputs:`, newInputs);
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getInputs: () => inputs, // Method to get translated inputs
    getVideoId: () => videoId, // Method to get the videoId
  }));

  return (
    <Box>
      {/* Video ID input field */}
      <HStack w="100%" align="top" justify="space-between" spacing="2" px="2" mb="4">
        <Input
          value={videoId}
          placeholder="Enter Video ID"
          size="md"
          variant="outline"
          focusBorderColor="blue"
          onChange={(e) => setVideoId(e.target.value)}
          flex="1"
        />
      </HStack>

      {/* Vietnamese Input with Translate Button */}
      <HStack w="100%" align="top" justify="space-between" spacing="2" px="2" mb="4">
        <Button colorScheme="green" size="md" onClick={handleTranslate}>
          Translate
        </Button>
        <Textarea
          value={vietnamesePrompt}
          placeholder="Enter Vietnamese text"
          size="md"
          variant="outline"
          focusBorderColor="blue"
          onChange={(e) => setVietnamesePrompt(e.target.value)}
          flex="1"
        />
      </HStack>

      {/* Dynamic Translation Input Fields */}
      <VStack spacing="4" w="100%" px="2" mb="4">
        {inputs.map((input, index) => (
          <HStack key={index} width="100%">
            <Textarea
              value={input}
              placeholder="Translated Text"
              size="md"
              variant="outline"
              focusBorderColor="blue"
              onChange={(e) => handleInputChange(index, e.target.value)}
              flex="1"
            />
            <IconButton
              aria-label="Remove input"
              icon={<CloseIcon />}
              colorScheme="red"
              onClick={() => handleRemoveInput(index)}
              size="sm"
            />
          </HStack>
        ))}
      </VStack>

      {/* Align "Add Text Query" button to the left */}
      <Box textAlign="left" px="2" mb="4">
        <Button colorScheme="blue" size="md" onClick={() => handleAddInput('')}>
          Add Text Query
        </Button>
      </Box>
    </Box>
  );
});

export default DynamicTextInput;
