import React from 'react';
import { Container, Heading, VStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

const PaymentFail = () => {
  return (
    <Container h={'90vh'}>
      <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
        <RiErrorWarningFill size={'5rem'} />
        <Heading textTransform={'uppercase'} children="Payment Fail" />
        <Link to="/subscribe">
          <Button variant={'ghost'}>Try Again</Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default PaymentFail;
