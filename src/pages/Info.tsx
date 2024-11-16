import {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import LVStack from "@/components/atom/LVStack";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
} from "@chakra-ui/react";
import FormWrapper from "@/components/FormWrapper";
import BasicInput from '@/components/atom/BasicInput';
import { Eye, EyeOff } from 'lucide-react';
import BasicButton from '@/components/atom/BasicButton';
import useAdminStore from '@/store/global/useAdminStore';

const Info = () => {
    const [isShowing, setIsShowing] = useState(false)
    const onChangeWalletAddress = () => {
        console.log('지갑주소를 변경했습니다.');
    }
    const {getAdmin} = useAdminStore((state) => state)
    const {admin_id, name, email, department, phone_number} = getAdmin()
    
    
  return (
    <LVStack w={'100%'} spacing={'20px'}>
      <Wrapper>
        <LVStack w={'100%'}>
        <FormWrapper
            title={'내 정보'}
            description='개인정보를 조회, 수정할 수 있습니다.'
          >
            <Box>
              <Box>아이디: {admin_id}</Box>
            </Box>
            <FormControl>
            <InputGroup  w={'700px'}>
            <Box>
              <FormLabel>이메일</FormLabel>
              <Input variant={'init'}
                     value={email}
                     w={'500px'}
                     onChange={(e) => {}}
                     disabled={true}
                     type={'text'}/>
              </Box>
              <BasicButton alignSelf={'end'} mb={'5px'} w={'70px'} h={'50px'} ml={'10px'}
              >변경</BasicButton>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>부서</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={department}
                     onChange={(e) => {}}
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>이름</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={name}
                     onChange={(e) => {}}
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>전화번호</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={phone_number}
                     onChange={(e) => {}}
                     type={'text'}/>
            </InputGroup>
          </FormControl>
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
