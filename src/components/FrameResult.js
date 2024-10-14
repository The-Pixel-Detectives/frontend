import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { API_BASE_URL, openVideo } from "../services/api";

function FrameResult({ group_id, video_id, frame_index, timestamp }) {

  const handleImageClick = async () => {
    try {
      await openVideo(group_id, video_id, `${timestamp}`);
    } catch (error) {
      console.error('Failed to Open file', error);
    }
  };

  return (
	<Image
	  src={`${API_BASE_URL}/get-image?group_id=${group_id}&video_id=${video_id}&frame_index=${frame_index}&is_keyframe=true`}
	  alt={`Thumbnail for video ${video_id} ${frame_index}`}
	  objectFit="contain"
	  width="auto"
	  minHeight="200px"
	  maxHeight="300px"
		cursor="pointer"
		className='image-result'
	  onClick={handleImageClick} // Navigate to the preview page when clicked
	/>
  );
}

export default FrameResult;

