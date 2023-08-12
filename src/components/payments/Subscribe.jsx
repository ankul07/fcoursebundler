import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import logo from '../../assets/images/bg.jpg';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState();
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );

  const { error: courseError } = useSelector(state => state.course);

  const submitHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);

    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const option = {
          key,
          name: 'CourseBundler',
          description: 'get access to all premimum content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverificatin`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'ankulcode',
          },
          theme: {
            color: '#FFC800',
          },
        };
        const razor = new window.Razorpay(option);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    user.name,
    user.email,
    key,
    subscriptionId,
    courseError,
  ]);
  return (
    <Container h={'90vh'} p={'16'}>
      <Heading children="Welcome" my={'8'} textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        borderRadius={'lg'}
        spacing={'9'}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text children="Pro Pack - €50.00" color={'black'} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children="Join Pro Pack and Get Access to all content" />
            <Heading size={'md'} children="€50 only" />
          </VStack>

          <Button
            isLoading={loading}
            my={'8'}
            w={'full'}
            colorScheme="yellow"
            onClick={submitHandler}
          >
            Buy Now
          </Button>
        </Box>

        <Box
          bg={'blackAlpha.600'}
          p={'4'}
          css={{ borderRadius: '0 0 8px 8px' }}
        >
          <Heading
            size={'sm'}
            children="100% refund at cancellation"
            color={'white'}
            textTransform={'uppercase'}
          />
          <Text
            fontSize={'xs'}
            color={'white'}
            children="Terms & Condition Apply"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
