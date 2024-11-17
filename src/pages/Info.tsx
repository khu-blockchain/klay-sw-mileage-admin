import {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import LVStack from "@/components/atom/LVStack";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Toast,
    useToast,
} from "@chakra-ui/react";
import FormWrapper from "@/components/FormWrapper";
import BasicInput from '@/components/atom/BasicInput';
import { Eye, EyeOff } from 'lucide-react';
import BasicButton from '@/components/atom/BasicButton';
import useAdminStore from '@/store/global/useAdminStore';
import { useUpdateAdminInfo } from '@/feature/queries/user.queries';

const Info = () => {
    const [isShowing, setIsShowing] = useState(false)
    const toast = useToast()
    const {getAdmin} = useAdminStore((state) => state)
    const {admin_id, name, email, department, phone_number} = getAdmin()
    const [isDisabled, setIsDisabled] = useState(true)
    const [form, setForm] = useState({
      email, department, name, phone_number
    })
    const onChangeWalletAddress = () => {
      console.log('지갑주소를 변경했습니다.');
  }
  const {mutate} = useUpdateAdminInfo({
    onSuccessFn: () => {
      toast({
        title     : `변경사항이 저장되었습니다.`,
        status    : 'success',
        isClosable: true,
        position  : "top",
      })
    },
    onErrorFn  : (error: any) => toast({
      title: "변경사항을 저장하지 못했습니다.",
      status: 'error',
      isClosable: true,
      position: "top"
    })
})

    const handleChange = (e: any) => {
      const {id, value} = e.target;
      setForm((prev) => ({
        ...prev,
        [id]: value
      }))
    }

    const handleSaveChange = async () => {
      if(isDisabled) {
        setIsDisabled(false)
      } else {
        try {
          await mutate({
            body: {...form, adminId: admin_id}
          })
        } catch(e) {
          throw e
        }
        setIsDisabled(true)
      }
    }
    
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
            <InputGroup  w={'700px'} flexDir={'column'}>
              <FormLabel>이메일</FormLabel>
              <Input variant={'init'}
                     value={form.email}
                     w={'500px'}
                     onChange={handleChange}
                     disabled={isDisabled}
                     id='email'
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>부서</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={form.department}
                     onChange={handleChange}
                     disabled={isDisabled}
                     id="department"
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>이름</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={form.name}
                     onChange={handleChange}
                     disabled={isDisabled}
                     id='name'
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>전화번호</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={form.phone_number}
                     disabled={isDisabled}
                     onChange={handleChange}
                     id='phone_number'
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <BasicButton onClick={handleSaveChange}>{isDisabled ? "변경하기" : "저장하기"}</BasicButton>
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
            <BasicButton mt={'25px'} onClick={onChangeWalletAddress}>변경하기</BasicButton>
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
