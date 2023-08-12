import React, { useEffect, useState } from 'react';
import Cursor from '../../../assets/images/cursor3.png';
import SideBar from '../SideBar';
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModel from './CourseModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getCourseLectues } from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();

  const { courses, lectures } = useSelector(state => state.course);
  const { loading, error, message } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const [courseID, setCourseID] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const courseDetailHandler = (courseID, title) => {
    onOpen();
    dispatch(getCourseLectues(courseID));
    setCourseID(courseID);
    setCourseTitle(title);
  };
  const deleteButtonHandler = courseID => {
    console.log(courseID);
    dispatch(deleteCourse(courseID));
  };
  const deleteLectureButtonHandler = async (courseId, LectureId) => {
    console.log(courseId);
    console.log(LectureId);
    await dispatch(deleteLecture(courseId, LectureId));
    dispatch(getCourseLectues(courseID));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectues(courseID));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMssage' });
    }
    dispatch(getAllCourses());
  }, [dispatch, error, message]);
  return (
    <Grid
      css={{ cursor: `url(${Cursor}), default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size={'lg'}>
            <TableCaption>All available Courses</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>

                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map(item => (
                <Row
                  courseDetailHandler={courseDetailHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModel
          isOpen={isOpen}
          onClose={onClose}
          id={courseID}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          courseTitle={courseTitle}
          lectures={lectures}
          loading={loading}
        />
      </Box>
      <SideBar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>

      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isLoading={loading}
            onClick={() => courseDetailHandler(item._id, item.title)}
            variant={'outline'}
            color={'purple.500'}
          >
            View Lectures
          </Button>
          <Button
            isLoading={loading}
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
