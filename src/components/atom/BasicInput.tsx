import React from 'react';
import {Input, InputProps} from "@chakra-ui/react";

const BasicInput = (props: InputProps) => {
  return (
    <Input _disabled={{color: 'var(--chakra-colors-gray-500)'}} border={'1px solid var(--chakra-colors-gray-300)'} {...props}/>
  );
};

export default BasicInput;
