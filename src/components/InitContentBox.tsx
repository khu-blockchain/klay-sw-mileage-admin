import React, {ReactNode} from 'react';
import {Text, VStack} from "@chakra-ui/react";
import LVStack from "@/components/atom/LVStack";

const InitContentBox = ({children, title, description}: {children: ReactNode, title: string, description?: ReactNode}) => {
  return (
    <LVStack w={'500px'} spacing={'32px'}>
      <LVStack spacing={'10px'}>
        <Text fontSize={'36px'} fontWeight={700}>{title}</Text>
        {description && description}
      </LVStack>
      {children}
    </LVStack>
  );
};

export default InitContentBox;
