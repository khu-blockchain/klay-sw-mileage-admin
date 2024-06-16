import React, {ReactNode} from 'react';
import {Box, Flex, Image} from "@chakra-ui/react";

const InitLayout = ({children}: {children: ReactNode}) => {
  return (
    <Flex w={'100%'} h={'100%'}>
      <Flex bgColor={'#ffffff'} w={'100%'} zIndex={10} position={'fixed'} h={'80px'} padding={'0 20px'} align={'center'} borderBottom={'1px solid var(--chakra-colors-gray-300)'}>
        <Image src={'https://swedu.khu.ac.kr/images/logo_swedu.png'} h={'42px'} objectFit={'cover'}/>
      </Flex>
      <Flex justify={'center'}
            w={'100%'}
            pt={'calc(80px + 150px)'}
            h={'100%'}
            bgColor={'var(--chakra-colors-gray-100)'}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default InitLayout;
