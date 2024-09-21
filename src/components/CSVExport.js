import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, HStack, VStack, useToast } from '@chakra-ui/react';
import { exportFrames } from '../services/api';

const CSVExport = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [videoId, setVideoId] = useState('');
  const [filename, setFileName] = useState('');
  const [qa, setQA] = useState('-1')
  const [first_frame_end_time, setFirstFrameEndTime] = useState('')
  const toast = useToast();


  // const downloadCSV = (blob, filename) => {
  //   const fileUrl = window.URL.createObjectURL(new Blob([blob]));
  //   const link = document.createElement('a');
  //   link.href = fileUrl;
  //   link.setAttribute('download', `${filename}.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };


  const handleDownload = async () => {
    console.log("Click!")
    try {
      await exportFrames(videoId, startTime, first_frame_end_time, endTime, filename, qa);
    } catch (error) {
      console.error('Failed to download file', error);
    }
  };


  return (
    <Box p={6} w='100' mx="auto">
      <VStack spacing={4} alignItems="flex-start">
        <HStack spacing={4}  w='100' justify={'around'}>
          <FormControl w='25'>
            <FormLabel>Start Time (seconds)</FormLabel>
            <Input
              placeholder="Enter start time"
              type="number"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              w='100'
            />
          </FormControl>

          <FormControl w='25'>
            <FormLabel>First Frame End (seconds)</FormLabel>
            <Input
              placeholder="First Frame End Time"
              type="number"
              value={first_frame_end_time}
              onChange={(e) => setFirstFrameEndTime(e.target.value)}
              w='100'
            />
          </FormControl>
          
          <FormControl w='25'>
            <FormLabel>End Time (seconds)</FormLabel>
            <Input
              placeholder="Enter end time"
              type="number"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              w='100'
            />
          </FormControl>

          <FormControl w='25'>
            <FormLabel>Video ID</FormLabel>
            <Input
              placeholder="Enter video ID"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              w='100'
            />
          </FormControl>
          
          <FormControl w='25'>
            <FormLabel>Filename</FormLabel>
            <Input
              placeholder="Enter filename"
              value={filename}
              onChange={(e) => setFileName(e.target.value)}
              w='100'
            />
          </FormControl>

          <FormControl w='25'>
            <FormLabel>QA</FormLabel>
            <Input
              placeholder="Enter QA"
              value={qa}
              onChange={(e) => setQA(e.target.value)}
              w='100'
            />
          </FormControl>
        </HStack>

        <Button colorScheme="orange" alignSelf="center" mt='6' onClick={handleDownload}>
          Export CSV
        </Button>
      </VStack>
    </Box>
  );
};

export default CSVExport;
