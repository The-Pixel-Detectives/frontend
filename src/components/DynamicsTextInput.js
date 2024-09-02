import { Button, VStack, Input, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';

function DynamicTextInput() {
  const [inputs, setInputs] = useState(['']);

  // Function to handle adding a new text input field
  const handleAddInput = () => {
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleRemoveInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1); // Remove the specific input field
    setInputs(newInputs);
  };

  return (
    <HStack w='100%' align='top' justify='space-between' spacing='2' px='2'>
        <Button colorScheme='blue' size='md' onClick={handleAddInput}>Add</Button>
        <VStack spacing='4' flex='1'>
            {inputs.map((input, index) => (
                <HStack key={index} width="100%">
                    <Input 
                        key={index} 
                        value={input} 
                        placeholder='Text Input' 
                        size='md' 
                        variant='outline' 
                        focusBorderColor='blue' 
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        flex="1"
                    />
                    <IconButton
                      aria-label="Remove input"
                      icon={<CloseIcon />}
                      colorScheme="red"
                      onClick={() => handleRemoveInput(index)}
                      size='sm'
                    />
                  </HStack>
            ))}
            
        </VStack>
    </HStack>
  );
}

export default DynamicTextInput;
