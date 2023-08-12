import React, { useEffect, useState } from 'react';
import Cursor from '../../../assets/images/cursor3.png';
import SideBar from '../SideBar';
import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { fileUplaodCss } from '../../auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import toast from 'react-hot-toast';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCrearedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);
  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure',
    'App Development',
    'Game Development',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [message]);
  return (
    <Grid
      css={{ cursor: `url(${Cursor}), default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Create Course"
            my={'16'}
            textAlign={['center', 'left']}
          />
          <VStack m={'auto'} spacing={'8'}>
            <Input
              // required
              // id="password"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              // required
              // id="password"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type="text"
              focusBorderColor="purple.300"
            />
            <Input
              // required
              // id="password"
              value={createdBy}
              onChange={e => setCrearedBy(e.target.value)}
              placeholder="Creator Name"
              type="text"
              focusBorderColor="purple.300"
            />

            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              required
              accept="image/*"
              // id="chooseAvatar"
              //   onChange={e => setPassword(e.target.value)}
              //   placeholder="Enter Your Password"
              type="file"
              css={{
                '&::file-selector-button': {
                  ...fileUplaodCss,
                  color: 'purple',
                },
              }}
              onChange={changeImageHandler}
              focusBorderColor="purple.300"
            />

            {imagePrev && (
              <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
            )}
            <Button
              isLoading={loading}
              w={'full'}
              type="submit"
              colorScheme="purple"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>
      <SideBar />
    </Grid>
  );
};

export default CreateCourse;
