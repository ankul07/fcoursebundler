import {
  Container,
  Heading,
  VStack,
  Box,
  Text,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference');
  return (
    <Container h={'90vh'} p={'16'}>
      <Heading my={'8'} textAlign={'center'} children="You have Pro pack" />
      <VStack
        boxShadow={'lg'}
        pb={'16'}
        alignItems={'center'}
        borderRadius={'lg'}
      >
        <Box w="full" bg="yellow.400" css={{ borderRadius: '8px 8px 0 0 ' }}>
          <Text color={'black'} p={'4'} children="Payment Success" />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text>
              Congratulation you're on pro member. you have access to preminium
              content
            </Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>
        <Link to="/profile">
          <Button variant={'ghost'}>Go to Profile</Button>
        </Link>
        <Heading size={'xs'}>Reference: {reference}</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
