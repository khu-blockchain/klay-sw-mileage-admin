import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import InitLayout from "@/components/layout/InitLayout";
import InitContentBox from "@/components/InitContentBox";
import useSignUpStore from "@/store/local/useSignUpStore";
import {Flex, FormControl, FormLabel, VStack, Text, HStack, Select, useToast, Checkbox} from "@chakra-ui/react";
import BasicInput from "@/components/atom/BasicInput";
import BasicButton from "@/components/atom/BasicButton";
import useIsAble from "@/hooks/useAble";
import KaiKasConnectButton from "@/components/atom/KaiKasConnecButtont";
import {bankCode} from "@/assets/constants/bankCode.data";
import BasicSelect from "@/components/atom/BasicSelect";
import {useSignUp} from '@/api/student/quries';
import md5 from "md5";
import {useNavigate} from "react-router-dom";
import useProviderStore from "@/store/global/useProviderStore";

const SignUp = () => {
  const [step, setStep] = useState<number>(0)
  const {reset} = useSignUpStore((state) => state)

  useEffect(() => {
    return () => reset()
  }, [])

  return (
    <InitLayout>
      <InitContentBox title={'회원가입'} description={`회원가입 진행 전, Klay 계정을 소유하지 않은 학생은\n크롬 웹스토어를 통해 Kaikas를 설치해주세요.`}>
        {step === 0 && <Step0 setStep={setStep}/>}
        {step === 1 && <Step1 setStep={setStep}/>}
        {step === 2 && <Step2 setStep={setStep}/>}
      </InitContentBox>
    </InitLayout>
  );
};

export default SignUp;


const Step0 = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {
  const {state, setState} = useSignUpStore((state) => state)

  const canNext = useIsAble([
    state.studentId !== '',
    state.password !== '',
    state.confirmPassword !== '',
    state.confirmPassword === state.password
  ])
  return (
    <VStack align={'center'} w={'100%'} spacing={'24px'}>
      <FormControl>
        <FormLabel>아이디(학번)</FormLabel>
        <BasicInput value={state.studentId}
                    onChange={(e) => setState('studentId', e.target.value)}
                    placeholder={'학번을 입력해주세요.'}
                    type={'text'}/>
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <BasicInput value={state.password}
                    onChange={(e) => setState('password', e.target.value)}
                    placeholder={'비밀번호를 입력해주세요.'}
                    type={'password'}/>
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호 확인</FormLabel>
        <BasicInput value={state.confirmPassword}
                    onChange={(e) => setState('confirmPassword', e.target.value)}
                    placeholder={'동일한 비밀번호를 입력해주세요.'}
                    type={'password'}/>
      </FormControl>
      <Flex w={'100%'} justify={'flex-end'}>
        <BasicButton isDisabled={!canNext} onClick={() => setStep(prev => prev + 1)} size={'md'}>
          다음
        </BasicButton>
      </Flex>
    </VStack>
  )
}

const Step1 = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {
  const {state, setState} = useSignUpStore((state) => state)

  const canNext = useIsAble([
    state.name !== '',
    state.email !== '',
    state.phoneNumber !== '',
    state.department !== '',
  ])

  return (
    <VStack align={'center'} w={'100%'} spacing={'24px'}>
      <FormControl>
        <FormLabel>이름</FormLabel>
        <BasicInput value={state.name}
                    onChange={(e) => setState('name', e.target.value)}
                    placeholder={'이름을 입력해주세요.'}
                    type={'text'}/>
      </FormControl>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <BasicInput value={state.email}
                    onChange={(e) => setState('email', e.target.value)}
                    placeholder={'이메일을 입력해주세요.'}
                    type={'text'}/>
      </FormControl>
      <FormControl>
        <FormLabel>전화번호</FormLabel>
        <BasicInput value={state.phoneNumber}
                    onChange={(e) => setState('phoneNumber', e.target.value)}
                    placeholder={'010-000-0000'}
                    type={'text'}/>
      </FormControl>
      <FormControl>
        <FormLabel>학과</FormLabel>
        <BasicInput value={state.department}
                    onChange={(e) => setState('department', e.target.value)}
                    placeholder={'학과를 입력해주세요.'}
                    type={'text'}/>
      </FormControl>
      <Flex w={'100%'} justify={'space-between'}>
        <BasicButton onClick={() => setStep(prev => prev - 1)} size={'md'}>
          이전
        </BasicButton>
        <BasicButton isDisabled={!canNext} onClick={() => setStep(prev => prev + 1)} size={'md'}>
          다음
        </BasicButton>
      </Flex>
    </VStack>
  )
}

