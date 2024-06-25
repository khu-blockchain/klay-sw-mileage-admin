import React, {useMemo} from 'react';
import {Badge} from "@chakra-ui/react";

const TransactionStatusLabel = ({status}:{status: number}) => {

  const statusStyle = useMemo(() => {
    switch (status){
      case 1: return {
        variant: 'created',
        label: '생성'
      }
      case 2: return {
        variant: 'approved',
        label: '성공'
      }
      case 0: return {
        variant: 'denied',
        label: '실패'
      }
      default: return {
        variant: 'default',
        label: '-'
      }
    }
  }, [status])
  return (
    <Badge fontSize={'14px'} p={'4px 6px'} variant={statusStyle.variant}>
      {statusStyle.label}
    </Badge>
  );
};

export default TransactionStatusLabel;
