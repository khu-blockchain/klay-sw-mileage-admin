import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {SwMileageTokenHistory} from "@/store/types";
import {useGetBurnHistories, useGetMintHistories} from "@/feature/queries/swMileageTokenHistory.queries";
import Wrapper from "@/components/Wrapper";
import FormWrapper from "@/components/FormWrapper";
import {PaginationTable} from "@/components/Pagenation";
import {reduceAddress} from "@/utils/web3.utils";
import {parseToFormattedDate} from "@/utils/dayjs.utils";
import {Button, Text} from "@chakra-ui/react";
import StatusLabel from "@/components/StatusLabel";
import TransactionStatusLabel from "@/components/TransactionStatusLabel";

const BurnSwMileageHistory = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const [list, setList] = useState<Array<SwMileageTokenHistory>>([])

  const {isFetching, data, refetch} = useGetBurnHistories({
    query: {
      transactionType: 'burnFrom',
      isCount        : 0
    }
  })

  const onClickTxHash = (txHash: string) => {
    window.open(`${process.env.REACT_APP_API_KLAYSCOPE_URL}tx/${txHash}`)
  }

  const burnHistories = (list: Array<SwMileageTokenHistory>) => {
    return list.map(el => {
      return {
        status          : <TransactionStatusLabel status={el.status}/>,
        amount          : <Text fontSize={'14px'}>{el.amount}</Text>,
        admin_address   : <Text fontSize={'14px'}>{reduceAddress(el.admin_address)}</Text>,
        student_address : <Text fontSize={'14px'}>{reduceAddress(el.student_address)}</Text>,
        student_id      : <Text fontSize={'14px'}>{el.student_id}</Text>,
        transaction_hash: <Button fontSize={'14px'} variant={'link'}
                                  onClick={() => onClickTxHash(el.transaction_hash)}>{reduceAddress(el.transaction_hash)}</Button>,
        created_at      : <Text fontSize={'14px'}>{parseToFormattedDate(el.created_at)}</Text>,
      }
    })
  }

  const header = [
    {
      key  : 'student_id',
      label: '학번'
    },
    {
      key  : 'amount',
      label: '수량'
    },
    {
      key  : 'status',
      label: '상태'
    },
    {
      key  : 'admin_address',
      label: '발급 관리자 지갑 주소'
    },
    {
      key  : 'student_address',
      label: '학생 지갑 주소'
    },

    {
      key  : 'transaction_hash',
      label: '트랜잭션 해시'
    },
    {
      key  : 'created_at',
      label: '회수 일시'
    }
  ]

  useEffect(() => {
    if(data) {
      setList(data)
    }
  }, [data])

  return (
    <Wrapper direction={'column'}>
      <FormWrapper
        title={'토큰 회수 목록'}
        description={'마일리지 토큰을 회수한 내역입니다.'}>
        <PaginationTable data={burnHistories(list)} headers={header}/>
      </FormWrapper>
    </Wrapper>
  );
};

export default BurnSwMileageHistory;
