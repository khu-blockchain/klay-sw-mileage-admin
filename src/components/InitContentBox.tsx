import React, {ReactNode} from 'react';
import {Button, Flex, Text, VStack} from "@chakra-ui/react";

const InitContentBox = ({children, title, description}: {children: ReactNode, title: string, description?: string}) => {
  return (
    <Flex minW={'600px'}
          h={'fit-content'}
          justify={'center'}
          padding={'50px 30px'}
          borderRadius={'10px'}
          boxShadow={'0 1px 10px 0 rgba(0, 0, 0, 0.1)'}
          bgColor={'#ffffff'}
    >
      <VStack w={'400px'} spacing={'24px'}>
        <VStack>
          <Text fontSize={'24px'} fontWeight={600}>{title}</Text>
          {description &&
            <Flex>
              <Text textAlign={'center'} whiteSpace={'pre-wrap'} color={'var(--chakra-colors-gray-500)'} fontSize={'14px'} fontWeight={400}>
                {description}
                <br/>
                <Button size={'sm'} onClick={() => window.open('https://chromewebstore.google.com/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi')} mt={'6px'} color={'#3366FF'} variant={'link'}>Kaikas 다운로드</Button>
              </Text>
            </Flex>
          }
        </VStack>
        {children}
      </VStack>
    </Flex>
  );
};

export default InitContentBox;
