import {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import LVStack from "@/components/atom/LVStack";
import {
    Box,
} from "@chakra-ui/react";
import FormWrapper from "@/components/FormWrapper";
import BasicInput from '@/components/atom/BasicInput';
import { Eye, EyeOff } from 'lucide-react';
import BasicButton from '@/components/atom/BasicButton';
import { useGetAdminInfo } from '@/feature/queries/info.queries';
import useAdminStore from '@/store/global/useAdminStore';

const Info = () => {
    const [isShowing, setIsShowing] = useState(false)
    const onChangeWalletAddress = () => {
        console.log('지갑주소를 변경했습니다.');
    }
    const {getAdmin} = useAdminStore((state) => state)
    const adminId = getAdmin().admin_id

    const {mutate} = useGetAdminInfo({
      onSuccessFn: (data) => {
        // store에 저장
        return;
      },
      onErrorFn  : (error: any) => console.log('getAdminInfo error')
    })
    
    useEffect(() => {
      mutate(adminId)
    },[adminId])

  return (
    <LVStack w={'100%'} spacing={'20px'}>
      <Wrapper>
        <LVStack w={'100%'}>
        <FormWrapper
            title={'내 정보'}
            description='개인정보를 조회, 수정할 수 있습니다.'
          >
            <></>
          </FormWrapper>
          <FormWrapper title={'지갑주소 변경'} description={'비밀키 분실 시 사용할 새로운 지갑 주소를 입력하세요.'}>
          <Box>
            <Box position={'relative'}>
            <BasicInput w={'500px'} placeholder='0x로 시작하는 지갑주소를 붙여넣으세요.' type={isShowing ? 'text':'password'}/>
            {!isShowing ? (
              <Box position={'absolute'} top={'12px'} right={'10px'} zIndex={1000} onClick={() => setIsShowing(true)}><Eye width={'24px'} color={'var(--chakra-colors-gray-400)'}/></Box>
              ) : (
              <Box position={'absolute'} top={'12px'} right={'10px'} zIndex={1000} onClick={() => setIsShowing(false)}><EyeOff width={'24px'} color={'var(--chakra-colors-gray-400)'}/></Box>
              )
            }
            </Box>
            <BasicButton mt={'25px'} w={'100px'} onClick={onChangeWalletAddress}>변경하기</BasicButton>
          </Box>
        </FormWrapper>
        <FormWrapper title={'회원 탈퇴'} description={'계정을 삭제합니다.'}>
            <></>
        </FormWrapper>
        </LVStack>
      </Wrapper>
    </LVStack>

  );
}

export default Info;
