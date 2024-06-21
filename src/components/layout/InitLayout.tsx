import React, {ReactNode} from 'react';
import {Flex, Image} from "@chakra-ui/react";
import InitBackground from '@/assets/img/img_sign_in.png';
const InitLayout = ({children}: {children: ReactNode}) => {
  return (
    <Flex w={'100%'} h={'100%'}>
      <Flex flex={1}>
        <Image src={InitBackground} width={'100%'} objectFit={'cover'} objectPosition={'center'}/>
      </Flex>
      <Flex
        minW={'720px'}
        w={'40%'}
        h={'100%'}
        justify={'center'}
        align={'center'}
      >
      {children}
      </Flex>
    </Flex>
  );
};

export default InitLayout;
