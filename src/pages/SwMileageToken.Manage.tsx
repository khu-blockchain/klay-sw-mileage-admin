import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react';
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {getToday, parseToFormattedDate} from "@/utils/dayjs.utils";
import useSwMileageTokenStore from "@/store/global/useSwMileageTokenStore";
import LVStack from "@/components/atom/LVStack";
import {
  AlertDialog, AlertDialogBody, AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader, AlertDialogOverlay, Badge, Button, Flex, Grid, HStack, Text, Tooltip, useDisclosure, useToast
} from "@chakra-ui/react";
import TokenImage from "@/components/atom/TokenImage";
import DataField from '@/components/DataField';
import {useActivateMileageToken, useGetSwMileageTokenList} from "@/feature/queries/swMileageTokens.queries";
import {Nullable, SwMileageToken} from "@/store/types";
import {PaginationTable} from "@/components/Pagenation";
import {reduceAddress} from "@/utils/web3.utils";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useQueryClient} from "@tanstack/react-query";

const SwMileageTokenManage = () => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure()

  const {swMileageToken} = useSwMileageTokenStore(state => state);
  const [mileageTokenList, setMileageTokenList] = useState<Array<SwMileageToken>>([])
  const [selectedTokenIdForActivate, setSelectedTokenIdForActivate] = useState<Nullable<SwMileageToken>>(null)
  const {data} = useGetSwMileageTokenList({})

  const onCopyCA = () => {
    return toast({
      title     : `컨트랙트 주소가 복사되었습니다.`,
      status    : 'success',
      isClosable: true,
      position  : "top",
    })
  }

  const onActivateToken = (token: SwMileageToken) => {
    if(token.is_activated === 1) {
      toast({
        title     : `이미 활성화 상태인 토큰입니다.`,
        status    : 'info',
        isClosable: true,
        position  : "top",
      })
      return;
    }
    setSelectedTokenIdForActivate(token);
    onOpen()
  }

  useEffect(() => {
    if(data) {
      setMileageTokenList(data)
    }
  }, [data])

  const tokenListData = useMemo(() => {
    return mileageTokenList.map(el => {
      return {
        image           : <TokenImage p={'4px'} w={'40px'} h={'40px'} src={el.sw_mileage_token_image_url}/>,
        name            : <Text>{el.sw_mileage_token_name}</Text>,
        contract_address:
          <CopyToClipboard text={el.contract_address} onCopy={() => onCopyCA()}>
            <Button variant={'link'} colorScheme={'facebook'}>{reduceAddress(el.contract_address)}</Button>
          </CopyToClipboard>,
        symbol          : <Text>{el.sw_mileage_token_symbol}</Text>,
        created_at      : <Text>{parseToFormattedDate(el.created_at)}</Text>,
        is_activated    :
          <Badge onClick={() => onActivateToken(el)} cursor={'pointer'} colorScheme={Boolean(el.is_activated) ? 'green' : 'red'}>
            {Boolean(el.is_activated) ? '활성화' : '비활성화'}
          </Badge>
      }
    })
  }, [mileageTokenList])

  const tokenListHeader = [
    {
      key  : 'image',
      label: '이미지'
    },
    {
      key  : 'name',
      label: '이름'
    },
    {
      key  : 'symbol',
      label: '심볼'
    },
    {
      key  : 'contract_address',
      label: '컨트랙트 주소'
    },
    {
      key  : 'created_at',
      label: '생성 일시'
    },
    {
      key  : 'is_activated',
      label: '상태'
    },
  ]

  return (
    <>
      {(selectedTokenIdForActivate && isOpen) &&
        <ActivateAlert
          isOpen={isOpen}
          onClose={onClose}
          selectedToken={selectedTokenIdForActivate}
          setSelectedTokenIdForActivate={setSelectedTokenIdForActivate}
        />
      }
      <Wrapper direction={'column'}>
        <FormWrapper
          title={'활성화 토큰 정보'}
          description={`${parseToFormattedDate(getToday().toString())} 기준 활성화 상태인 토큰 정보입니다.`}
        >
          {!swMileageToken ?
            <Flex>
              활성화 상태인 토큰이 존재하지 않습니다.
            </Flex> :
            <LVStack w={'100%'} spacing={'30px'}>
              <HStack align={'center'} spacing={'10px'}>
                <TokenImage
                  src={swMileageToken.sw_mileage_token_image_url}
                  p={'6px'}
                  w={'60px'}
                  h={'60px'}
                />
                <Text color={'var(--chakra-colors-gray-500)'} fontSize={'20px'}
                      fontWeight={600}>{swMileageToken.sw_mileage_token_symbol}</Text>
              </HStack>
              <Grid w={'100%'} templateColumns={'repeat(2, 1fr)'} rowGap={'30px'} columnGap={'40px'}>
                <DataField label={'이름'}>
                  <Text>{swMileageToken.sw_mileage_token_name}</Text>
                </DataField>
                <DataField label={'컨트랙트 주소'}>
                  <Button variant={'link'} colorScheme={'facebook'}>{swMileageToken.contract_address}</Button>
                </DataField>
                <DataField label={'설명'}>
                  <Text w={'360px'} whiteSpace={'pre-wrap'}>{swMileageToken.description}</Text>
                </DataField>
                <DataField label={'Decimals'}>
                  <Text>{swMileageToken.sw_mileage_token_decimals}</Text>
                </DataField>
                <DataField label={'생성 일시'}>
                  <Text>{parseToFormattedDate(swMileageToken.created_at)}</Text>
                </DataField>
                <DataField label={'심볼'}>
                  <Text>{swMileageToken.sw_mileage_token_symbol}</Text>
                </DataField>
              </Grid>
            </LVStack>
          }
        </FormWrapper>
        <FormWrapper
          title={'토큰 목록'}
          description={'현재까지 배포된 토큰 목록입니다. 상태 라벨을 클릭하여 활성화 토큰을 변경할 수 있습니다.'}>
          <PaginationTable data={tokenListData} headers={tokenListHeader}/>
        </FormWrapper>
      </Wrapper>
    </>

  );
};

