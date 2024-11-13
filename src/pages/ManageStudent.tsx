import React, {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {Nullable, Student} from "@/store/types";
import LVStack from "@/components/atom/LVStack";
import {Button, Divider, Flex, Grid, HStack, Text, useToast} from "@chakra-ui/react";
import BasicInput from "@/components/atom/BasicInput";
import BasicButton from "@/components/atom/BasicButton";
import {useGetStudentInfo, useUpdateStudentInfo} from "@/feature/queries/user.queries";
import DataField from "@/components/DataField";
import {AxiosError} from "axios";
import {useQueryClient} from "@tanstack/react-query";
import {caver} from "@/App";

const ManageStudent = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [studentId, setStudentId] = useState<string>('')
  const [queryStudentId, setQueryStudentId] = useState<string>('')
  const [student, setStudent] = useState<Nullable<Student>>(null)

  const [isEditMode, setIsEditMode] = useState(false);
  const [walletAddress, setWalletAddress] = useState('')

  const {data, error, isError} = useGetStudentInfo(queryStudentId)

  const {mutate} = useUpdateStudentInfo(
    {
      onSuccessFn: async (res) => {
        await queryClient.fetchQuery({queryKey: ['get-student-by-id', res.student_id]})
        toast({
          title     : `학생 정보가 수정되었습니다.`,
          status    : 'success',
          isClosable: true,
          position  : "top",
        })
        setIsEditMode(false);
      },
      onErrorFn  : (error: any) => toast({
        title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
        status    : 'error',
        isClosable: true,
        position  : "top",
      })
    }
  )

  const getStudentInfo = async () => {
    setQueryStudentId(studentId)
  }

  const updateStudentInfo = async () => {
    if(!student) {
      return;
    }
    if(!caver.utils.isAddress(walletAddress)) {
      toast({
        title     : `잘못된 지갑 주소 형식입니다.`,
        status    : 'error',
        isClosable: true,
        position  : "top",
      })
      return;
    }
    await mutate({
      params: {studentId: student.student_id},
      body  : {
        bankAccountNumber: student.bank_account_number,
        bankCode         : student.bank_code,
        walletAddress    : walletAddress
      }
    })
  }

  useEffect(() => {
    if(data) {
      setStudent(data)
    }
  }, [data])

  useEffect(() => {
    if(isError) {
      const axiosError = error as AxiosError;
      toast({
        title     : `${axiosError.response?.status === 404 ? '존재하지 않는 학생입니다.' : '다시 시도해주세요.'}`,
        status    : 'error',
        isClosable: true,
        position  : "top",
      })
      setStudent(null)
    }
  }, [isError, error])

  useEffect(() => {
    if(isEditMode && student) {
      setWalletAddress(student.wallet_address)
    }
  }, [isEditMode, student])

  return (
    <Wrapper direction={'column'}>
      <FormWrapper title={'학생 정보 수정'} description={'지갑 주소 수정을 요청한 학생 정보를 조회한 후 수정할 수 있습니다.'}>
        <LVStack spacing={'30px'} w={'100%'}>
          <HStack>
            <BasicInput
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder={'학번을 입력하세요.'}/>
            <BasicButton onClick={() => getStudentInfo()} isDisabled={studentId === ''} size={'md'}>검색</BasicButton>
          </HStack>
          <Divider borderColor={'var(--chakra-colors-gray-300)'}/>
          {!student &&
            <Flex w={'100%'} h={'100px'} justify={'center'} align={'center'}>
              <Text fontSize={'14px'} color={'var(--chakra-colors-gray-400)'}>
                학번을 입력한 후 학생 정보를 조회해 주세요.
              </Text>
            </Flex>
          }
          {student &&
            <LVStack spacing={'20px'} w={'100%'}>
              <Text fontSize={'20px'} fontWeight={600}>{student.name}</Text>
              <Grid gap={'20px'} w={'100%'} templateColumns={'repeat(2, 1fr)'}>
                <DataField label={'학번'}>
                  <Text>{student.student_id}</Text>
                </DataField>
                <DataField label={'학과'}>
                  <Text>{student.department}</Text>
                </DataField>
                <DataField label={'전화번호'}>
                  <Text>{student.phone_number}</Text>
                </DataField>
                <DataField label={'이메일'}>
                  <Text>{student.email}</Text>
                </DataField>
                <DataField label={'지갑 주소'}>
                  {!isEditMode && <Text>{student.wallet_address}</Text>}
                  {isEditMode &&
                    <BasicInput
                      value={walletAddress}
                      onChange={e => setWalletAddress(e.target.value)}
                    />
                  }
                </DataField>
              </Grid>
              <Flex w={'100%'} justify={'flex-end'}>
                {isEditMode &&
                  <HStack align={'flex-end'} spacing={'16px'}>
                    <BasicButton onClick={() => updateStudentInfo()} isDisabled={walletAddress === ''}
                                 minWidth={'fit-content'}>
                      수정
                    </BasicButton>
                    <Button colorScheme={'gray'} onClick={() => setIsEditMode(false)} minWidth={'fit-content'}>
                      취소
                    </Button>
                  </HStack>
                }
                {!isEditMode &&
                  <BasicButton onClick={() => setIsEditMode(true)} minWidth={'fit-content'}>
                    지갑 주소 변경하기
                  </BasicButton>
                }
              </Flex>
            </LVStack>

          }
        </LVStack>
      </FormWrapper>
    </Wrapper>
  );
};

export default ManageStudent;
