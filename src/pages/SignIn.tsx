import React, {useState} from 'react';
import InitLayout from "@/components/layout/InitLayout";
import InitContentBox from "@/components/InitContentBox";
import {
  Button,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
  VStack
} from "@chakra-ui/react";
import useIsAble from "@/hooks/useAble";
import {useNavigate} from "react-router-dom";
import md5 from 'md5';
import BasicLargeButton from "@/components/atom/BasicLargeButton";
import useStudentStore from "@/store/global/useStudentStore";
import {TokenType} from "@/store/types";
import {setLocalStorageData} from "@/utils/webStorage.utils";
import {useLogin} from "@/feature/queries/auth.queries";
import {UserRound, LockKeyhole} from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const {setStudent} = useStudentStore((state) => state)

  const canLogin = useIsAble([
    id !== '',
    password !== ''
  ])

  const {isPending, mutate} = useLogin({
    onSuccessFn: (data) => {
      const {tokens} = data;
      const refreshToken = tokens[TokenType.REFRESH]
      setLocalStorageData('refresh-token', refreshToken.token);
      setLocalStorageData('refresh-expires', refreshToken.expires);
      setStudent(data);
      navigate('/')
    },
    onErrorFn  : (error: any) => toast({
      title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status    : 'error',
      isClosable: true,
      position  : "top",
    })
  })

  const onSignIn = async () => {
    await mutate({
      body: {loginType: 'STUDENT', id, password: md5(password)}
    })
  }

  return (
    <InitLayout>
      <InitContentBox
        title={'로그인'}
        description={<Text color={'var(--chakra-colors-gray-500)'}>SW 마일리지 신청 페이지입니다.</Text>}>
        <VStack align={'center'} w={'100%'} spacing={'20px'}>
          <FormControl>
            <InputGroup>
              <InputLeftElement w={'56px'} h={'56px'} pointerEvents='none'>
                <UserRound width={'20px'} color={'var(--chakra-colors-gray-400)'}/>
              </InputLeftElement>
              <Input variant={'basic'}
                     pl={'48px'}
                     value={id}
                     onChange={(e) => setId(e.target.value)}
                     placeholder={'학번을 입력해주세요.'}
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement w={'56px'} h={'56px'} pointerEvents='none'>
                <LockKeyhole width={'20px'} color={'var(--chakra-colors-gray-400)'}/>
              </InputLeftElement>
              <Input variant={'basic'}
                     pl={'48px'}
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder={'비밀번호를 입력해주세요.'}
                     type={'password'}/>
            </InputGroup>
          </FormControl>
          <BasicLargeButton isLoading={isPending} onClick={() => onSignIn()} isDisabled={!canLogin} w={'100%'}>
            로그인
          </BasicLargeButton>
          <HStack w={'100%'} align={'flex-start'} spacing={'6px'}>
            <Text color={'var(--chakra-colors-gray-500)'} fontSize={'14px'}>계정이 없으신가요?</Text>
            <Button color={'var(--main-color)'} onClick={() => navigate('/sign-up')} fontWeight={400} variant={'link'}
                    fontSize={'14px'}>
              회원가입
            </Button>
          </HStack>
        </VStack>
      </InitContentBox>
    </InitLayout>
  );
};

export default SignIn;
