import React, {useMemo} from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const nav = useMemo(() => {
    switch (location.pathname.split('/')[1]){
      case '': return 'SW 마일리지'
      case 'register': return 'SW 마일리지 신청'
      case 'list': return '신청 내역'
      case 'profile': return '내 정보'
      default : return ''
    }
  }, [location])

  return (
    <Flex w={'100%'} p={'24px 32px'} borderBottom={'1px solid var(--chakra-colors-gray-300)'}>
      <Text fontSize={'24px'} fontWeight={600}>{nav}</Text>
    </Flex>
  );
};

export default Header;
