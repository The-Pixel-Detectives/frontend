import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, VStack, Input, HStack, IconButton, Box, Textarea } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const DynamicTextInput = forwardRef((props, ref) => {
  const [inputs, setInputs] = useState(['']);

  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    console.log(`Updated text:`, newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getInputs: () => inputs, // Method to get text inputs
  }));

  return (
    <Box>
      <HStack w="100%" align="top" justify="space-between" spacing="2" px="2">
        <Button colorScheme="blue" size="md" onClick={handleAddInput}>
          Add Text Query
        </Button>
        <VStack spacing="4" flex="1">
          {inputs.map((input, index) => (
            <HStack key={index} width="100%">
              <Textarea
                value={input}
                placeholder="Text Input"
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
      </HStack>
    </Box>
  );
});

export default DynamicTextInput;
