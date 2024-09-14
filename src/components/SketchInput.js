import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Flex, Box, Text, Image, Input, IconButton, VStack } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

const SketchInput = forwardRef((props, ref) => {
	const [images, setImages] = useState([]);
	const [files, setFiles] = useState([]);

	const sketchFileRef = useRef(null);
	// const optionalSketchFileRef = useRef(null);

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
		}
	};

	const handleDeleteImage = () => {
		setImages([]);
		setFiles([]);
	};

	// Expose methods to parent via ref
	useImperativeHandle(ref, () => ({
		getFiles: () => Object.values(files).filter(Boolean), // Method to get files
	}));

	return (
		<VStack spacing={4} width="100%">
			<Flex justifyContent="space-between" width="100%">
				<Box
					width="100%"
					p={2}
					borderRadius="md"
					position="relative"
					bg="white"
				>
					<Text mb={2}>Image Input</Text>
					<Box
						borderWidth="1px"
						borderRadius="md"
						overflow="hidden"
						display="flex"
						alignItems="center"
						justifyContent="center"
						onClick={() => {
							!images.sketch && sketchFileRef.current.click();
						}}
						width="100%"
						height="200px"
						position="relative"
						bg="gray.100"
					>
						{images.sketch ? (
							<Box width="100%" height="100%" position="relative">
								<Image
									src={images.sketch}
									alt="Sketch Preview"
									objectFit="contain"
									width="100%"
									height="100%"
								/>
								<IconButton
									aria-label="Add image"
									icon={<CloseIcon />}
									size="lg"
									variant="outline"
									position="absolute"
									color="red"
									top={0}
									right={0}
									zIndex={1}
									onClick={handleDeleteImage}
								/>
							</Box>
						) : (
							<Box>
								<IconButton
									aria-label="Add image"
									icon={<AddIcon />}
									size="lg"
									variant="outline"
								/>
								<Input
									type="file"
									accept="image/*"
									onChange={(e) =>
										handleImageChange(e, "sketch")
									}
									ref={sketchFileRef}
									display="none"
								/>
							</Box>
						)}
					</Box>
				</Box>

				{/* Optional Sketch Input */}
				{/* <Box width="48%" p={2} borderRadius="md" position="relative" bg="white"> */}
				{/*   <Text mb={2}>Optional Image Input</Text> */}
				{/*   <Box */}
				{/*     borderWidth="1px" */}
				{/*     borderRadius="md" */}
				{/*     overflow="hidden" */}
				{/*     display="flex" */}
				{/*     alignItems="center" */}
				{/*     justifyContent="center" */}
				{/*     cursor="pointer" */}
				{/*     onClick={() => optionalSketchFileRef.current.click()} */}
				{/*     width="100%" */}
				{/*     height="200px" */}
				{/*     position="relative" */}
				{/*     bg="gray.100" */}
				{/*   > */}
				{/*     {images.optionalSketch ? ( */}
				{/*       <Image */}
				{/*         src={images.optionalSketch} */}
				{/*         alt="Optional Sketch Preview" */}
				{/*         objectFit="contain" */}
				{/*         width="100%" */}
				{/*         height="100%" */}
				{/*       /> */}
				{/*     ) : ( */}
				{/*       <IconButton */}
				{/*         aria-label="Add image" */}
				{/*         icon={<AddIcon />} */}
				{/*         size="lg" */}
				{/*         variant="outline" */}
				{/*       /> */}
				{/*     )} */}
				{/*   </Box> */}
				{/*   <Input */}
				{/*     type="file" */}
				{/*     accept="image/*" */}
				{/*     onChange={(e) => handleImageChange(e, 'optionalSketch')} */}
				{/*     ref={optionalSketchFileRef} */}
				{/*     display="none" */}
				{/*   /> */}
				{/* </Box> */}
			</Flex>
		</VStack>
	);
});

export default SketchInput;
