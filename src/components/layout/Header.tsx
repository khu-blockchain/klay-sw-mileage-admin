import React, {useMemo} from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {useLocation} from "react-router-dom";
import {removeLocalStorageData} from "@/utils/webStorage.utils";
import BasicButton from "@/components/atom/BasicButton";

const Header = () => {
  const location = useLocation();

  const nav = useMemo(() => {
    const root = location.pathname.split('/')[1];
    const subRoot = location.pathname.split('/')[2];

    switch (root) {
      case '':
        return 'SW 마일리지'
      case 'token': {
        if(subRoot === 'create') return '토큰 생성 및 배포'
        else return '토큰 관리'
      }
      case 'student':
        return '학생 정보 관리'
      case 'list':
        return '신청 내역 관리'
      case 'mint': {
        if(subRoot === 'execute') return '토큰 지급'
        else return '토큰 지급 내역'
      }
      case 'burn': {
        if(subRoot === 'execute') return '토큰 회수'
        else return '토큰 회수 내역'
      }
      case 'rank': {
          return '마일리지 랭킹'
      }
      default :
        return ''
    }
  }, [location])

  const logout = () => {
    removeLocalStorageData('admin-refresh-token');
    removeLocalStorageData('admin-refresh-expires');
    window.location.reload();
  }

  return (
    <Flex w={'100%'} p={'24px 32px'} justify={'space-between'} borderBottom={'1px solid var(--chakra-colors-gray-300)'}>
      <Text fontSize={'24px'} fontWeight={600}>{nav}</Text>
      <BasicButton size={'sm'} onClick={() => logout()}>로그아웃</BasicButton>
    </Flex>
  );
};

export default Header;
