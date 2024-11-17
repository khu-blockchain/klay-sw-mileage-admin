import {useEffect, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import LVStack from "@/components/atom/LVStack";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Toast,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import FormWrapper from "@/components/FormWrapper";
import BasicInput from '@/components/atom/BasicInput';
import { Eye, EyeOff } from 'lucide-react';
import BasicButton from '@/components/atom/BasicButton';
import useAdminStore from '@/store/global/useAdminStore';
import { useDeleteAdmin, useUpdateAdminInfo } from '@/feature/queries/user.queries';
import { caver } from '@/App';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { removeLocalStorageData } from '@/utils/webStorage.utils';

const Info = () => {
    const [isNewAddrShowing, setIsNewAddrShowing] = useState(false)
    const [isCurrentAddrShowing, setIsCurrentAddrShowing] = useState(false)
    const toast = useToast()
    const {getAdmin} = useAdminStore((state) => state)
    const {admin_id, name, email, department, phone_number, wallet_address} = getAdmin()
    const [isDisabled, setIsDisabled] = useState(true)
    const [form, setForm] = useState({
      email, department, name, phone_number
    })
    const [walletAddress, setWalletAddress] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const {mutate:updateAdminInfo} = useUpdateAdminInfo({
      onSuccessFn: () => {
        toast({
          title     : `변경사항이 저장되었습니다.`,
          status    : 'success',
          isClosable: true,
          position  : "top",
        })
      },
      onErrorFn  : (error: any) => toast({
        title: "변경사항을 저장하지 못했습니다.",
        status: 'error',
        isClosable: true,
        position: "top"
      })
    })
    const {mutate:deleteAdmin} = useDeleteAdmin({
      onSuccessFn: () => {
        toast({
          title     : `계정이 삭제되었습니다.`,
          status    : 'success',
          isClosable: true,
          position  : "top",
        })
        removeLocalStorageData('admin-refresh-token');
        removeLocalStorageData('admin-refresh-expires');
        window.location.reload();
      },
      onErrorFn  : (error: any) => toast({
        title: "계정을 삭제하지 못했습니다.",
        status: 'error',
        isClosable: true,
        position: "top"
      })
    })

    const handleChange = (e: any) => {
      const {id, value} = e.target;
      setForm((prev) => ({
        ...prev,
        [id]: value
      }))
    }

    const handleSaveChange = async () => {
      if(isDisabled) {
        setIsDisabled(false)
      } else {
        try {
          await updateAdminInfo({
            body: {...form, adminId: admin_id}
          })
        } catch(e) {
          throw e
        }
        setIsDisabled(true)
      }
    }
    const handleChangeWalletAddress = async () => {
      //klaytn지갑주소가 맞는지 확인
      const isCorrect = caver.utils.isAddress(walletAddress)
      if(isCorrect) {
        //api요청
        try {
          await updateAdminInfo({
            body: {walletAddress, adminId: admin_id}
          })
        } catch(e) {
          throw e
        }
      } else {
        //에러 toast
        toast({
          title: "지갑주소 형식이 올바르지 않습니다.",
          status: 'error',
          isClosable: true,
          position: "top"
        })
      }
    }

    const onDeleteAccount = async () => {
      //api연결
      try {
        await deleteAdmin({
          body: {adminId: admin_id}
        })
      } catch(e) {
        throw e
      }
    }
    
  return (
    <LVStack w={'100%'} spacing={'20px'}>
      <Wrapper>
        <LVStack w={'100%'}>
        <FormWrapper
            title={'내 정보'}
            description='개인정보를 조회, 수정할 수 있습니다.'
          >
            <Box>
              <Box>아이디: {admin_id}</Box>
            </Box>
            <FormControl>
            <InputGroup  w={'700px'} flexDir={'column'}>
              <FormLabel>이메일</FormLabel>
              <Input variant={'init'}
                     value={form.email}
                     w={'500px'}
                     onChange={handleChange}
                     disabled={isDisabled}
                     id='email'
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>부서</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={form.department}
                     onChange={handleChange}
                     disabled={isDisabled}
                     id="department"
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>이름</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={form.name}
                     onChange={handleChange}
                     disabled={isDisabled}
                     id='name'
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <FormControl>
          <InputGroup flexDir={'column'}>
          <FormLabel>전화번호</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     value={form.phone_number}
                     disabled={isDisabled}
                     onChange={handleChange}
                     id='phone_number'
                     type={'text'}/>
            </InputGroup>
          </FormControl>
          <BasicButton onClick={handleSaveChange}>{isDisabled ? "변경하기" : "저장하기"}</BasicButton>
          </FormWrapper>
          <FormWrapper title={'지갑주소 변경'} description={'비밀키 분실 시 사용할 새로운 지갑 주소를 입력하세요.'}>
          <FormControl>
            <InputGroup flexDir={'column'} position={'relative'} w={'500px'}>
              <FormLabel>현재 지갑주소</FormLabel>
              <Input variant={'init'}
                     w={'500px'}
                     readOnly
                     value={wallet_address}
                     disabled={false}
                     type={isCurrentAddrShowing ? 'text':'password'}/>
              {!isCurrentAddrShowing ? (
              <Box position={'absolute'} top={'45px'} right={'10px'} zIndex={1000} onClick={() => setIsCurrentAddrShowing(true)}><Eye width={'24px'} color={'var(--chakra-colors-gray-400)'}/></Box>
              ) : (
              <Box position={'absolute'} top={'45px'} right={'10px'} zIndex={1000} onClick={() => setIsCurrentAddrShowing(false)}><EyeOff width={'24px'} color={'var(--chakra-colors-gray-400)'}/></Box>
              )
            }
            </InputGroup>
          </FormControl>
          <Box>
            <Box position={'relative'}>
            <BasicInput w={'500px'} placeholder='0x로 시작하는 지갑주소를 붙여넣으세요.' type={isNewAddrShowing ? 'text':'password'} value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}/>
            {!isNewAddrShowing ? (
              <Box position={'absolute'} top={'12px'} right={'10px'} zIndex={1000} onClick={() => setIsNewAddrShowing(true)}><Eye width={'24px'} color={'var(--chakra-colors-gray-400)'}/></Box>
              ) : (
              <Box position={'absolute'} top={'12px'} right={'10px'} zIndex={1000} onClick={() => setIsNewAddrShowing(false)}><EyeOff width={'24px'} color={'var(--chakra-colors-gray-400)'}/></Box>
              )
            }
            </Box>
            <BasicButton mt={'25px'} onClick={handleChangeWalletAddress}>변경하기</BasicButton>
          </Box>
        </FormWrapper>
        <FormWrapper title={'회원 탈퇴'} description={'계정을 삭제합니다.'}>
          <>
          <BasicButton onClick={onOpen}>계정 삭제</BasicButton>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>계정 삭제</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                정말 계정을 삭제하시겠습니까? <br/> 계정 삭제 이후에는 복구할 수 없습니다.
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onDeleteAccount}>
                  삭제
                </Button>
                <Button variant='ghost' onClick={onClose}>돌아가기</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        </FormWrapper>
        </LVStack>
      </Wrapper>
    </LVStack>
  );
}

export default Info;
