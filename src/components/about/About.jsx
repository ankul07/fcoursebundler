import React from 'react';
import {
  Container,
  Heading,
  VStack,
  Stack,
  Avatar,
  Text,
  Button,
  Box,
  HStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import importvideo from '../../assets/videos/video.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import data from '../../assets/docs/TermsAndCondition';
import AdminImage from '../../assets/images/img.jpeg';

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar src={AdminImage} boxSize={['40', '48']} />
      <Text children="Co-Founder" opacity={0.7} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="ankulcode" size={['md', 'xl']} />
      <Text
        alignItems={['center', 'left']}
        children={`Hi,  I am full stack developer and a Teacher. Our mission is to provide a good content at reasonable price`}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      loop
      muted
      controls
      src={importvideo}
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
    ></video>
  </Box>
);

const TandC = ({ termandcondition }) => (
  <Box>
    <Heading
      size={'md'}
      children="Term & Condition"
      textAlign={['center', 'left']}
      my={'4'}
    />
    <Box h={'sm'} p={'4'} overflowY={'scroll'}>
      <Text
        textAlign={['center', 'left']}
        letterSpacing={'widest'}
        fontFamily={'heading'}
      >
        {termandcondition}
      </Text>
      <Heading
        my={'4'}
        size={'xs'}
        children="Refund only applicable for cancellation only 5 days"
      />
    </Box>
  </Box>
);
const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m={'8'} direction={['column', 'row']} align={'center'}>
        <Text
          fontFamily={'cursive'}
          m={'8'}
          textAlign={['center', 'left']}
          children="Get your doubts resolved instantly with live 1:1 mentor support.
          In case you have any doubt at any time while you are watching a video, with an MCQ, a coding assignment or a test - We have you covered!
          We have a network of dedicated teaching assistants to make sure your doubts get resolved quickly and you dont miss on deadlines.  "
        />
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme="yellow">
            Checkout Our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />
      <TandC termandcondition={data} />
      <HStack my={'4'} p={'4'}>
        <RiSecurePaymentFill />
        <Heading
          children="Payment is secured by Razor Pay"
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
        />
      </HStack>
    </Container>
  );
};

export default About;
