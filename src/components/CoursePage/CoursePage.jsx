import React, { useEffect, useState } from 'react';
import { Grid, Box, Heading, Text, VStack } from '@chakra-ui/react';
import importvideo from '../../assets/videos/video.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectues } from '../../redux/actions/course';
import Loader from '../layout/Loader/Loader';

const CoursePage = ({ user }) => {
  const LectureTitle = 'lectureTitle';
  // const lectureNumber = '0';
  const [lectureNumber, setLectureNumber] = useState(0);
  const { lectures, loading } = useSelector(state => state.course);

  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourseLectues(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to="/subscribe" />;
  }
  return loading ? (
    <Loader />
  ) : (
    <>
      <Grid minH="90vh" templateColumns={['1fr', '3fr 1fr']}>
        {lectures && lectures.length > 0 ? (
          <>
            <Box>
              <video
                //   autoPlay
                width={'100%'}
                height={'10px'}
                controls
                src={lectures[lectureNumber].video.url}
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
              ></video>
              <Heading
                m={'4'}
                children={`#${lectureNumber + 1} ${
                  lectures[lectureNumber].title
                }`}
              />
              <Heading m="4" children="Description" />
              <Text m="4" children={lectures[lectureNumber].description} />
            </Box>
            <VStack>
              {lectures.map((element, index) => (
                <button
                  onClick={() => setLectureNumber(index)}
                  key={element._id}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    textAlign: 'center',
                    margin: 0,
                    borderBottom: '1px solid rgba(0,0,0,0.2',
                  }}
                >
                  <Text noOfLines={1}>
                    #{index + 1} {element.title}
                  </Text>
                </button>
              ))}
            </VStack>
          </>
        ) : (
          <Heading children="no lectures found" />
        )}
      </Grid>
    </>
  );
};

export default CoursePage;
