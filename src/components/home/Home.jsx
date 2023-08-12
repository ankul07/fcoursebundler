import React from 'react';
import {
  Button,
  Heading,
  Stack,
  VStack,
  Text,
  Image,
  Box,
  color,
  HStack,
} from '@chakra-ui/react';
import './home.css';
import { Link } from 'react-router-dom';
import vg from '../../assets/images/bg.jpg';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import importvideo from '../../assets/videos/video.mp4';
const Home = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '18', '20', '56']}
        >
          <VStack
            width={'full'}
            alignItems={['center', 'flex-end']}
            spacing={'8'}
          >
            <Heading children="Learn From The Expert" size={'2xl'} />
            <Text
              fontSize={'2xl'}
              fontFamily={'cursive'}
              textAlign={['center', 'left']}
              children="find valueable content at reasonable price"
            />
            <Link to="/courses">
              <Button size={'lg  '} colorScheme="yellow">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize={'md'}
            src={vg}
            objectFit={'contain'}
          />
        </Stack>
      </div>
      <Box padding={'8'} bg={'blackAlpha.800'}>
        <Heading
          textAlign={'center'}
          fontFamily={'body'}
          color={'yellow.400'}
          children="Our Brands"
        />
        <HStack
          className="brandsbanner"
          justifyContent={'space-evenly'}
          marginTop={'4'}
        >
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video
          //   autoPlay
          controls
          src={importvideo}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
      </div>
    </section>
  );
};

export default Home;
