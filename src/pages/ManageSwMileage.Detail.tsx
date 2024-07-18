import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import useActivityFieldStore from "@/store/global/useActivityFieldStore";
import {Nullable, SwMileage, SwMileageToken} from "@/store/types";
import {useGetSwMileageById, useUpdateSwMileageStatus} from "@/feature/queries/swMileage.queries";
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {
  AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay,
  Button,
  Divider,
  Flex,
  Grid,
  HStack,
  ListItem,
  Text,
  UnorderedList, useDisclosure,
  useToast, VStack
} from "@chakra-ui/react";
import LoadingBox from "@/components/LoadingBox";
import DataField from "@/components/DataField";
import StatusLabel from "@/components/StatusLabel";
import {ACTIVITY_CATEGORIES} from "@/assets/constants/activityField.data";
import {downloadFile} from "@/utils/file.utils";
import WithLabel from "@/components/WithLabel";
import BasicButton from "@/components/atom/BasicButton";
import BasicInput from "@/components/atom/BasicInput";
import useAble from "@/hooks/useAble";
import {makeQuery} from "@/feature/utils";
import {useQueryClient} from "@tanstack/react-query/build/modern";
import {useActivateMileageToken} from "@/feature/queries/swMileageTokens.queries";
import BasicTextarea from "@/components/atom/BasicTextarea";
import LVStack from "@/components/atom/LVStack";