const Step2 = ({setStep}: {setStep: Dispatch<SetStateAction<number>>}) => {
  const {state, setState} = useSignUpStore((state) => state)
  const {caver} = useProviderStore((state) => state)
  const navigate = useNavigate();
  const toast = useToast();
  const [isTermChecked, setIsTermChecked] = useState(false)

  console.log(caver)

  const canSignUp = useIsAble([
    state.walletAddress !== '',
    caver.utils.isAddress(state.walletAddress),
    state.bankAccountNumber !== '',
    state.bankCode !== '',
    isTermChecked
  ])

  const {mutate, isPending} = useSignUp({
    onSuccessFn: (data) => {
      toast({
        title     : `${data.name}님, 회원가입이 완료되었습니다`,
        status    : 'success',
        isClosable: true,
        position  : "top",
      })
      navigate('/sign-in')
      return;
    },
    onErrorFn  : (error: any) => toast({
      title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status    : 'error',
      isClosable: true,
      position  : "top",
    })
  })

  const onSignUp = async () => {
    console.log(3333)
    await mutate({
      body: {
        studentId        : state.studentId,
        password         : md5(state.password),
        passwordConfirm  : md5(state.confirmPassword),
        name             : state.name,
        email            : state.email,
        phoneNumber      : state.phoneNumber,
        department       : state.department,
        walletAddress    : state.walletAddress,
        bankAccountNumber: state.bankAccountNumber,
        bankCode         : state.bankCode,
        personalInformationConsentStatus: isTermChecked ? 1 : 0
      }
    })
  }

  return (
    <VStack align={'center'} w={'100%'} spacing={'24px'}>
      <FormControl>
        <FormLabel>지갑 주소</FormLabel>
        <Text mb={'10px'} color={'var(--chakra-colors-gray-500)'} fontSize={'12px'} fontWeight={400}>
          {'지갑 연결 버튼을 눌러 Kaikas를 연결하거나, 본인의 지갑주소를 입력해 주세요.\n' +
            'Kaikas가 열리지 않는다면 Kaikas 아이콘을 클릭하여 주소를 복사해주세요.'}
        </Text>
        <VStack w={'100%'} spacing={'10px'}>
          <BasicInput value={state.walletAddress}
                      onChange={(e) => setState('walletAddress', e.target.value)}
                      placeholder={'0x로 시작하는 주소를 입력하세요.'}
                      type={'text'}/>
          <KaiKasConnectButton setAddress={(value: string) => setState('walletAddress', value)}/>
        </VStack>

      </FormControl>
      <FormControl>
        <FormLabel>은행 및 계좌번호</FormLabel>
        <Text mb={'10px'} color={'var(--chakra-colors-gray-500)'} fontSize={'12px'} fontWeight={400}>
          은행과 계좌번호를 입력해주세요.(계좌번호 입력시 - 제외)
        </Text>
        <HStack w={'100%'} spacing={'10px'}>
          <BasicSelect w={'140px'} placeholder='은행 선택' onChange={(e) => setState('bankCode', e.target.value)}>
            {Object.keys(bankCode).map((el: string) => (
              <option value={el}>{bankCode[el]}</option>
            ))}
          </BasicSelect>
          <BasicInput flex={1} value={state.bankAccountNumber}
                      onChange={(e) => setState('bankAccountNumber', e.target.value)}
                      placeholder={'계좌번호를 입력하세요.'}
                      type={'text'}/>
        </HStack>

      </FormControl>
      <Flex align={'flex-start'} w={'100%'}>

        <Checkbox isChecked={isTermChecked} onChange={(e) => setIsTermChecked(e.target.checked)}>개인정보 제공에 동의합니다.</Checkbox>
      </Flex>
      <Flex w={'100%'} justify={'space-between'}>
        <BasicButton onClick={() => setStep(prev => prev - 1)} size={'md'}>
          이전
        </BasicButton>
        <BasicButton onClick={() => onSignUp()} isLoading={isPending} isDisabled={!canSignUp} size={'md'}>
          회원가입
        </BasicButton>
      </Flex>
    </VStack>
  )
}
