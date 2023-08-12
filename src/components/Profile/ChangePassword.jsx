import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { changePassword } from '../../redux/actions/Profile';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const [oldpassword, setOldPassword] = useState();
  const [newpassword, setNewPassword] = useState();

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldpassword, newpassword));
  };
  const { loading, message, error } = useSelector(state => state.profile);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <Container py={'16'} minH={'90vh'}>
      <form onSubmit={submitHandler}>
        <Heading
          children="Change Password"
          my={'16'}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
        />
        <VStack spacing={'8'}>
          <Input
            required
            // id="password"
            value={oldpassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            type="password"
            focusBorderColor="yellow.500"
          />
          <Input
            required
            // id="password"
            value={newpassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password"
            type="password"
            focusBorderColor="yellow.500"
          />

          <Button
            isLoading={loading}
            colorScheme="yellow"
            type="submit"
            w={'full'}
          >
            Change
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
