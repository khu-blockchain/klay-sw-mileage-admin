import React, {ReactNode, useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import {
  Button,
  Divider, Flex,
  FormControl,
  FormLabel,
  Grid,
  HStack,
  InputProps,
  Text
} from "@chakra-ui/react";
import LVStack from "@/components/atom/LVStack";
import BasicInput from "@/components/atom/BasicInput";
import useStudentStore from "@/store/global/useStudentStore";
import useActivityFieldStore from "@/store/global/useActivityFieldStore";
import LoadingBox from "@/components/LoadingBox";
import BasicSelect from "@/components/atom/BasicSelect";
import {ACTIVITY_CATEGORIES} from "@/assets/constants/activityField.data";
import BasicTextarea from "@/components/atom/BasicTextarea";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import useProviderStore from "@/store/global/useProviderStore";
import BigNumber from "bignumber.js";
import {useApproval} from "@/api/sw_mileage_tokens/quries";

const adminaddress = '0x5775fF7AFAF1EA237Cfe75B152F39333C66Fa4A7'


const RegisterMileage = () => {
  const {getStudent} = useStudentStore(state => state);
  const {caver} = useProviderStore(state => state);
  const {activityFields, getActivityCategories} = useActivityFieldStore(state => state);
  const {kip7, swMileageToken} = useSwMileageTokenStore(state => state);

  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [extracurricularActivity, setExtracurricularActivity] = useState<string>('')
  const [extracurricularActivityClassification, setExtracurricularActivityClassification] = useState<string>('')
  const [content, setContent] = useState<string>('')

  const {mutate} = useApproval({
    onSuccessFn: (data) => {
      console.log(data)
    },
  })

  const [isCheckApproval, setIsCheckApproval] = useState(false)
  const [isNeedToApproval, setIsNeedToApproval] = useState(false)

  useEffect(() => {
    setExtracurricularActivityClassification('')
  }, [extracurricularActivity])

  useEffect(() => {
    setExtracurricularActivity('')
  }, [selectedCategory])

  const leafField = (object: any) => {
    console.log(object)
    if(!object || object.hasOwnProperty('default') || object.hasOwnProperty('description') || object.hasOwnProperty('optional')) {
      return []
    }
    return Object.keys(object)
  }

  console.log(swMileageToken)
  console.log(kip7)

  //length가 0이 아닌데 선택한게 없을 경우 예외처리
  const checkAllowance = async () => {
    if(!kip7) {
      return;
    }
    try {
      const result = await kip7.allowance(getStudent().wallet_address, adminaddress);
      setIsCheckApproval(true)
      const minimumAllowance = new BigNumber(10000000)
      // allowance 최소 기준값 10000000
      if(minimumAllowance.isGreaterThanOrEqualTo(result)) {
        setIsNeedToApproval(true)
        console.log(11111)
        return;
      }
      setIsNeedToApproval(false)

    } catch (e) {
      console.log(e)
    }
  }

  const signApproval = async () => {
    // if(!kip7 || !swMileageToken) return;
    // const approveData = kip7.methods.approve(adminaddress, caver.utils.toPeb('999999999', 'KLAY')).encodeABI()
    // const gas = await caver.rpc.klay.estimateGas({
    //   from: getStudent().wallet_address,
    //   to: swMileageToken.contract_address,
    //   input: approveData,
    //   value: '0',
    // })
    // console.log(gas)
    //
    // const {rawTransaction: senderRawTransaction} = (await caver.klay.signTransaction(
    //       {
    //         type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
    //         from: getStudent().wallet_address,
    //         to: swMileageToken.contract_address,
    //         input: approveData,
    //         gas: gas,
    //         value: '0',
    //       }
    //     )) as any
    // console.log(senderRawTransaction)
    // const result = await mutate({
    //   params: {swMileageTokenId: swMileageToken.sw_mileage_token_id},
    //   body: {
    //     studentId: getStudent().student_id,
    //     rawTransaction: senderRawTransaction
    //   }
    // })
    // console.log(result)
  }


  // useEffect(() => {
  //   if(isNeedToApproval) {
  //     signApproval()
  //   }
  // }, [isNeedToApproval])

  return (
    <Wrapper direction={'column'}>
      <LVStack w={'100%'}>
        <FormWrapper
          title={'기본 정보'}
          description={'신청 상 오류를 줄이기 위해 기본 정보는 회원가입 정보를 바탕으로 기입됩니다.\n잘못 기입된 항목이 존재할 경우 "내 정보" 에서 수정해주세요.'}
        >
          <Grid gap={'20px'} w={'100%'} templateColumns={'repeat(2, 1fr)'}>
            <InputWithLabel isDisabled={true} value={getStudent().name} label={'이름'}/>
            <InputWithLabel isDisabled={true} value={getStudent().student_id} label={'학번'}/>
            <InputWithLabel isDisabled={true} value={getStudent().department} label={'소속 학과'}/>
            <InputWithLabel isDisabled={true} value={getStudent().email} label={'이메일'}/>
            <InputWithLabel isDisabled={true} value={getStudent().wallet_address ?? '-'} label={'Klaytn 지갑 주소'}/>
          </Grid>
        </FormWrapper>
        <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
        <FormWrapper title={'활동 정보'}>
          {
            !activityFields ?
              <LoadingBox height={'400px'}/> :
              <LVStack w={'100%'} spacing={'20px'}>
                <HStack w={'100%'} spacing={'20px'}>
                  <FormControl w={'300px'}>
                    <FormLabel fontSize={'14px'} color={'var(--chakra-colors-gray-400)'}>활동 분야</FormLabel>
                    <BasicSelect value={selectedCategory} placeholder='활동 선택'
                                 onChange={(e) => setSelectedCategory(e.target.value)}>
                      {getActivityCategories().map((el: string) => (
                        <option key={el} value={el}>{ACTIVITY_CATEGORIES[el]}</option>
                      ))}
                    </BasicSelect>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize={'14px'} color={'var(--chakra-colors-gray-400)'}>비교과 활동</FormLabel>
                    <HStack>
                      <BasicSelect isDisabled={!selectedCategory}
                                   value={extracurricularActivity}
                                   onChange={(e) => setExtracurricularActivity(e.target.value)}
                                   placeholder='비교과 활동 선택'>
                        {selectedCategory ? Object.keys(activityFields[selectedCategory]).map((el: string) => (
                          <option key={el} value={el}>{el}</option>
                        )) : []}
                      </BasicSelect>
                      <BasicSelect isDisabled={!extracurricularActivity}
                                   value={extracurricularActivityClassification}
                                   onChange={(e) => setExtracurricularActivityClassification(e.target.value)}
                                   placeholder='비교과 활동 구분 선택'>
                        {(selectedCategory && extracurricularActivity) ? leafField(activityFields[selectedCategory][extracurricularActivity]).map((el: string) => (
                          <option key={el} value={el}>{el}</option>
                        )) : []}
                      </BasicSelect>
                    </HStack>
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel fontSize={'14px'} color={'var(--chakra-colors-gray-400)'}>활동 내용</FormLabel>
                  <BasicTextarea value={content}
                                 onChange={(e) => setContent(e.target.value)}
                                 height={'300px'}
                                 resize={'none'}
                                 placeholder='날짜, 시간, 활동명/논문 제목/업체명 등, 논문의 경우 주저자/공동저자 표시 필수'/>
                </FormControl>
              </LVStack>
          }
        </FormWrapper>
        <Flex p={'32px'} w={'100%'} justify={'flex-end'} gap={'10px'}>
          <Button onClick={() => checkAllowance()}>
            권한 확인하기
          </Button>
          <Button onClick={() => signApproval()}>
            권한 요청하기
          </Button>
        </Flex>
      </LVStack>
    </Wrapper>
  );
};

export default RegisterMileage;

const FormWrapper = ({title, description, children}: {title: string, description?: string, children: ReactNode}) => {
  return (
    <LVStack w={'100%'} spacing={'20px'} p={'32px'}>
      <LVStack>
        <Text fontSize={'20px'} fontWeight={600}>{title}</Text>
        {description && <Text whiteSpace={'pre-wrap'} color={'var(--chakra-colors-gray-500)'} fontSize={'14px'}
                              fontWeight={400}>{description}</Text>}
      </LVStack>
      {children}
    </LVStack>
  )
}

type InputWithLabelProps = InputProps & {label: string}

const InputWithLabel = (props: InputWithLabelProps) => {
  const {label, ...inputProps} = props;
  return (
    <FormControl>
      <FormLabel fontSize={'14px'} color={'var(--chakra-colors-gray-400)'}>{label}</FormLabel>
      <BasicInput {...inputProps}/>
    </FormControl>
  )
}

