import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, HStack, VStack, useToast } from '@chakra-ui/react';
import { exportFrames } from '../services/api';

const CSVExport = () => {
  const [startMinutes, setStartMinutes] = useState('');
  const [startSeconds, setStartSeconds] = useState('');

  const [firstFrameEndMinutes, setFirstFrameEndMinutes] = useState('');
  const [firstFrameEndSeconds, setFirstFrameEndSeconds] = useState('');

  const [endMinutes, setEndMinutes] = useState('');
  const [endSeconds, setEndSeconds] = useState('');

  const [videoId, setVideoId] = useState('');
  const [filename, setFileName] = useState('');

  const [qa, setQA] = useState('-1')

  const toast = useToast();



  const handleDownload = async () => {
    console.log("Click!")
    const startTimeInSeconds = Number(startMinutes) * 60 + Number(startSeconds);
    const firstFrameEndTimeInSeconds = Number(firstFrameEndMinutes) * 60 + Number(firstFrameEndSeconds);
    const endTimeInSeconds = Number(endMinutes) * 60 + Number(endSeconds);
    console.log(startTimeInSeconds, firstFrameEndTimeInSeconds, endTimeInSeconds )
    try {
      await exportFrames(videoId, startTimeInSeconds, firstFrameEndTimeInSeconds, endTimeInSeconds, filename, qa);
    } catch (error) {
      console.error('Failed to download file', error);
    }
  };


  return (
    <Box p={6} w='100' mx="auto">
      <VStack spacing={4} alignItems="flex-start" w='100%'>
        <HStack  w="100%">
          <FormControl>
              <FormLabel>Video_ID</FormLabel>
              <HStack>
                <Input
                  placeholder="Enter video ID"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Filename</FormLabel>
              <HStack>
                <Input
                  placeholder="Enter filename"
                  value={filename}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Answer</FormLabel>
              <HStack>
                <Input
                  placeholder="Enter QA"
                  value={qa}
                  onChange={(e) => setQA(e.target.value)}
                  w='100'
                />
              </HStack>
            </FormControl>
        </HStack>
        <VStack spacing={4}  w='100%' justify={'around'}>
          <FormControl w='100%'>
            <FormLabel>Start Time</FormLabel>
            <HStack>
              <Input
                placeholder="Minutes"
                type="number"
                value={startMinutes}
                onChange={(e) => setStartMinutes(e.target.value)}
                w='50%'
              />
              <Input
                placeholder="Seconds"
                type="number"
                value={startSeconds}
                onChange={(e) => setStartSeconds(e.target.value)}
                w='50%'
              />
            </HStack>
          </FormControl>

          <FormControl w='100%'>
            <FormLabel>First Frame End Time</FormLabel>
            <HStack>
              <Input
                placeholder="Minutes"
                type="number"
                value={firstFrameEndMinutes}
                onChange={(e) => setFirstFrameEndMinutes(e.target.value)}
                w='50%'
              />
              <Input
                placeholder="Seconds"
                type="number"
                value={firstFrameEndSeconds}
                onChange={(e) => setFirstFrameEndSeconds(e.target.value)}
                w='50%'
              />
            </HStack>
          </FormControl>

          <FormControl w='100%'>
            <FormLabel>End Time</FormLabel>
            <HStack>
              <Input
                placeholder="Minutes"
                type="number"
                value={endMinutes}
                onChange={(e) => setEndMinutes(e.target.value)}
                w='50%'
              />
              <Input
                placeholder="Seconds"
                type="number"
                value={endSeconds}
                onChange={(e) => setEndSeconds(e.target.value)}
                w='50%'
              />
            </HStack>
          </FormControl>
        </VStack>

        <Button colorScheme="orange" alignSelf="center" mt='6' onClick={handleDownload}>
          Export CSV
        </Button>
      </VStack>
    </Box>
  );
};

export default CSVExport;