export default SwMileageTokenManage;

const ActivateAlert = (
  {
    isOpen,
    onClose,
    selectedToken,
    setSelectedTokenIdForActivate
  }: {
    isOpen: boolean,
    onClose: () => void,
    selectedToken: SwMileageToken,
    setSelectedTokenIdForActivate: Dispatch<SetStateAction<Nullable<SwMileageToken>>>
  }) => {
  const cancelRef = React.useRef<any>()
  const toast = useToast();

  const queryClient = useQueryClient();

  const {mutate} = useActivateMileageToken({
    onSuccessFn: async (res) => {
      toast({
        title     : `활성화 토큰이 변경되었습니다.`,
        status    : 'success',
        isClosable: true,
        position  : "top",
      })
      await queryClient.fetchQuery({queryKey: ['get-sw-mileage-token-list']})
      await queryClient.fetchQuery({queryKey: ['get-activate-sw-mileage-token']})
      setSelectedTokenIdForActivate(null)
      onClose();
    },
    onErrorFn  : (error: any) => toast({
      title     : `${error.response.data.code}:: 문제가 발생했습니다. 다시 시도해주세요.`,
      status    : 'error',
      isClosable: true,
      position  : "top",
    })
  })

  const updateActivateToken = async() => {
    await mutate({
      params: {swMileageTokenId: selectedToken.sw_mileage_token_id}
    })
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
            활성화 토큰 변경
          </AlertDialogHeader>
          <AlertDialogBody whiteSpace={'pre-wrap'} lineHeight={'24px'}>
            <Text><strong>{selectedToken.sw_mileage_token_name}</strong> 토큰으로 활성화 토큰을 변경하시겠습니까?</Text>
            {'기존의 활성화 토큰은 비활성화 처리됩니다.'}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme='facebook' onClick={() => updateActivateToken()} ml={3}>
              변경
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