const ManageSwMileageDetail = () => {

  const {id} = useParams();
  const toast = useToast()
  const navigate = useNavigate()
  const {isOpen, onOpen, onClose} = useDisclosure()

  const {activityFields} = useActivityFieldStore(state => state);
  const [swMileageDetail, setSwMileageDetail] = useState<Nullable<SwMileage>>(null)

  const [defaultScore, setDefaultScore] = useState<string>('')
  const [additionalScore, setAdditionalScore] = useState<string>('')

  const isAble = useAble([
    (defaultScore !== '' || additionalScore !== '')

  ])

  const {data, isFetching} = useGetSwMileageById({
    params: {
      swMileageId: Number(id)
    }
  })

  const {mutate} = useUpdateSwMileageStatus({
    onSuccessFn: async (res) => {
      setSwMileageDetail(res)
      toast({
        title     : `마일리지 신청이 ${res.status === 2 ? '승인' : '반려'}되었습니다.`,
        status    : 'success',
        isClosable: true,
        position  : "top",
      })
    },
    onErrorFn  : (error: any) => toast({
      title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status    : 'error',
      isClosable: true,
      position  : "top",
    })
  })

  const applyMileage = async() => {
    await mutate({
      params: {swMileageId: Number(id)},
      body: {status: 2, comment: '-'}
    })
  }


  const setScore = () => {
    if(!activityFields || !swMileageDetail) return;
    let score;
    if(!swMileageDetail.extracurricular_activity_classification) {
      score = activityFields[swMileageDetail.academic_field][swMileageDetail.extracurricular_activity]
    } else {
      score = activityFields[swMileageDetail.academic_field][swMileageDetail.extracurricular_activity][swMileageDetail.extracurricular_activity_classification]
    }
    setDefaultScore(score.default);
  }

  const onApplyMileage = () => {
    if(!swMileageDetail) return;
    const defaultScoreNum = Number(defaultScore);
    const additionalScoreNum = Number(additionalScore);
    if(defaultScore !== '' && isNaN(defaultScoreNum)){
      toast({
        title     : `기본 점수를 다시 입력해주세요.`,
        status    : 'error',
        isClosable: true,
        position  : "top",
      })
      return;
    }
    if(additionalScore !== '' && isNaN(additionalScoreNum)){
      toast({
        title     : `추가 점수를 다시 입력해주세요.`,
        status    : 'error',
        isClosable: true,
        position  : "top",
      })
      return;
    }
    navigate(`/mint/execute${makeQuery({studentId: swMileageDetail.student_id, amount: defaultScoreNum + additionalScoreNum})}`)
  }

  useEffect(() => {
    if(data) {
      setSwMileageDetail(data)
    }
  }, [data])

  useEffect(() => {
    if(swMileageDetail) {
      setScore()
    }
  }, [swMileageDetail, activityFields])

  return (
    <>
      {(isOpen && id) &&
        <DenyStatusAlert
          mutate={mutate}
          mileageId={id}
          isOpen={isOpen}
          onClose={onClose}
        />
      }
      <Wrapper direction={'column'}>
        <FormWrapper
          title={'마일리지 신청 상세'}
          description={"마일리지를 지급하기 위해서는 승인 상태를 '승인'으로 변경해야 합니다."}
        >
          {isFetching && <LoadingBox height={'100px'}/>}
          {(!isFetching && !swMileageDetail) &&
            <Flex direction={'column'} h={'300px'} w={'100%'} justify={'center'} align={'center'} gap={'10px'}>
              <Text fontSize={'24px'} fontWeight={600}>문제가 발생했습니다.</Text>
              <Text color={'var(--chakra-colors-gray-400)'}>잠시 후 다시 시도해주세요.</Text>
            </Flex>
          }
          {(!isFetching && swMileageDetail) &&
            <>
              <Grid gap={'20px'} w={'100%'} templateColumns={'repeat(2, 1fr)'}>
                <DataField label={'승인 상태'}>
                  <StatusLabel status={swMileageDetail.status}/>
                </DataField>
                <DataField label={'이름'}>
                  <Text>{swMileageDetail.name}</Text>
                </DataField>
                <DataField label={'학번'}>
                  <Text>{swMileageDetail.student_id}</Text>
                </DataField>
                <DataField label={'학과'}>
                  <Text>{swMileageDetail.department}</Text>
                </DataField>
                <DataField label={'전화번호'}>
                  <Text>{swMileageDetail.phone_number}</Text>
                </DataField>
                <DataField label={'이메일'}>
                  <Text>{swMileageDetail.email}</Text>
                </DataField>
                <DataField label={'지갑 주소'}>
                  <Text>{swMileageDetail.wallet_address}</Text>
                </DataField>
              </Grid>
              {activityFields &&
                <>
                  <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
                  <Grid gap={'20px'} w={'100%'} templateColumns={'repeat(1, 1fr)'}>
                    <DataField label={'활동 분야'}>
                      <Text>{ACTIVITY_CATEGORIES[swMileageDetail.academic_field]}</Text>
                    </DataField>
                    <DataField label={'바교과 활동'}>
                      <Text>{swMileageDetail.extracurricular_activity}</Text>
                    </DataField>
                    {swMileageDetail.extracurricular_activity_classification &&
                      <DataField label={'비교과 구분'}>
                        <Text>{swMileageDetail.extracurricular_activity_classification}</Text>
                      </DataField>
                    }
                    <DataField label={'활동 내용'}>
                      <Text>{swMileageDetail.content}</Text>
                    </DataField>
                    {swMileageDetail.sw_mileage_files.length !== 0 &&
                      <DataField label={'제출 파일'}>
                        <UnorderedList>
                          {swMileageDetail.sw_mileage_files.map(el =>
                            <ListItem>
                              <Button onClick={() => downloadFile(el.url, el.name)} variant={'link'}
                                      colorScheme={'facebook'}>
                                {el.name}
                              </Button>
                            </ListItem>
                          )}
                        </UnorderedList>
                      </DataField>
                    }
                    {swMileageDetail.comment !== '' &&
                      <DataField label={'반려 사유'}>
                        <Text>{swMileageDetail.comment}</Text>
                      </DataField>
                    }
                  </Grid>
                </>
              }
              <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
              {swMileageDetail.status === 1 &&
                <Flex w={'100%'} justify={'flex-end'}>
                  <HStack align={'flex-end'} spacing={'16px'}>
                    <BasicButton onClick={() => applyMileage()} isDisabled={!isAble} minWidth={'fit-content'}>
                      승인
                    </BasicButton>
                    <Button colorScheme={'gray'} onClick={() => onOpen()} isDisabled={!isAble} minWidth={'fit-content'}>
                      거절
                    </Button>
                  </HStack>
                </Flex>
              }
              {swMileageDetail.status === 2 &&
                <Flex w={'100%'} justify={'flex-end'}>
                  <HStack align={'flex-end'} spacing={'16px'}>
                    <WithLabel label={'기본 점수'}>
                      <BasicInput value={defaultScore} onChange={(e) => setDefaultScore(e.target.value)} minWidth={'100px'}
                                  w={'100px'} height={'40px'}/>
                    </WithLabel>
                    <Flex h={'60%'} align={'center'}>
                      <Text>+</Text>
                    </Flex>
                    <WithLabel label={'추가 점수'}>
                      <BasicInput value={additionalScore} onChange={(e) => setAdditionalScore(e.target.value)}
                                  minWidth={'100px'} w={'100px'} height={'40px'}/>
                    </WithLabel>
                    <BasicButton onClick={() => onApplyMileage()} isDisabled={!isAble} minWidth={'fit-content'}>
                      마일리지 지급
                    </BasicButton>
                  </HStack>
                </Flex>
              }
            </>
          }
        </FormWrapper>
      </Wrapper>
    </>

  );
};

export default ManageSwMileageDetail;

const DenyStatusAlert = (
  {
    isOpen,
    onClose,
    mileageId,
    mutate
  }: {
    isOpen: boolean,
    onClose: () => void,
    mileageId: string,
    mutate: (...args: any) => any
  }) => {
  const cancelRef = React.useRef<any>()

  const [reason, setReason] = useState<string>('')

  const denyMileage = async() => {
    await mutate({
      params: {swMileageId: Number(mileageId)},
      body: {status: 3, comment: reason}
    })
    onClose();
  }

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader p={'24px 24px 10px 24px'} fontSize='lg' fontWeight='bold'>
            SW 마일리지 거절 사유
          </AlertDialogHeader>
          <AlertDialogBody whiteSpace={'pre-wrap'} lineHeight={'24px'}>
            <LVStack spacing={'16px'}>
              <Text>마일리지 거절 사유를 작성해 주세요.</Text>
              <BasicTextarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder={'거절 사유'} resize={'none'}/>
            </LVStack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme='facebook' onClick={() => denyMileage()} ml={3}>
              변경
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
