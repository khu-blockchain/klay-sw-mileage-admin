import React, {useState} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {Flex, Grid, useToast} from '@chakra-ui/react';
import BasicInput from "@/components/atom/BasicInput";
import BasicTextarea from "@/components/atom/BasicTextarea";
import WithLabel from "@/components/WithLabel";
import {useCreateMileageToken} from "@/feature/queries/swMileageTokens.queries";
import BasicButton from "@/components/atom/BasicButton";
import useAble from "@/hooks/useAble";
import {useNavigate} from "react-router-dom";

const SwMileageTokenCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const isAble = useAble([
    name !== '',
    symbol !== '',
    description !== ''
  ])

  const {mutate, isPending} = useCreateMileageToken({
    onSuccessFn: async (res) => {
      toast({
        title     : `새로운 SW 마일리지 토큰이 생성되었습니다.`,
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

  const createToken = async() => {
    await mutate({
      body: {
        swMileageTokenName: name,
        symbol,
        description,
        imageUrl: "https://bigdata-ksh-2024.s3.ap-northeast-2.amazonaws.com/khu/78d9ec266eadd26a97f116e64e4e5485143305671718597093168.jpg"
      }
    })
  }


  return (
    <Wrapper direction={'column'}>
      <FormWrapper
        title={'SW 마일리지 토큰 생성'}
        description={'하단 정보를 입력하여 SW 마일리지 토큰으로 사용할 KIP-7 토큰을 생성하세요.'}>
        <Grid w={'100%'} templateColumns={'repeat(2, 1fr)'} gap={'20px'}>
          <WithLabel label={'이름'} description={'토큰의 이름입니다.'}>
            <BasicInput
              value={name}
              maxLength={20}
              onChange={e => setName(e.target.value)}
              placeholder={'최대 20자까지 입력 가능합니다.'}/>
          </WithLabel>
          <WithLabel label={'심볼'} description={'토큰의 심볼입니다.'}>
            <BasicInput
              value={symbol}
              maxLength={10}
              onChange={e => setSymbol(e.target.value)}
              placeholder={'최대 10자까지 입력 가능합니다.'}/>
          </WithLabel>
          <WithLabel label={'설명'} description={'토큰에 대한 설명입니다.'}>
            <BasicTextarea
              value={description}
              maxLength={80}
              onChange={e => setDescription(e.target.value)}
              placeholder={'최대 80자까지 입력 가능합니다.'} resize={'none'}/>
          </WithLabel>
        </Grid>
        <Flex w={'100%'} justify={'flex-end'}>
          <BasicButton isLoading={isPending} onClick={() => createToken()} isDisabled={!isAble}>
            생성하기
          </BasicButton>
        </Flex>
      </FormWrapper>
    </Wrapper>
  );
};

export default SwMileageTokenCreate;




