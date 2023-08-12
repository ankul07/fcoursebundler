import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Cursor from '../../../assets/images/cursor3.png';
import SideBar from '../SideBar';
import { RiArrowDownSLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from '../../layout/Loader/Loader';

// DataBox components
const DataBox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p={'8'}
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />
      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownSLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={0.6} children="Since Last Month" />
  </Box>
);

// Bar components
const Bar = ({ title, value, profit }) => (
  <Box py={'4'} px={['0', '20']}>
    <Heading children={title} size={'sm'} mb={'2'} />
    <HStack w={'full'} alignItems={'center'}>
      <Text children={profit ? '0%' : value} />
      <Progress w={'full'} value={profit ? value : 0} color={'purple'} />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);
const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    loading,
    stats,
    userCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    userPercentage,
    subscriptionProfit,
    viewsProfit,
    userProfit,
  } = useSelector(state => state.admin);
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);
  return (
    <Grid
      css={{ cursor: `url(${Cursor}), default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      {loading || !stats ? (
        <Loader color="purple.500" />
      ) : (
        <Box boxSizing="border-box" py={'16'} px={['4', '0']}>
          {/* <Text
            textAlign={'center'}
            opacity={0.5}
            children={`Last Change was on ${
              String(new Date(stats[11].createdAt)).split('G')[0]
            }`}
          /> */}
          {stats && stats.length > 11 && stats[11].createdAt && (
            <Text
              textAlign={'center'}
              opacity={0.5}
              children={`Last Changes on ${
                String(new Date(stats[11].createdAt)).split('G')[0]
              }`}
            />
          )}
          <Heading
            children="Dashboard"
            ml={['0', '16']}
            mb={'16'}
            textAlign={['center', 'left']}
          />
          <Stack
            direction={['column', 'row']}
            minH={'24'}
            justifyContent={'space-evenly'}
          >
            <DataBox
              title="Views"
              qty={viewsCount}
              qtyPercentage={viewsPercentage}
              profit={viewsProfit}
            />
            <DataBox
              title="Users"
              qty={userCount}
              qtyPercentage={userPercentage}
              profit={userProfit}
            />
            <DataBox
              title="Subscription"
              qty={subscriptionCount}
              qtyPercentage={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </Stack>

          <Box
            m={['0', '16']}
            borderRadius={'lg'}
            p={['0', 16]}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size={'md'}
              children="Views Graph"
              pt={['8', '0']}
              ml={['0', '16']}
            />
            {/* Line Graph Here  */}
            <LineChart views={stats.map(item => item.views)} />
          </Box>
          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p={'4'}>
              <Heading
                textAlign={['center', 'left']}
                size={'md'}
                children="Progress Bar"
                my={'8'}
                ml={['0', '16']}
              />
              <Box>
                <Bar
                  profit={viewsProfit}
                  title="Views"
                  value={viewsPercentage}
                />
                <Bar profit={userProfit} title="Users" value={userPercentage} />
                <Bar
                  profit={subscriptionProfit}
                  title="Subscription"
                  value={subscriptionPercentage}
                />
              </Box>
            </Box>
            <Box p={['0', '16']} boxSizing={'border-box'} py={'4'}>
              <Heading children="Users" />
              <DoughnutChart
                users={[subscriptionCount, userCount - subscriptionCount]}
              />
            </Box>
          </Grid>
        </Box>
      )}
      <SideBar />
    </Grid>
  );
};

export default Dashboard;
