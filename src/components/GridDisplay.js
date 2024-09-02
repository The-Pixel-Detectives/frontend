import React from "react";
import { Box, SimpleGrid, Image } from "@chakra-ui/react";

function GridDisplay () {

    return(
        <Box mt={8} width="100%">
          <SimpleGrid columns={5} spacing={2} width="100%" py='6'>
            {/* Sample Keyframe 1 */}
            <Box width="100%" height="150px" borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image
                src="https://images.unsplash.com/photo-1534330980656-d201223895ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Keyframe 1"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>

            {/* Sample Keyframe 2 */}
            <Box width="100%" height="150px" borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image
                src="https://cdn.pixabay.com/photo/2024/02/28/07/42/european-shorthair-8601492_640.jpg"
                alt="Keyframe 1"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>

            <Box width="100%" height="150px" borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image
                src="https://images.unsplash.com/photo-1534330980656-d201223895ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Keyframe 1"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>

            <Box width="100%" height="150px" borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image
                src="https://images.unsplash.com/photo-1534330980656-d201223895ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Keyframe 1"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>

            <Box width="100%" height="150px" borderWidth="1px" borderRadius="md" overflow="hidden">
              <Image
                src="https://images.unsplash.com/photo-1534330980656-d201223895ee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Keyframe 1"
                width="100%"
                height="100%"
                objectFit="cover"
              />
            </Box>
          </SimpleGrid>
        </Box>
    )
}

export default GridDisplay;