import React, {useEffect, useState} from 'react';
import {Flex, Grid, useToast} from "@chakra-ui/react";
import {useNavigate, useSearchParams} from "react-router-dom";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import useAble from "@/hooks/useAble";
import {useBurnMileageToken, useGetContractCode} from "@/feature/queries/swMileageTokens.queries";
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import WithLabel from "@/components/WithLabel";
import BasicInput from "@/components/atom/BasicInput";
import BasicButton from "@/components/atom/BasicButton";
import {useGetStudentInfo} from "@/feature/queries/user.queries";
import { caver, provider } from '@/App';

const BurnSwMileageExecute = () => {
  const toast = useToast();
  const navigate = useNavigate()
  const {kip7, swMileageToken} = useSwMileageTokenStore(state => state)
  const [searchParams] = useSearchParams();

  const [studentId, setStudentId] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [rawTransaction, setRawTransaction] = useState<string>('')

  const isAble = useAble([
    studentId !== '',
    amount !== '',
  ])

  const { data: contractData } = useGetContractCode('');
  const { data: studentData } = useGetStudentInfo(studentId);

  const {mutate} = useBurnMileageToken({
    onSuccessFn: async (res) => {
      toast({
        title: `마일리지 토큰이 회수되었습니다.`,
        status: 'success',
        isClosable: true,
        position: "top",
      })
      navigate('/burn/history')
    },
    onErrorFn: (error: any) => toast({
      title: `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status: 'error',
      isClosable: true,
      position: "top",
    })
  })

  const burnSwMileage = async() => {

    if (!studentData?.wallet_address) return;

    if(!kip7?._address || !swMileageToken) return;

    try {
      const { abi } = contractData;
      const { contract_address } = swMileageToken;
      const { wallet_address } = studentData;
      console.log(1)
      const contract = new caver.contract(abi, contract_address);
      console.log(11)

      console.log(2)
      const burnData = contract.methods.burnFrom(wallet_address, amount).encodeABI();
      const tx = {
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: provider.selectedAddress,
        to: contract_address,
        data: burnData,
        gas: '0x4C4B40',
      };
      
      console.log(3)
      const { rawTransaction } = await provider.request({
        method: "klay_signTransaction",
        params: [tx]
      });

      await mutate({
        params: {
          swMileageTokenId: swMileageToken.sw_mileage_token_id
        },
        body: {
          studentId,
          amount: Number(amount),
          rawTransaction,
        }
      });
      
      setRawTransaction('');
      
      toast({
        title: "마일리지 토큰이 성공적으로 회수되었습니다.",
        status: "success",
        isClosable: true,
        position: "top",
      });

    } catch (error) {
      console.error("Error signing burn transaction:", error);
      toast({
        title: "Burn 트랜잭션 서명 중 오류가 발생했습니다.",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
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
          <BasicButton onClick={() => burnSwMileage()} isDisabled={!isAble}>
            회수하기
          </BasicButton>
        </Flex>
      </FormWrapper>
    </Wrapper>
  );
};

export default BurnSwMileageExecute;
