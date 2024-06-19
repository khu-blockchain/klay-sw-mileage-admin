import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {Box, Grid, VStack} from "@chakra-ui/react";
import SideBar from "@/components/SideBar";
import {useGetActivityField} from "@/api/activity_field/quries";
import {useGetSwMileageTokenList} from "@/api/sw_mileage_tokens/quries";
import useActivityFieldStore from "@/store/global/useActivityFieldStore";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import useProviderStore from "@/store/global/useProviderStore";

const MainLayout = () => {
  const {data: activityField} = useGetActivityField({})
  const {data: swMileageTokens} = useGetSwMileageTokenList({})
  const {setActivityFields} = useActivityFieldStore(state => state)
  const {setKip7, setSwMileageToken} = useSwMileageTokenStore(state => state)
  const {caver} = useProviderStore(state => state)
  useEffect(() => {
    if(activityField) {
      setActivityFields(activityField)
    }
  }, [activityField])

  useEffect(() => {
    if(swMileageTokens){
      const activateToken = swMileageTokens.find(el => el.is_activated === 1);
      if(!activateToken){
        return;
      }
      setSwMileageToken(activateToken)
      setKip7(caver.kct.kip7.create(activateToken.contract_address))
    }
  }, [caver, swMileageTokens])

  return (
    <Grid templateColumns={'255px 1fr'} w={'100%'} h={'100%'}>
      <SideBar/>
      <VStack bgColor={'var(--bg-color)'} align={'flex-start'} w={'100%'} h={'100%'} overflow={'auto'}>
        <Box>Header</Box>
        <Box h={'100%'} w={'100%'} maxW={'1200px'} p={'50px 30px'} m={'0 auto'} >
          <Outlet/>
        </Box>
      </VStack>
    </Grid>
  );
};

export default MainLayout;
