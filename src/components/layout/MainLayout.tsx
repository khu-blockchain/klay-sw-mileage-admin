import {Outlet} from "react-router-dom";
import {Box, Flex, Grid} from "@chakra-ui/react";
import SideBar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
const MainLayout = () => {


  return (
    <Grid templateColumns={'255px 1fr'} w={'100%'} h={'100%'}>
      <SideBar/>
      <Flex direction={'column'} bgColor={'var(--bg-color)'} w={'100%'} h={'100%'} overflow={'auto'}>
        <Header/>
        <Box  w={'100%'} maxW={'1200px'} p={'20px 30px 50px'} m={'0 auto'} >
          <Outlet/>
        </Box>
      </Flex>
    </Grid>
  );
};

export default MainLayout;
