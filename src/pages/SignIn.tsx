import React, {useState} from 'react';
import InitLayout from "@/components/layout/InitLayout";
import InitContentBox from "@/components/InitContentBox";
import {
  Box,
  FormControl,
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
import useAdminStore from "@/store/global/useAdminStore";
import {TokenType} from "@/store/types";
import {setLocalStorageData} from "@/utils/webStorage.utils";
import {useLogin} from "@/feature/queries/auth.queries";
import {UserRound, LockKeyhole} from 'lucide-react';
import { caver } from '@/App';
import { PrivateKey } from 'caver-js/types/packages/caver-wallet/src/keyring/privateKey';

const SignIn = () => {
  const navigate = useNavigate()
  const toast = useToast();
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const {setAdmin} = useAdminStore((state) => state)

  const canLogin = useIsAble([
    id !== '',
    password !== ''
  ])

  const {isPending, mutate} = useLogin({
    onSuccessFn: (data) => {
      const {tokens} = data;
      const refreshToken = tokens[TokenType.REFRESH]
      setLocalStorageData('admin-refresh-token', refreshToken.token);
      setLocalStorageData('admin-refresh-expires', refreshToken.expires);
      setAdmin(data);
      navigate('/')
    },
    onErrorFn  : (error: any) => toast({
      title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status    : 'error',
      isClosable: true,
      position  : "top",
    })
  })
//   const createKeyRing = async(privateKey: string) => {
//     const privateKeyInstance = caver.wallet.keyring.createFromPrivateKey(privateKey)
//     console.log(privateKeyInstance);

//     return privateKeyInstance
// }
  
  const onSignIn = async () => {
    console.log(id, password);
    // const keyRing = await createKeyRing("0x09175d572861168a5b3240b1e8fd818bf6e1b2771b17e4b635a376958f2462b1")
    await mutate({
      body: {loginType: 'ADMIN', id, password: password}
    })
  }

  const onSignUp = () => {
    navigate('/sign-up')
  }

  return (
    <InitLayout>
      <InitContentBox
        title={'로그인'}
        description={<Text color={'var(--chakra-colors-gray-500)'}>SW 마일리지 관리자 페이지입니다.</Text>}>
        <VStack align={'center'} w={'100%'} spacing={'20px'}>
          <FormControl>
            <InputGroup>
              <InputLeftElement w={'56px'} h={'56px'} pointerEvents='none'>
                <UserRound width={'20px'} color={'var(--chakra-colors-gray-400)'}/>
              </InputLeftElement>
              <Input variant={'init'}
                     pl={'48px'}
                     value={id}
                     onChange={(e) => setId(e.target.value)}
                     placeholder={'아이디를 입력해주세요.'}
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement w={'56px'} h={'56px'} pointerEvents='none'>
                <LockKeyhole width={'20px'} color={'var(--chakra-colors-gray-400)'}/>
              </InputLeftElement>
              <Input variant={'init'}
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
          <BasicLargeButton onClick={()=> onSignUp()} w={'100%'}>회원가입</BasicLargeButton>
        </VStack>
      </InitContentBox>
    </InitLayout>
  );
};

export default SignIn;
