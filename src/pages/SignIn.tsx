import React, {useState} from 'react';
import InitLayout from "@/components/layout/InitLayout";
import InitContentBox from "@/components/InitContentBox";
import {Button, Flex, FormControl, FormLabel, Input, useToast, VStack} from "@chakra-ui/react";
import useIsAble from "@/hooks/useAble";
import {useNavigate} from "react-router-dom";
import md5 from 'md5';
import BasicButton from "@/components/atom/BasicButton";
import useStudentStore from "@/store/global/useStudentStore";
import {TokenType} from "@/store/types";
import {setLocalStorageData} from "@/utils/webStorage.utils";
import {useLogin} from "@/feature/queries/auth.queries";
import BasicInput from "@/components/atom/BasicInput";

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
      console.log(refreshToken.expires)
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
      body : {loginType: 'STUDENT',id, password: md5(password)}
    })
  }

  return (
    <InitLayout>
      <InitContentBox title={'로그인'}>
        <VStack align={'center'} w={'100%'} spacing={'20px'}>
          <FormControl>
            <FormLabel>아이디(학번)</FormLabel>
            <BasicInput value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder={'학번을 입력해주세요.'}
                        type={'text'}/>
          </FormControl>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <BasicInput value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'비밀번호를 입력해주세요.'}
                        type={'password'}/>
          </FormControl>
          <BasicButton isLoading={isPending} onClick={() => onSignIn()} isDisabled={!canLogin} w={'100%'}>
            로그인
          </BasicButton>
          <Flex w={'100%'} justify={'flex-end'}>
            <Button onClick={() => navigate('/sign-up')} variant={'link'} size={'sm'}>
              회원가입
            </Button>
          </Flex>
        </VStack>

      </InitContentBox>
    </InitLayout>
  );
};

export default SignIn;
