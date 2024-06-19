import React from 'react';
import {VStack} from "@chakra-ui/react";
import {StackProps} from "@chakra-ui/layout";

const LVStack = (props: StackProps) => {
  return (
    <VStack align={'flex-start'} {...props}>
      {props.children}
    </VStack>
  );
};

export default LVStack;
