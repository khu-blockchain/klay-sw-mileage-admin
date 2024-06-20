import React, {ReactNode} from 'react';
import LVStack from "@/components/atom/LVStack";
import {Text} from "@chakra-ui/react";

const FormWrapper = (
  {
    title,
    description,
    children
  }: {title: string, description?: string, children: ReactNode}) => {

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

export default FormWrapper;
