import React, {useEffect, useState} from 'react';
import {Flex, Grid, useToast} from "@chakra-ui/react";
import {useNavigate, useSearchParams} from "react-router-dom";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import useAble from "@/hooks/useAble";
import {useBurnMileageToken, useMintMileageToken} from "@/feature/queries/swMileageTokens.queries";
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import WithLabel from "@/components/WithLabel";
import BasicInput from "@/components/atom/BasicInput";
import BasicButton from "@/components/atom/BasicButton";

const BurnSwMileageExecute = () => {
  const toast = useToast();
  const navigate = useNavigate()
  const {swMileageToken} = useSwMileageTokenStore(state => state)
  const [searchParams] = useSearchParams();

  const [studentId, setStudentId] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const isAble = useAble([
    studentId !== '',
    amount !== '',
  ])

  const {mutate, isPending} = useBurnMileageToken({
    onSuccessFn: async (res) => {
      toast({
        title     : `마일리지 토큰이 회수되었습니다.`,
        status    : 'success',
        isClosable: true,
        position  : "top",
      })
      navigate('/token/manage')
    },
    onErrorFn  : (error: any) => toast({
      title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status    : 'error',
      isClosable: true,
      position  : "top",
    })
  })

  const burnSwMileage = async() => {
    if(!swMileageToken) return;
    await mutate({
      params: {
        swMileageTokenId: swMileageToken.sw_mileage_token_id
      },
      body: {
        studentId,
        amount: Number(amount)
      }
    })
  }

  useEffect(() => {
    const queryStudentId = searchParams.get('studentId');
    const queryAmount = searchParams.get('amount');
    setStudentId(queryStudentId ?? '');
    setAmount(queryAmount ?? '');
  }, [searchParams])


  return (
    <Wrapper direction={'column'}>
      <FormWrapper
        title={'토큰 회수'}
        description={'마일리지 토큰을 회수 할 학생의 학번과 수량을 입력하세요.'}>
        <Grid w={'100%'} templateColumns={'repeat(1, 1fr)'} gap={'20px'}>
          <WithLabel label={'학번'} description={'마일리지 토큰을 회수 할 학생의 학번입니다.'}>
            <BasicInput
              w={'500px'}
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder={'학번을 입력하세요.'}/>
          </WithLabel>
          <WithLabel label={'수량'} description={'회수할 마일리지 토큰 수량입니다.'}>
            <BasicInput
              w={'500px'}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder={'토큰 수량을 입력하세요.'}/>
          </WithLabel>
        </Grid>
        <Flex w={'100%'} justify={'flex-end'}>
          <BasicButton isLoading={isPending} onClick={() => burnSwMileage()} isDisabled={!isAble}>
            회수하기
          </BasicButton>
        </Flex>
      </FormWrapper>
    </Wrapper>
  );
};

export default BurnSwMileageExecute;
