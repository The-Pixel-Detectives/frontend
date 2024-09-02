import './App.css';
import DynamicTextInput from './components/DynamicsTextInput';
import SketchInput from './components/SketchInput';
import GridDisplay from './components/GridDisplay';
import { Flex, Container, Box, Center, Button } from '@chakra-ui/react';

function App() {
  return (
    <Container maxW="container.2xl" p={10}>
        <Flex w='100%' justify='space-around' align='top'>
          <Box w='50%' p='2'>
            <DynamicTextInput />
          </Box>
          <Box w='50%' p='2'>
            <SketchInput />
          </Box>
        </Flex>
        <Center w='100%' py={8}>
          <Button
              size='md'
              height='48px'
              width='200px'
              colorScheme='orange'
            >
              Submit
          </Button>
        </Center>
        <Box w='100%'>
          <GridDisplay />
        </Box>
    </Container>
      
  
  );
}

export default App;
