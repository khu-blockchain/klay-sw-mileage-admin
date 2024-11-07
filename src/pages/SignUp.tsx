import {useState} from 'react';
import InitLayout from "@/components/layout/InitLayout";
import InitContentBox from "@/components/InitContentBox";
import {
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
import BasicLargeButton from "@/components/atom/BasicLargeButton";
import useAdminStore from "@/store/global/useAdminStore";
import {TokenType} from "@/store/types";
import {setLocalStorageData} from "@/utils/webStorage.utils";
import {useLogin} from "@/feature/queries/auth.queries";
import {UserRound, LockKeyhole} from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [id, setId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const {setAdmin} = useAdminStore((state) => state)

  const canSignUp = useIsAble([
    id !== '',
    password !== '',
    confirmPassword !== ''
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

  const onSignUp = () => {
    if(password != confirmPassword) {
        toast({
            title: "비밀번호가 일치하지 않습니다. 다시 확인해주세요.",
            status: 'error',
            isClosable: true
        })
    }
    //회원가입 api 붙이기
  }

  return (
    <InitLayout>
      <InitContentBox
        title={'회원가입'}
        description={<Text color={'var(--chakra-colors-gray-500)'}>SW 마일리지 회원가입 페이지입니다.</Text>}>
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
          <FormControl>
            <InputGroup>
              <InputLeftElement w={'56px'} h={'56px'} pointerEvents='none'>
                <LockKeyhole width={'20px'} color={'var(--chakra-colors-gray-400)'}/>
              </InputLeftElement>
              <Input variant={'init'}
                     pl={'48px'}
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder={'비밀번호를 한번 더 입력해주세요.'}
                     type={'password'}/>
            </InputGroup>
          </FormControl>
          <BasicLargeButton isLoading={isPending} onClick={()=> onSignUp()} isDisabled={!canSignUp} w={'100%'}>회원가입</BasicLargeButton>
        </VStack>
      </InitContentBox>
    </InitLayout>
  );
};

export default SignUp;
